import { createSignal } from "solid-js";

export const [amount, setAmount] = createSignal(1000);
export const [maxppm, setMaxppm] = createSignal(100);
export const [outscid, setOutscid] = createSignal("");
export const [inscid, setInscid] = createSignal("");

function Controls() {
  return (
    <div id="controls">
      <button>Start balancing</button>
      <button>Stop balancing</button>
      <div className="control-form">
          <div className="control">
              <label htmlFor="amount">Amount: </label>
              <input name="amount" type="number" value={amount()} />
          </div>
          <div className="control">
              <label htmlFor="maxppm">Max PPM: </label>
              <input name="maxppm" type="number" value={maxppm()} />
          </div>
          <div className="control">
              <label htmlFor="outscid">Outgoing Channel: </label>
              <input name="outscid" type="text" value={outscid()} />
          </div>
          <div className="control">
              <label htmlFor="inscid">Incoming Channel: </label>
              <input name="inscid" type="text" value={inscid()} />
          </div>
      </div>
    </div>
  );
}

export default Controls;
