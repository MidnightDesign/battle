import * as React from 'react';
import {Provider} from 'react-redux';
import {isDead} from '../../model/Character';
import {attack} from '../../redux/actions/Attack';
import {heal} from '../../redux/actions/Heal';
import {spawn} from '../../redux/actions/Spawn';
import createStore from '../../redux/createStore';
import BattleLog from '../BattleLog/BattleLog';
import Characters from '../Characters/Characters';

class App extends React.Component {
    public render() {
        const store = createStore();
        const foo = {id: 'foo', name: 'Gyros', hp: 50, maxHp: 100, attackPower: 5};
        store.dispatch(spawn(foo));
        const bar = {id: 'bar', name: 'Murloc', hp: 100, maxHp: 100, attackPower: 2};
        store.dispatch(spawn(bar));
        const handleAttackClick = () => {
            if (isDead(bar)) {
                return;
            }
            store.dispatch(attack(foo, bar));
        };
        const handleHealClick = () => store.dispatch(heal(foo, foo));
        return (
            <Provider store={store}>
                <div>
                    <Characters/>
                    <button onClick={handleAttackClick}>Attack</button>
                    <button onClick={handleHealClick}>Heal</button>
                    <BattleLog/>
                </div>
            </Provider>
        );
    }
}

export default App;
