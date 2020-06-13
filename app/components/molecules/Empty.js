import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from '../atoms/Icon';

const emptySource = {
  delete: require('../../assets/icons/empty.json'),
  favorite: require('../../assets/icons/favorites.json'),
  internet: require('../../assets/icons/no-wifi.json'),
};

const Empty = props => {
  const {title, subTitle, type} = props;
  const animation = useRef(null);

  useEffect(() => {
    animation.current.play();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub_title}>{subTitle}</Text>
      <Icon
        animation={animation}
        style={styles.animation}
        source={emptySource[type]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    flex: 2,
    opacity: 0.5,
  },
  title: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 36,
    fontWeight: 'bold',
    paddingTop: 180,
  },
  sub_title: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});

export default Empty;
