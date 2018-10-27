import * as React from 'react';
import Character from '../../model/Character';
import Meter from '../Meter/Meter';
import './Characters.css';

interface OwnProps {
    selected: Character | undefined;
    onSelect: (character: Character) => void;
}

interface StateProps {
    characters: Character[];
}

type CharactersProps = OwnProps & StateProps;

export default ({characters, selected, onSelect}: CharactersProps) => {
    const rows = characters.map((character) => {
        const {id, hp, maxHp, name} = character;
        const handleClick = () => onSelect(character);
        const isSelected = selected !== undefined && (selected.id === character.id);
        const classNames = [isSelected ? 'selected' : undefined];
        return (
            <tr key={id} onClick={handleClick} className={classNames.join(' ')}>
                <td>{id}</td>
                <td>{name}</td>
                <td><Meter value={hp} max={maxHp}/></td>
            </tr>
        );
    });
    return (
        <table className="Characters">
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
