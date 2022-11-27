/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { debug } from './config';
import log from 'loglevel';

log.setLevel(debug ? "debug" : "info");
log.info(`debugging is ${debug ? 'enabled' : 'disabled'}`)

render(() => <App />, document.getElementById('root'));
