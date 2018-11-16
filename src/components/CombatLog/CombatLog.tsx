import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import BattleLogEntry from '../../model/BattleLogEntry';
import AppState from '../../redux/state/AppState';

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

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = () => ({entries: []});

export default connect(mapStateToProps)(CombatLog);
