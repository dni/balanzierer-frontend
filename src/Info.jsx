import {
    info, setInfo
} from './signals';


function Info() {
  return (
    <div id="info" class="section">
      <h2>Info</h2>
      <p><b>Pubkey: </b>{info().id}</p>
      <div className="labels">
          <p><b>Alias: </b>{info().alias}</p>
          <p><b>Color: </b>#{info().color}</p>
          <p><b>Peers: </b>{info().num_peers}</p>
          <p><b>Active channels: </b>{info().num_active_channels}</p>
          <p><b>Inactive channels: </b>{info().num_inactive_channels}</p>
          <p><b>Pending channels: </b>{info().num_pending_channels}</p>
          <p><b>Fees Collected: </b>{info().msatoshi_fees_collected}</p>
          <p><b>Blockheight: </b>{info().blockheight}</p>
          <p><b>Network: </b>{info().network}</p>
          <p><b>Version: </b>{info().version}</p>
      </div>
    </div>
  );
}

export default Info;
