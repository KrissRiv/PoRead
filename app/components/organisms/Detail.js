import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, VirtualizedList} from 'react-native';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-community/async-storage';

import Header from '../molecules/Header';
import Icon from '../atoms/Icon';

const spinnerSource = require('../../assets/icons/spinner.json');

const Detail = ({route, navigation}) => {
  const {body, currentPosts, id, onOpen, setPost, userId} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [detailUser, setDetailUser] = useState({});
  const [commentsPost, setCommentsPost] = useState({});
  const {getItem, setItem} = useAsyncStorage(`@detail_User_${userId}`);

  const getUserDetail = async () => {
    const userPost = await getItem();
    let detailUserPost = JSON.parse(userPost);
    try {
      if (!detailUserPost) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then(response => response.json())
          .then(json => {
            detailUserPost = json;
            setDetailUser(detailUserPost);
            setItem(JSON.stringify(detailUserPost));
          })
          .catch(error => console.error(error));
      } else {
        setDetailUser(detailUserPost);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCommentsByUser = async () => {
    const comments = await AsyncStorage.getItem(`@comments_Post_${id}`);
    let commentsByPost = JSON.parse(comments);
    try {
      if (!commentsByPost) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
          .then(response => response.json())
          .then(async json => {
            commentsByPost = json;
            setCommentsPost(json);
            await AsyncStorage.setItem(
              `@comments_Post_${id}`,
              JSON.stringify(json),
            );
          })
          .catch(error => console.error(error))
          .finally(() => setLoading(false));
      } else {
        setCommentsPost(commentsByPost);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setOpenPost = () => {
    const newListPosts = currentPosts.map(post =>
      post.id === id
        ? {
            ...post,
            isNew: false,
          }
        : {...post},
    );
    onOpen(newListPosts);
    setPost(JSON.stringify(newListPosts));
  };

  useEffect(() => {
    getUserDetail();
    getCommentsByUser();
    setOpenPost();
  }, []);

  const getItemList = (list, index) => {
    return list[index];
  };

  const getItemCountList = list => {
    return list.length;
  };

  const onFavorite = postId => {
    const newListPosts = currentPosts.map(post =>
      post.id === postId
        ? {
            ...post,
            isFavorite: true,
          }
        : {...post},
    );
    onOpen(newListPosts);
    setPost(JSON.stringify(newListPosts));
  };

  return (
    <View style={styles.container}>
      <Header
        onFavorite={() => onFavorite(id)}
        type={'favorite'}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.post}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.body}>{body}</Text>
        <Text style={styles.user}>User</Text>
        <View style={styles.detailUser}>
          <Text style={styles.user_item}>{detailUser.name}</Text>
          <Text style={styles.user_item}>{detailUser.email}</Text>
          <Text style={styles.user_item}>{detailUser.phone}</Text>
          <Text style={styles.user_item}>{detailUser.website}</Text>
        </View>
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
        ) : (
          <>
            <Text style={styles.comments_title}>
              {'Comments'.toUpperCase()}
            </Text>
            <VirtualizedList
              data={commentsPost}
              getItem={getItemList}
              getItemCount={getItemCountList}
              renderItem={({item}) => (
                <Text style={styles.comment}>{item.name}</Text>
              )}
              style={styles.list}
              keyExtractor={item => item.id.toString()}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },
  comment: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 10,
    paddingRight: 40,
    fontSize: 16,
    color: 'gray',
  },
  comments_title: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'gainsboro',
  },
  body: {
    alignContent: 'center',
    color: 'gray',
    fontSize: 16,
    lineHeight: 36,
    marginTop: 10,
  },
  detailUser: {
    alignContent: 'center',
  },
  label: {
    alignContent: 'center',
    color: 'white',
    fontSize: 18,
    opacity: 0.8,
  },
  title: {
    alignContent: 'center',
    color: 'grey',
    fontSize: 28,
    fontWeight: 'bold',
  },
  user: {
    alignContent: 'center',
    color: 'grey',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  user_item: {
    alignContent: 'center',
    color: 'gray',
    fontSize: 16,
    lineHeight: 32,
  },
  post: {
    flex: 1,
    alignContent: 'center',
    padding: 10,
  },
});

export default Detail;
