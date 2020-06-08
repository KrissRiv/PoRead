import React from 'react';
import {TouchableOpacity} from 'react-native';

const Filter = props => {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

export default Filter;
