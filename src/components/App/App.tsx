import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import Character from '../../model/Character';
import State from '../../redux/state/State';
import Actions from '../Actions/Actions';
import BattleLog from '../BattleLog/BattleLog';
import Characters from '../Characters/Characters';

interface StateProps {
    hero: Character;
    monster: Character;
}

type AppProps = StateProps;

class App extends React.Component<AppProps> {
    public render() {
        return (
            <>
                <Characters/>
                <Actions character={this.props.hero} target={this.props.monster}/>
                <BattleLog/>
            </>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, State> = ({characters}) => ({
    hero: characters[0],
    monster: characters[1],
});

export default connect(mapStateToProps)(App);
