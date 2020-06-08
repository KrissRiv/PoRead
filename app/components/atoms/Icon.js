import React from 'react';
import LottieView from 'lottie-react-native';

const Icon = props => {
  const {animation, source} = props;
  return <LottieView ref={animation} source={source} {...props} />;
};

export default Icon;
