const getDeviceNameFromScreenKey = (screen) => {
  let deviceName = 'mobile';
  if (screen === 'isTablet') {
    deviceName = 'tablet';
  } else if (screen === 'isBigTablet') {
    deviceName = 'bigTablet';
  } else if (screen === 'isDesktop') {
    deviceName = 'desktop';
  }

  return deviceName;
};

const getImageSizeByScreen = (imageSizes, screens) => {
  const imageSize = {
    width: 0,
    height: 0,
  };

  for (const [key, value] of Object.entries(screens)) {
    if (value) {
      const deviceName = getDeviceNameFromScreenKey(key);
      const { width, height } = imageSizes[deviceName];
      imageSize.width = width;
      imageSize.height = height;
    }
  }

  return imageSize;
};

export default getImageSizeByScreen;
