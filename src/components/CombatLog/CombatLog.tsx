import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import BattleLogEntry from '../../model/BattleLogEntry';
import State from '../../redux/state/State';

interface OwnProps {
    className?: string;
}

interface StateProps {
    entries: BattleLogEntry[];
}

type CombatLogProps = OwnProps & StateProps;

const CombatLog = ({entries, className}: CombatLogProps) => (
    <ul className={className}>
        {entries.map(({text}, index) => <li key={index}>{text}</li>)}
    </ul>
);

const mapStateToProps: MapStateToProps<StateProps, {}, State> = ({battleLog}) => ({entries: battleLog});

export default connect(mapStateToProps)(CombatLog);
