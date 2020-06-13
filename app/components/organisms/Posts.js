/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Alert, View, VirtualizedList, StyleSheet} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

import useFetch from '../hooks/useFetch';
import Header from '../molecules/Header';
import Filters from '../molecules/Filters';
import Delete from '../molecules/Delete';
import Empty from '../molecules/Empty';
import Icon from '../atoms/Icon';
import Item from '../molecules/Item';

const spinnerSource = require('../../assets/icons/spinner.json');

const Posts = props => {
  const [isFilter, setFilter] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState(false);

  const {getItem, removeItem, setItem} = useAsyncStorage('@posts');
  const {error, loading: isLoading, response: posts} = useFetch('posts');

  const getAllPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        const listPosts = json.map((post, index) => ({
          ...post,
          isFavorite: false,
          isNew: index < 20,
        }));
        setAllPosts(listPosts);
        setCurrentPosts(listPosts);
        setItem(JSON.stringify(listPosts));
      })
      .catch(error => console.error(error));
  };

  const getData = () => {
    console.log('getData ', isFilter);
    let data = [];
    if (isFilter) {
      data = posts.filter(post => post.isFavorite);
    } else {
      data = posts;
    }
    return data;
  };

  /* const fetchPosts = async () => {
    try {
      const jsonPosts = await getItem();
      const list = JSON.parse(jsonPosts);
      if (list) {
        setCurrentPosts(list);
        //setLoading(false);
      } else {
        getAllPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    //fetchPosts();
  }, []); */

  const getItemList = (list, index) => {
    return list[index];
  };

  const getItemCountList = list => {
    return list.length;
  };

  const onDelete = postId => {
    const onConfirm = async () => {
      if (postId) {
        const newListPosts = currentPosts.filter(post => post.id !== postId);
        setCurrentPosts(newListPosts);
        setItem(JSON.stringify(newListPosts));
      } else {
        await removeItem(() => {
          setCurrentPosts([]);
        });
      }
    };
    const onCancel = async () => {
      Toast.show('Do not worry, nothing was erased!', Toast.LONG);
    };
    return Alert.alert(
      'Are you sure?',
      'This action will remove the post(s).',
      [
        {text: 'Cancel', onPress: () => onCancel(), style: 'cancel'},
        {text: 'OK', onPress: () => onConfirm()},
      ],
      {cancelable: false},
    );
  };

  const onFilter = filter => {
    setFilter(filter);
    if (filter) {
      const filteredPosts = currentPosts.filter(post => post.isFavorite);
      setFavoritePosts(filteredPosts);
    } else {
      setFavoritePosts(false);
    }
  };

  const onRefresh = () => {
    if (allPosts.length > 0 && allPosts.length === currentPosts.length) {
      Toast.show('Wait cowboy! You already have all the posts.', Toast.LONG);
    } else {
      getAllPosts();
    }
  };

  return (
    <View style={styles.container}>
      <Header onRefresh={onRefresh} type={'refresh'}>
        <Filters onFilter={onFilter} isFilter={isFilter} />
      </Header>
      {isLoading ? (
        <Icon
          colorFilters={[
            {keypath: 'Spinner', color: '#32cd32'},
            {keypath: 'Shape Layer 1', color: '#fffafa'},
          ]}
          source={spinnerSource}
          autoPlay
          loop
        />
      ) : posts ? (
        <>
          <VirtualizedList
            data={getData()}
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            getItem={getItemList}
            getItemCount={getItemCountList}
            renderItem={({item, index}) => (
              <Item
                index={index}
                onDelete={onDelete}
                onOpen={setCurrentPosts}
                setPost={setItem}
                currentPosts={posts}
                post={{...item}}
                {...item}
                {...props}
              />
            )}
            style={styles.list}
            keyExtractor={item => item.id.toString()}
          />
          <Delete onDelete={onDelete} />
        </>
      ) : error ? (
        <Empty
          title={'All Was Erased'}
          subTitle={'Hey! Where is my posts?'}
          type={'internet'}
        />
      ) : !isFilter && currentPosts.length === 0 ? (
        <Empty
          title={'All Was Erased'}
          subTitle={'Hey! Where is my posts?'}
          type={'delete'}
        />
      ) : isFilter && !favoritePosts.length ? (
        <Empty
          title={'Without Favorites'}
          subTitle={'Come on, you really did not like any post?'}
          type={'favorite'}
        />
      ) : (
        <>
          <VirtualizedList
            data={favoritePosts}
            initialNumToRender={50}
            maxToRenderPerBatch={10}
            getItem={getItemList}
            getItemCount={getItemCountList}
            renderItem={({item, index}) => (
              <Item
                index={index}
                onDelete={onDelete}
                onOpen={setCurrentPosts}
                setPost={setItem}
                currentPosts={favoritePosts}
                {...item}
                {...props}
              />
            )}
            style={styles.list}
            keyExtractor={item => item.id.toString()}
          />
          <Delete onDelete={onDelete} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'snow',
    flex: 1,
  },
  list: {
    flex: 1,
    paddingBottom: 10,
  },
});

export default Posts;
