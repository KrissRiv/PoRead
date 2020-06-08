import React, {useRef} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from '../atoms/Icon';

const deleteSource = require('../../assets/icons/delete.json');

const Delete = props => {
  const {onDelete} = props;
  const animation = useRef(null);

  const onPress = () => {
    animation.current.play();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.filter}>
        <Icon
          animation={animation}
          loop={false}
          style={styles.delete}
          source={deleteSource}
          onAnimationFinish={onDelete}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  filter: {
    width: 90,
  },
});

export default Delete;
