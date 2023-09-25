const fs = require('fs');
const path = require('path');

const getLocalConfig = () => {
  const localProxyFilePath = path.resolve(__dirname, './proxy.conf.local.js');

  if (!fs.existsSync(localProxyFilePath)) return {};

  const localConfig = require(localProxyFilePath);

  console.info('Loaded proxy config from', localProxyFilePath);

  return localConfig;
};

module.exports = {
  ...getLocalConfig(),
};
