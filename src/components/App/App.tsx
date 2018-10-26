import * as React from 'react';
import {Provider} from 'react-redux';
import Character from '../../model/Character';
import {spawn} from '../../redux/actions/Spawn';
import createStore from '../../redux/createStore';
import Actions from '../Actions/Actions';
import BattleLog from '../BattleLog/BattleLog';
import Characters from '../Characters/Characters';

class App extends React.Component {
    public render() {
        const store = createStore();
        const foo: Character = {id: 'foo', name: 'Gyros', hp: 50, maxHp: 100, attackPower: 5, precision: 90};
        store.dispatch(spawn(foo));
        const bar: Character = {id: 'bar', name: 'Murloc', hp: 100, maxHp: 100, attackPower: 2, precision: 90};
        store.dispatch(spawn(bar));
        return (
            <Provider store={store}>
                <div>
                    <Characters/>
                    <Actions character={foo} target={bar}/>
                    <BattleLog/>
                </div>
            </Provider>
        );
    }
}

export default App;
