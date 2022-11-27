import {
    channels, setChannels
} from './signals';


function Channels() {
  return (
    <div id="channels" class="section">
      <h2>Channels (2)</h2>
      <ul>
         <li className="channel">
          <span className="channel-id">1337x420</span>
          <span className="channel-balances">
              <label>local: <span className="channel-local">1.200.123</span></label>
              <label>remote: <span className="channel-remote">2.200.123</span></label>
          </span>
          <span className="channel-bar">
              <span className="channel-bar-percent" style="width: 45%;"></span>
          </span>
         </li>
         <li className="channel">
          <span className="channel-id">1337x420</span>
          <span className="channel-balances">
              <label>local: <span className="channel-local">1.200.123</span></label>
              <label>remote: <span className="channel-remote">2.200.123</span></label>
          </span>
          <span className="channel-bar">
              <span className="channel-bar-percent" style="width: 45%;"></span>
          </span>
         </li>
      <For each={channels()} fallback={<div>no channels</div>}>
          {(channel, index) => (
             <li className="channel" key={index()}>
              <span className="channel-id">{channel.id}</span>
             </li>
          )}
      </For>
      </ul>
    </div>
  );
}

export default Channels;
