import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import SwipeHiddenHeader from './src'

export default function Custom(props){
  return (
    <SwipeHiddenHeader
      header={()=> <View style={styles.header}><Text style={styles.headerText}>Custom</Text></View>}
      renderScrollComponent={()=> <FlatList
        data={[{key: 'a'},{key: '2'},{key: '2a'},{key: '3a'},{key: 'a4'},{key: 'a1'}, {key: 'b'}, {key: 'b2'}, {key: 'b3'}, {key: 'b1'}]}
        renderItem={(item)=> <TouchableOpacity onPress={()=> props.changeType('normal')} style={styles.block}><Text>Tap here to Custom list view</Text></TouchableOpacity>}
      />}
    >
    </SwipeHiddenHeader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34,34,34,.8)'
  },
  headerText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  block: {
    margin: 15,
    backgroundColor: '#1ac964',
    height: 100,
    borderRadius: 5
  }
});
