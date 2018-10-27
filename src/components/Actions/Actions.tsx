import * as React from 'react';
import {Component} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import Character, {isCoolingDown, isDead} from '../../model/Character';
import {attack} from '../../redux/actions/Attack';
import {heal} from '../../redux/actions/Heal';
import {scheduleAction} from '../../redux/actions/ScheduleAction';
import Button from '../Button/Button';
import './Actions.css';

interface OwnProps {
    character: Character;
    target: Character;
}

interface DispatchProps {
    attack: typeof attack;
    heal: typeof heal;
    scheduleAction: typeof scheduleAction;
}

type ActionsProps = OwnProps & DispatchProps;

interface ActionState {
    canAttack: boolean;
}

export class Actions extends Component<ActionsProps, ActionState> {
    public state: ActionState = {canAttack: false};

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
        this.scheduleStateUpdate();
    }

    private scheduleStateUpdate = () => setTimeout(() => this.updateState(), 15);

    private updateState = () => {
        const canAttack = !isDead(this.props.target);
        this.setState({canAttack});
        this.scheduleStateUpdate();
    }

    private handleAttackClick = () => {
        const {character, target} = this.props;
        if (!this.state.canAttack) {
            return;
        }
        if (isCoolingDown(character)) {
            this.props.scheduleAction(character, attack(character, target));
            return;
        }
        this.props.attack(character, target);
        this.setState({canAttack: false});
    }

    private handleHealClick = () => this.props.heal(this.props.character, this.props.character);
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = ({
    attack,
    heal,
    scheduleAction,
});

export default connect(undefined, mapDispatchToProps)(Actions);
