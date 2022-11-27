import {
    peers, setPeers
} from './signals';


function Peers() {
  return (
    <div id="peers" class="section">
      <h2>Peers (2)</h2>
      <ul>
      <For each={peers()} fallback={<div>no peers</div>}>
          {(peer, index) => (
             <li key={index()}>
              <span className="peer-id">{peer.id}</span>
             </li>
          )}
      </For>
      </ul>
    </div>
  );
}

export default Peers;
