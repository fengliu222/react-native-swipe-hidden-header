import React, { Component, PropTypes } from 'react';
import { View, ScrollView, LayoutAnimation } from 'react-native'
import styles from './style'

class SwipeHiddenHeader extends Component {
  static defaultProps = {
    scrollViewProps: {}
  };

  static propTypes = {
    header: PropTypes.func.isRequired,
    scrollViewProps: PropTypes.object,
    renderScrollComponent: PropTypes.func,
    style: PropTypes.object,
    headerWrapStyle: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      headerHeight  : 64,
      offsetY       : 0,
      headerOffsetY :0
    };
  }

  calcHeaderTop = (current, last) =>{
    let offsetY = current
    let lastY = last
    let headerHeight = this.state.headerHeight
    let headerTop = this.state.headerOffsetY

    if(offsetY > lastY){
      if(offsetY < headerHeight){
        return headerTop
      }
      if(-headerTop >= headerHeight){
        return -headerHeight
      }
      return headerTop-(offsetY - lastY)
    }else{
      if(headerTop + (lastY - offsetY) > 0){
        return 0
      }else{
        return headerTop + (lastY - offsetY)
      }
    }

  }

  onHeaderLayout = (e)=> {
    this.setState({
      headerHeight: e.nativeEvent.layout.height
    })
  }

  onScroll = (e)=>{
    this.props.scrollViewProps.onScroll && this.props.scrollViewProps.onScroll(e)
    let offsetY = e.nativeEvent.contentOffset.y
    const lastOffsetY = this.state.offsetY
    if(offsetY > e.nativeEvent.layoutMeasurement.height) return
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 100
    })
    this.setState({
      offsetY,
      headerOffsetY : this.calcHeaderTop(offsetY,lastOffsetY)
    })
  }

  renderScrollView(){
    return (
      <ScrollView
        scrollEventThrottle={24}
        {...this.props.scrollViewProps}
        onScroll={this.onScroll}
      >
        <View style={{height: this.state.headerHeight}}></View>
        {this.props.children}
      </ScrollView>
    )
  }

  render() {
    let Header = this.props.header
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.header.container, this.props.headerWrapStyle, {
          top: this.state.headerOffsetY
        }]} onLayout={this.onHeaderLayout}>
          <Header/>
        </View>
        <View style={styles.scroll.wrap}>
          {this.props.renderScrollComponent ? this.props.renderScrollComponent() : this.renderScrollView()}
        </View>
      </View>
    );
  }

}

export default SwipeHiddenHeader;
