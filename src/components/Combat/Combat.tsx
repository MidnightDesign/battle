import * as React from 'react';
import Character from '../../model/Character';
import Actions from '../Actions/Actions';
import BattleLog from '../BattleLog/BattleLog';
import Characters from '../Characters/Characters';

interface OwnProps {
    hero: Character;
    monsters: Character[];
}

type CombatProps = OwnProps;

interface CombatState {
    targetId: string | undefined;
}

class Combat extends React.Component<CombatProps, CombatState> {
    public state: CombatState = {targetId: undefined};

    public render() {
        const {hero, monsters} = this.props;
        const target = this.getTarget();
        return (
            <>
                <Characters characters={[hero, ...monsters]} selected={target} onSelect={this.handleCharacterSelect}/>
                {target !== undefined ? <Actions character={hero} target={target}/> : undefined}
                <BattleLog/>
            </>
        );
    }

    private handleCharacterSelect = (character: Character) => this.setState({targetId: character.id});

    private getTarget() {
        const {targetId} = this.state;
        if (targetId === undefined) {
            return undefined;
        }
        return [this.props.hero, ...this.props.monsters].find(({id}) => targetId === id) || undefined;
    }
}

export default Combat;
