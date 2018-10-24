import BattleLogEntry from '../../model/BattleLogEntry';
import Character from '../../model/Character';

export default interface State {
    readonly characters: Character[];
    readonly battleLog: BattleLogEntry[];
}
