const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

// const IPFS = require("ipfs-api");
// const ipfs = new IPFS({
//   host: "localhost",
//   port: 8080,
//   protocol: "http",
// });

export default ipfs;
