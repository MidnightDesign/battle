import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import BattleLogEntry from '../../model/BattleLogEntry';
import State from '../../redux/state/State';

interface StateProps {
    entries: BattleLogEntry[];
}

type BattleLogProps = StateProps;
const BattleLog = ({entries}: BattleLogProps) => (
    <ul>
        {entries.map(({text}, index) => <li key={index}>{text}</li>)}
    </ul>
);

const mapStateToProps: MapStateToProps<StateProps, {}, State> = ({battleLog}) => ({entries: battleLog});

export default connect(mapStateToProps)(BattleLog);
