import * as ReactDOM from 'react-dom';
import createApp from './components/App/createApp';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    createApp(),
    document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
