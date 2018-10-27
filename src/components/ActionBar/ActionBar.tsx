import * as React from 'react';
import {Component} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import Character, {isCoolingDown, isDead} from '../../model/Character';
import {attack} from '../../redux/actions/Attack';
import {heal} from '../../redux/actions/Heal';
import Action from './Action';
import './ActionBar.css';
import MeleeDamage from './MeleeDamage.png';

interface OwnProps {
    character: Character;
    target: Character | undefined;
    className?: string;
}

interface DispatchProps {
    attack: typeof attack;
    heal: typeof heal;
}

type ActionBarProps = OwnProps & DispatchProps;

interface ActionBarState {
    canAttack: boolean;
    scheduledAction: (() => void) | undefined;
}

export class ActionBar extends Component<ActionBarProps, ActionBarState> {
    public state: ActionBarState = {canAttack: false, scheduledAction: undefined};

    public render() {
        const classNames = ['ActionBar', this.props.className];
        if (isCoolingDown(this.props.character)) {
            classNames.push('cooling-down');
        }
        return (
            <ul className={classNames.join(' ')}>
                <Action
                    icon={MeleeDamage}
                    onClick={this.handleAttackClick}
                    keyboardShortcut="1"
                    disabled={!this.state.canAttack}
                    className="action"
                />
                <Action
                    icon={MeleeDamage}
                    onClick={this.handleHealClick}
                    keyboardShortcut="2"
                    className="action"
                />
                <Action keyboardShortcut="3" className="action"/>
                <Action keyboardShortcut="4" className="action"/>
                <Action keyboardShortcut="5" className="action"/>
                <Action keyboardShortcut="6" className="action"/>
                <Action keyboardShortcut="7" className="action"/>
                <Action keyboardShortcut="8" className="action"/>
                <Action keyboardShortcut="9" className="action"/>
                <Action keyboardShortcut="0" className="action"/>
                <Action keyboardShortcut="ß" className="action"/>
            </ul>
        );
    }

    public componentDidMount() {
        this.scheduleTick();
    }

    private scheduleTick = () => setTimeout(() => this.tick(), 15);

    private tick = () => {
        this.setState((state) => {
            const {target} = this.props;
            const canAttack = target !== undefined && !isDead(target);
            if (this.state.canAttack !== canAttack) {
                return {...state, canAttack};
            }
            return null;
        });
        this.setState((state) => {
            if (state.scheduledAction !== undefined && !isCoolingDown(this.props.character)) {
                state.scheduledAction();
                return {...state, scheduledAction: undefined};
            }
            return null;
        });
        this.scheduleTick();
    }

    private handleAttackClick = () => {
        const {character, target} = this.props;
        if (target === undefined) {
            return;
        }
        if (!this.state.canAttack) {
            return;
        }
        if (isCoolingDown(character)) {
            this.scheduleAction(() => this.props.attack(character, target));
            return;
        }
        this.props.attack(character, target);
        this.setState({canAttack: false});
    }

    private handleHealClick = () => this.props.heal(this.props.character, this.props.character);

    private scheduleAction(action: () => void) {
        this.setState({scheduledAction: action});
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = ({
    attack,
    heal,
});

export default connect(undefined, mapDispatchToProps)(ActionBar);
