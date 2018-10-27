import * as React from 'react';
import {Component} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import Character, {isCoolingDown, isDead} from '../../model/Character';
import {attack} from '../../redux/actions/Attack';
import {heal} from '../../redux/actions/Heal';
import Button from '../Button/Button';
import './Actions.css';

interface OwnProps {
    character: Character;
    target: Character;
}

interface DispatchProps {
    attack: typeof attack;
    heal: typeof heal;
}

type ActionsProps = OwnProps & DispatchProps;

interface ActionState {
    canAttack: boolean;
    scheduledAction: (() => void) | undefined;
}

export class Actions extends Component<ActionsProps, ActionState> {
    public state: ActionState = {canAttack: false, scheduledAction: undefined};

    public render() {
        const classNames = ['Actions'];
        if (isCoolingDown(this.props.character)) {
            classNames.push('cooling-down');
        }
        return (
            <div className={classNames.join(' ')}>
                <Button onClick={this.handleAttackClick} disabled={!this.state.canAttack}>Attack</Button>
                <Button onClick={this.handleHealClick}>Heal</Button>
            </div>
        );
    }

    public componentDidMount() {
        this.scheduleTick();
    }

    private scheduleTick = () => setTimeout(() => this.tick(), 15);

    private tick = () => {
        const canAttack = !isDead(this.props.target);
        this.setState({canAttack});
        if (this.state.scheduledAction !== undefined && !isCoolingDown(this.props.character)) {
            this.state.scheduledAction();
            this.setState({scheduledAction: undefined});
        }
        this.scheduleTick();
    }

    private handleAttackClick = () => {
        const {character, target} = this.props;
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

export default connect(undefined, mapDispatchToProps)(Actions);
