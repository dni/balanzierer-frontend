import {
    peers, setPeers
} from './signals';

import {
    inscid, setInscid,
    outscid, setOutscid,
} from './Controls';

const channel_width = (channel) => "width: " + (channel.msatoshi_to_us / channel.msatoshi_total * 100) + "%;";
const peercolor = (color) => "background: #" + color + ";";

const channel_click = (e) => {
    let inc = inscid()
    let outc = outscid()
    let data = e.currentTarget.dataset;
    let short_id = data.id;
    let active = data.active;
    if (active === "1") {
        data.active = "0";
        data.type = "";
        if (inc == short_id) {
            setInscid("");
        }
        if (outc == short_id) {
            setOutscid("");
        }
    } else {
        data.active = "1";
        if (outc) {
            data.type = "in";
            setInscid(short_id);
        } else {
            data.type = "out";
            setOutscid(short_id);
        }
    }
}

function Peers() {
  return (
    <div id="peers" class="section">
      <h2>Channels</h2>
      <ul>
      <For each={peers()} fallback={<div>no peers</div>}>
          {(peer, index) => (
          <li className="peer">
             <div className="peer-info" style={peercolor(peer.color)}>
             <p className="peer-alias"><b>Peer Alias: </b>{peer.alias}</p>
             <p className="peer-color"><b>Peer Color: </b>{peer.color}</p>
             </div>
             <For each={peer.channels} fallback={<div>no channels</div>}>
             {(channel, index) => (
                 <div className="channel" onclick={channel_click} data-type="" data-active="0" data-id={channel.short_channel_id}>
                  <p className="channel-id">{channel.id}</p>
                  <p className="channel-state"><b>Channel State: </b>{channel.state}</p>
                  <p className="channel-short-channel-id"><b>Short Channel ID: </b>{channel.short_channel_id}</p>
                  <p className="channel-total"><b>Total Channel Capacity: </b>{(channel.msatoshi_total / 1000).toLocaleString()} sat</p>
                  <span className="channel-balances">
                      <label>local: <span className="channel-local">{(channel.msatoshi_to_us / 1000).toLocaleString()}</span></label>
                      <label>remote: <span className="channel-remote">{((channel.msatoshi_total - channel.msatoshi_to_us) / 1000).toLocaleString()}</span></label>
                  </span>
                  <span className="channel-bar">
                      <span className="channel-bar-percent" style={channel_width(channel)} ></span>
                  </span>
                 </div>
             )}
             </For>
          </li>
          )}
      </For>
      </ul>
    </div>
  );
}

export default Peers;
