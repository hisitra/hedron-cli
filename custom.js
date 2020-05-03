#!/home/hisitra/.nvm/versions/node/v10.19.0/bin/node

const executor = require("./client");

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
  for(let i = 0; i < 102; i++) {
    executor(["", "", "localhost:4002", "update", "some-key", "some-value-"+i, "shivansh"])
    .then(res => {})
    .catch(err => {});

    await sleep(10);
  }
  console.info("Done.");
})();

