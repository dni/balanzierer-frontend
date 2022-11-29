import log from 'loglevel';

import logo from './assets/logo.svg';
import styles from './App.module.css';
import { createEffect } from 'solid-js';

import { fetcher, WebSocketService } from './helpers';

import { version } from './config';

import Controls from './Controls';
// import Channels from './Channels';
import Peers from './Peers';
import Info from './Info';

export const ws = new WebSocketService();
export const toggle_rainbow = () => document.body.classList.toggle("rainbow");

const App = () => {
  if('serviceWorker' in navigator) {
      navigator.serviceWorker
          .register('./service-worker.js', {scope: './'})
          .then((reg) => {
              log.info(`Registration succeeded. Scope is ${reg.scope}`);
          });
  }

  return (
    <div class={styles.App}>
      <section id="main" class={styles.header}>
        <div className="flex">
          <img src={logo} class={styles.logo} alt="logo" />
          <Controls />
          <Info />
        </div>
        <Peers />
      </section>
      <footer>
          <button onclick={toggle_rainbow}>rainbow</button>
          - made with ❤️ by <a target="_blank" href="https://www.twitter.com/dnilabs">dni</a> and
          &nbsp;<a target="_blank" href="https://www.twitter.com/michael1011">michael1011</a>
          <p>Balanzierer, core lightning balancing plugin frontend, version: {version}</p>
      </footer>
    </div>
  );
};

export default App;
