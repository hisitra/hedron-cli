#!/home/hisitra/.nvm/versions/node/v10.19.0/bin/node

const executor = require("./client");

(async function() {
  try {
    const res = await executor(process.argv);
    console.info(res);
  } catch(err) {
    console.error(err);
  }
})();
