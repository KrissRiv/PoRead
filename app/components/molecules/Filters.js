import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Filter from '../atoms/Filter';

const Filters = props => {
  const {isFilter, onFilter} = props;
  const onPress = filter => {
    onFilter(filter);
  };

  return (
    <View style={styles.container}>
      <Filter
        style={isFilter ? styles.filter : styles.activeFilter}
        onPress={() => onPress(false)}>
        <Text style={styles.label}>ALL</Text>
      </Filter>
      <Filter
        style={!isFilter ? styles.filter : styles.activeFilter}
        onPress={() => onPress(true)}>
        <Text style={styles.label}>FAVORITE</Text>
      </Filter>
    </View>
  );
};

const styles = StyleSheet.create({
  activeFilter: {
    backgroundColor: '#32cd32',
    borderBottomColor: '#fafad2',
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  container: {
    alignContent: 'center',
    backgroundColor: '#32cd32',
    flexDirection: 'row',
    height: 50,
  },
  filter: {
    backgroundColor: '#32cd32',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  label: {
    alignContent: 'center',
    color: 'white',
    fontSize: 18,
    opacity: 0.8,
  },
  active: {
    alignContent: 'center',
    color: 'white',
  },
});

export default Filters;
