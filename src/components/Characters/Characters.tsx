import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import Character from '../../model/Character';
import State from '../../redux/state/State';
import Meter from '../Meter/Meter';

interface StateProps {
    characters: Character[];
}

type CharactersProps = StateProps;

export const Characters = ({characters}: CharactersProps) => {
    const rows = characters.map(({id, hp, maxHp, name}) => (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td><Meter value={hp} max={maxHp}/></td>
        </tr>
    ));
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>HP</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
};

const mapStateToProps: MapStateToProps<StateProps, {}, State> = ({characters}) => ({characters});

export default connect(mapStateToProps)(Characters);
