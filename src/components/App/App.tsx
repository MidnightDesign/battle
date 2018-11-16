import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import Character from '../../model/Character';
import AppState from '../../redux/state/AppState';
import Combat from '../Combat/Combat';
import './App.css';

interface StateProps {
    hero: Character;
    monster: Character;
}

type AppProps = StateProps;

class App extends React.Component<AppProps> {
    public render() {
        return (
            <div className="App">
                <Combat
                    hero={this.props.hero}
                    monsters={[this.props.monster]}
                    className="combat"
                />
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = ({characters}) => ({
    hero: characters[0],
    monster: characters[1],
});

export default connect(mapStateToProps)(App);
