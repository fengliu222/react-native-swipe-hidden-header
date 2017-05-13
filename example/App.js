import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Normal from './normal'
import Custom from './customScrollView'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'normal'
    }
  }

  changeType = (type) => {
    this.setState({
      type
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.type === 'normal' ? <Normal changeType={this.changeType}/> : <Custom changeType={this.changeType} />}
      </View>
    );
  }
}
