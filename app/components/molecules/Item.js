import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from '../atoms/Icon';

const favoriteMarkSource = require('../../assets/icons/favorite-mark.json');

const Item = props => {
  const {navigation, onDelete, post} = props;
  //console.log('post ', post);
  const [selectId, setSelectId] = useState(null);
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  const goDetail = propsPost => {
    const {currentPosts, onOpen, setPost} = propsPost;
    navigation.navigate('Detail', {
      post,
      currentPosts,
      onOpen,
      setPost,
    });
  };

  const onSwipeLeft = postId => {
    setSelectId(postId);
    onDelete(postId);
  };
  const onSwipeRight = postId => {
    setSelectId(postId);
    onDelete(postId);
  };

  return (
    <GestureRecognizer
      config={config}
      onSwipeLeft={() => onSwipeLeft(post.id)}
      onSwipeRight={onSwipeRight}
      style={
        selectId === post.id ? [styles.container, styles.active] : styles.container
      }>
      <TouchableOpacity style={styles.item} onPress={() => goDetail(props)}>
        <View style={post.isNew ? styles.circle : styles.without_circle} />
        <Text style={styles.title}>{post.title}</Text>
        {post.isFavorite && (
          <Icon
            style={styles.favorite}
            colorFilters={[{keypath: 'Star Outlines', color: '#daa520'}]}
            source={favoriteMarkSource}
          />
        )}
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: 'lightgrey',
  },
  container: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 10,
    paddingRight: 40,
    alignContent: 'stretch',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginTop: 7,
    marginHorizontal: 5,
    backgroundColor: 'royalblue',
  },
  favorite: {
    width: 30,
    right: 5,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  without_circle: {
    marginRight: 5,
  },
  title: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    fontSize: 18,
    paddingHorizontal: 5,
    marginRight: 25,
  },
});

export default Item;
