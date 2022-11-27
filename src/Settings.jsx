import {
    usr,
    wallet_id,
    api_key,
    showsettings,
    setShowsettings,
} from "./signals"

import { lnbits_url } from "./config"

const open_lnbits = () => window.open(lnbits_url + "/wallet?usr=" + usr(), "_blank");

function Settings() {
  return (
    <section id="settings">
      <button onClick={open_lnbits}>lnbits</button>
      <button class={ showsettings() === true ? "hidden" : ""} onClick={(e) => setShowsettings(true)}>settings</button>
      <div id="settings-content" class={ showsettings() === false ? "hidden" : ""}>
          <h2>user info</h2>
          <b>usr: </b> {usr()}<br />
          <b>wallet_id: </b> {wallet_id()}<br />
          <b>api_key: </b> {api_key()}<br />
        <button onClick={(e) => setShowsettings(false)}>hide settings</button>
      </div>
    </section>
  );
}

export default Settings;
