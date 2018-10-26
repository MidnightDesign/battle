import * as React from 'react';
import {Component} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import Character, {isCoolingDown, isDead} from '../../model/Character';
import {attack} from '../../redux/actions/Attack';
import {heal} from '../../redux/actions/Heal';

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
}

export class Actions extends Component<ActionsProps, ActionState> {
    public state: ActionState = {canAttack: false};

    public render() {
        return (
            <>
                <button onClick={this.handleAttackClick} disabled={!this.state.canAttack}>Attack</button>
                <button onClick={this.handleHealClick}>Heal</button>
            </>
        );
    }

    public componentDidMount() {
        this.scheduleStateUpdate();
    }

    private scheduleStateUpdate = () => setTimeout(() => this.updateState(), 15);

    private updateState = () => {
        const canAttack = !isDead(this.props.target) && !isCoolingDown(this.props.character);
        this.setState({canAttack});
        this.scheduleStateUpdate();
    }

    private handleAttackClick = () => {
        const {character, target} = this.props;
        if (!this.state.canAttack) {
            return;
        }
        this.props.attack(character, target);
        this.setState({canAttack: false});
    }

    private handleHealClick = () => this.props.heal(this.props.character, this.props.target);
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = ({
    attack,
    heal,
});

export default connect(undefined, mapDispatchToProps)(Actions);
