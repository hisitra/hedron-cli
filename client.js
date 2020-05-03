#!/home/hisitra/.nvm/versions/node/v10.19.0/bin/node

const request = require("request");

function getRequestBody(url, key, value, nodePassword) {
  return {
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ key, value, nodePassword })
  };
}

async function sendRequest(reqBody) {
  return new Promise((resolve, reject) => {
    request(reqBody, (error, response) => { 
      if (error) {
        return reject(error);
      }
      resolve(response.body);
    });
  });
}

async function create(address, key, value, nodePassword) {
  return sendRequest(getRequestBody(address+"/create", key, value, nodePassword));
}

async function read(address, key, _, nodePassword) {
  return sendRequest(getRequestBody(address+"/read", key, "", nodePassword));
}

async function update(address, key, value, nodePassword) {
  return sendRequest(getRequestBody(address+"/update", key, value, nodePassword));
}

async function del(address, key, _, nodePassword) {
  return sendRequest(getRequestBody(address+"/delete", key, "", nodePassword));
}

const opMethods = {
  create,
  read,
  update,
  del
};

async function executor(args) {
  if (args.length != 7) {
    console.warn("Usage: <node> <scriptname> <ip:port> <operation> <key> <value> <nodePassword>");
    return;
  }

  const url = "http://"+args[2];
  const operation = args[3];
  if (!Object.keys(opMethods).includes(operation)) {
    throw "Invalid operation: "+ operation;
  }
  const key = args[4];
  const value = args[5];
  const nodePassword = args[6];

  return opMethods[operation](url, key, value, nodePassword);
}

module.exports = executor;
