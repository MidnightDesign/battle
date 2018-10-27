import * as React from 'react';
import Character from '../../model/Character';
import ActionBar from '../ActionBar/ActionBar';
import Characters from '../Characters/Characters';
import CombatLog from '../CombatLog/CombatLog';
import './Combat.css';

interface OwnProps {
    hero: Character;
    monsters: Character[];
    className?: string;
}

type CombatProps = OwnProps;

interface CombatState {
    targetId: string | undefined;
}

class Combat extends React.Component<CombatProps, CombatState> {
    public state: CombatState = {targetId: undefined};

    public render() {
        const {hero, monsters, className} = this.props;
        const target = this.getTarget();
        return (
            <section className={['Combat', className].join(' ')}>
                <Characters
                    characters={[hero, ...monsters]}
                    selected={target}
                    onSelect={this.handleCharacterSelect}
                    className="characters"
                />
                <ActionBar character={hero} target={target} className="action-bar"/>
                <CombatLog className="combat-log"/>
            </section>
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
