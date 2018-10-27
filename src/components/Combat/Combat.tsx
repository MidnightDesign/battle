import * as React from 'react';
import Character from '../../model/Character';
import Actions from '../Actions/Actions';
import BattleLog from '../BattleLog/BattleLog';
import Characters from '../Characters/Characters';

interface CombatProps {
    hero: Character;
    monsters: Character[];
}

interface CombatState {
    target: Character | undefined;
}

class Combat extends React.Component<CombatProps, CombatState> {
    public state: CombatState = {target: undefined};

    public render() {
        const {hero, monsters} = this.props;
        const {target} = this.state;
        return (
            <>
                <Characters characters={[hero, ...monsters]} selected={target} onSelect={this.handleCharacterSelect}/>
                {target !== undefined ? <Actions character={hero} target={target}/> : undefined}
                <BattleLog/>
            </>
        );
    }

    private handleCharacterSelect = (character: Character) => this.setState({target: character});
}

export default Combat;
