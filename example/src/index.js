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
    startHiddenHeaderOffset: PropTypes.number,
    style: PropTypes.object,
    headerWrapStyle: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      headerHeight  : 64,
      offsetY       : 0,
      headerOffsetY : 0
    };
  }

  /**
   * Calculate header offset Y.
   * @param currentOffsetY
   * @param lastOffsetY
   * @returns {number}
   */
  calcHeaderOffsetY = (currentOffsetY, lastOffsetY) =>{
    const startHiddenOffset = (this.props.startHiddenHeaderOffset !== undefined) ? this.props.startHiddenHeaderOffset : this.state.headerHeight
    const headerOffsetY = this.state.headerOffsetY

    /**
     * Swipe up
     */
    if(currentOffsetY > lastOffsetY){
      if(currentOffsetY < startHiddenOffset){
        return headerOffsetY
      }
      if(-headerOffsetY > this.state.headerHeight){
        return -this.state.headerHeight
      }
      return headerOffsetY-(currentOffsetY - lastOffsetY)
    }else{
    /**
     * Swipe down
     */
      if(headerOffsetY + (lastOffsetY - currentOffsetY) > 0){
        return 0
      }else{
        return headerOffsetY + (lastOffsetY - currentOffsetY)
      }
    }

  }

  calcScrollViewTop = ()=>{
    if(this.state.offsetY > 0 && this.state.offsetY < this.state.headerHeight){
      return this.state.headerHeight - this.state.offsetY
    }else if(this.state.offsetY <= 0){
      return this.state.headerHeight
    }else{
      return 0
    }
  }
  /**
   * Get current header component height.
   * The height value will be the default value of startHiddenOffset in `calcHeaderOffsetY` function.
   * @param e
   */
  onHeaderLayout = (e)=> {
    this.setState({
      headerHeight: e.nativeEvent.layout.height
    })
  }

  onScroll = (e)=>{
    /**
     * Allow parent component do something when 'onScroll' event is fired.
     */
    if(!this.props.renderScrollComponent){
      this.props.scrollViewProps.onScroll && this.props.scrollViewProps.onScroll(e)
    }

    const offsetY = e.nativeEvent.contentOffset.y
    const lastOffsetY = this.state.offsetY

    /**
     * Prevent animation when ios scroll bounce.
     */
    const contentHeight = e.nativeEvent.contentSize.height
    const layoutHeight = e.nativeEvent.layoutMeasurement.height
    if(offsetY <= 0) {
      this.setState({
        offsetY,
      })
      return
    }
    if(contentHeight / layoutHeight <= 1){
      if(offsetY > 0){
        this.setState({
        offsetY,
      })
        return
      }
    }else{
      if(offsetY > (contentHeight - layoutHeight)){
        this.setState({
        offsetY,
      })
        return
      }
    }

    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 100
    })

    this.setState({
      offsetY,
      headerOffsetY : this.calcHeaderOffsetY(offsetY,lastOffsetY)
    })
  }

  scrollViewStyle = ()=> ({
    position:'absolute',
    left:0,
    right:0,
    top: this.calcScrollViewTop(),
    bottom:0
  })

  renderScrollView(){
    return (
      <ScrollView
        scrollEventThrottle={16}
        {...this.props.scrollViewProps}
        onScroll={this.onScroll}
        style={this.scrollViewStyle()}
      >
        {this.props.children}
      </ScrollView>
    )
  }

  /**
   * Inject onScroll prop into custom scroll component
   */
  renderCustomScrollView(){
    const customScrollView = this.props.renderScrollComponent()
    return React.cloneElement(customScrollView, {
      scrollEventThrottle: 16,
      style: this.scrollViewStyle(),
      onScroll: (e)=> {
        this.onScroll(e)
        customScrollView.props.onScroll && customScrollView.props.onScroll(e)
      }
    })
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
          {this.props.renderScrollComponent ? this.renderCustomScrollView() : this.renderScrollView()}
        </View>
      </View>
    );
  }

}

export default SwipeHiddenHeader;
