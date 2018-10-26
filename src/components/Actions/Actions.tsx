import * as React from 'react';
import {Component} from 'react';
import {connect, MapDispatchToProps} from 'react-redux';
import Character, {isDead} from '../../model/Character';
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

export class Actions extends Component<ActionsProps> {
    public render() {
        return (
            <>
                <button onClick={this.handleAttackClick}>Attack</button>
                <button onClick={this.handleHealClick}>Heal</button>
            </>
        );
    }

    private handleAttackClick = () => {
        const {character, target} = this.props;
        if (isDead(target)) {
            return;
        }
        this.props.attack(character, target);
    }
    private handleHealClick = () => this.props.heal(this.props.character, this.props.target);
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = ({
    attack,
    heal,
});

export default connect(undefined, mapDispatchToProps)(Actions);
