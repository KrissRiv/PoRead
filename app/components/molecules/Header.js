import React, {useRef} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from '../atoms/Icon';

const iconSource = {
  back: require('../../assets/icons/back.json'),
  favorite: require('../../assets/icons/star.json'),
  refresh: require('../../assets/icons/refresh.json'),
};

const Header = props => {
  const {onBack, children, onFavorite, onRefresh, type} = props;
  const animation = useRef(null);
  const backAnimation = useRef(null);

  const onPress = () => {
    animation.current.play();
  };

  const onPressBack = () => {
    backAnimation.current.play();
  };

  const getTitle = () => {
    return (
      <>
        {type === 'refresh' ? (
          <Text style={styles.title}>Posts</Text>
        ) : (
          <TouchableOpacity onPress={onPressBack}>
            <Icon
              animation={backAnimation}
              loop={false}
              autoplay={true}
              colorFilters={[
                {keypath: 'Shape Layer 7', color: '#FFFFFF'},
                {keypath: 'Shape Layer 6', color: '#FFFFFF'},
                {keypath: 'Shape Layer 5', color: '#FFFFFF'},
              ]}
              style={styles.back}
              source={iconSource.back}
              onAnimationFinish={onBack}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View
      style={type === 'refresh' ? styles.container : styles.containerDetail}>
      {getTitle()}
      <TouchableOpacity onPress={onPress}>
        <Icon
          animation={animation}
          loop={false}
          colorFilters={[
            {
              keypath:
                type === 'refresh' ? 'Refresh Outlines' : 'Favourite Outlines',
              color: 'white',
            },
            {
              keypath: type === 'favorite' ? 'Burst' : 'Favourite Outlines',
              color: 'white',
            },
            {keypath: 'Plate_white', color: '#32cd32'},
          ]}
          style={styles.refresh}
          source={iconSource[type]}
          onAnimationFinish={type === 'refresh' ? onRefresh : onFavorite}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerDetail: {
    justifyContent: 'space-between',
    backgroundColor: '#32cd32',
    height: 50,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'stretch',
    backgroundColor: '#32cd32',
    height: 109,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 25,
    color: 'white',
    padding: 15,
    paddingLeft: 15,
  },
  refresh: {
    backgroundColor: 'blue',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  back: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: 10,
  },
});

export default Header;
