const config = {
  appName: 'WebNativeApp',
  storage: 'local',
  hardwareBackPress: true,
};

config.locally = config.storage === 'local' || config.storage === 'localfake';

export default config;
