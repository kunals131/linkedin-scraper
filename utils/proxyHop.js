const PROXIES = ["https://216.239.36.53:443", "https://216.239.32.53:443"];

const cookies = [require("../cookies.json"), require("../cookies2.json")];
exports.getProxyArgs = (idx = 0) => {
  const proxy = PROXIES[idx % 2];
  const cookie = cookies[idx % 2];
  return {
    cookie,
    proxy: [`--proxy-server=${proxy}`],
  };
};
