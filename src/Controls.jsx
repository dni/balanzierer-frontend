function Controls() {
  return (
    <div id="controls">
      <button>Get Channel Balances</button>
      <button>Start balancing</button>
      <div className="control-form">
          <div className="control">
              <label htmlFor="amount">Amount: </label>
              <input name="amount" type="number" value="1000" />
          </div>
          <div className="control">
              <label htmlFor="maxppm">Max PPM: </label>
              <input name="maxppm" type="number" value="400" />
          </div>
          <div className="control">
              <label htmlFor="outscid">Outgoing Channel: </label>
              <input name="outscid" type="text" value="" />
          </div>
          <div className="control">
              <label htmlFor="inscid">Incoming Channel: </label>
              <input name="inscid" type="text" value="" />
          </div>
      </div>
    </div>
  );
}

export default Controls;
