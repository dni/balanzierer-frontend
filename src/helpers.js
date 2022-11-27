import {
    setPeers,
    peers,
    setChannels,
    channels,
    setBalance,
    balance,
} from "./signals"

import log from 'loglevel';
import {
    ws_url,
    debug,
} from "./config"

log.setLevel(debug ? 5 : 3);

export const startInterval = (cb) => {
  cb();
  return setInterval(cb, 10000);
};

export const fetcher = (url, cb, json = true, params = null) => {
  let opts = {
      // needed for cookies to work
      credentials: 'include',
  };
  if (params) {
      opts.method = 'POST';
      if (json) {
          // json request for api
          opts.headers = {
            "Content-Type": 'application/json',
          };
          opts.body = JSON.stringify(params)
      } else {
          // form request for login
          let data = new FormData();
          Object.keys(params).forEach((key) => {
              data.append(key, params[key]);
          });
          opts.body = data
      }
  }
  // fetch(api_url+url, opts)
  //   .then(async response => {
  //     if (response.status === 401) {
  //       throw new Error(`unauthorized`);
  //     }
  //     if (!response.ok) {
  //       let json = {};
  //       try {
  //         json = await response.json();
  //       } catch {
  //         throw new Error(`could not parse response json`);
  //       }
  //       let details = "";
  //       if (Array.isArray(json.detail)) {
  //         let validation_errors = json.detail.map(e => e.loc[1] + ": " + e.msg);
  //         details = validation_errors.join("\n");
  //       } else {
  //         details = json.detail;
  //       }
  //       throw new Error(`${details}`);
  //     }
  //     const json = await response.json();
  //     return json;
  //   })
  //   .then(cb)
  //   .catch((error) => {
  //       log.error(error);
  //       setErrorMessage(error.toString());
  //   });
};

export const notify = (title, body, icon) => {
  if (!icon) icon = '/assets/favicon.ico';
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(title, {body: body, icon: icon});
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(title, {body: body, icon: icon});
      }
    });
  }
}

export const setCookie = (name,value,days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};

export const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

export const deleteCookie = (name) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


export const clipboard_write = (text) => {
    if('clipboard' in navigator) {
        navigator.clipboard.writeText(text).then(function() {
          // notify("Clipboard", "Copied to clipboard");
        }, function(err) {
          notify("Clipboard", "Error copying to clipboard");
        });
    }
}

export const clipboard_read = (cb) => {
  if('clipboard' in navigator) {
    navigator.clipboard.readText().then(cb);
  }
}


// enum
const WebSocketAction = {
    error: "error",
    ping: "ping",
    pong: "pong",
    balance: "balance",
    channels: "channels",
    peers: "peers",
};

export class WebSocketService {
    constructor() {
        this.ws = new WebSocket(ws_url);
        this.ws.onerror = this.onerror;
        this.ws.onopen = this.onopen;
        this.ws.onmessage = this.onmessage;
        this.ws.onclose = this.onclose;
    }
    send(params) {
        this.ws.send(JSON.stringify(params));
    }
    onerror(event) {
    }
    onclose(event) {
    }
    onopen(event) {
        this.send(JSON.stringify({"type": WebSocketAction.user}));
    }
    onmessage(event) {
        let data = JSON.parse(event.data);
        log.debug(data);
        if (data.type == WebSocketAction.channels) {
            setChannels(data.data);
        }
        if (data.type == WebSocketAction.peers) {
            setPeers(data.data);
        }
        if (data.type == WebSocketAction.balance) {
            let amount = data.data.balance / 1000;
            setBalance(amount);
        }
        if (data.type == WebSocketAction.error) {
            setErrorMessage(data.message);
            log.error(data.type, data.message);
        }
        if (data && data.type == WebSocketAction.ping) {
           this.send({"type": WebSocketAction.pong});
        }
        if (data && data.type == WebSocketAction.pong) {
           log.debug("received pong!!!");
        }
    }
};


export default fetcher;
