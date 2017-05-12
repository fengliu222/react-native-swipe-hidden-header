A react native component that can hide navigator bar when user swipe list.

![](http://ww1.sinaimg.cn/large/56628d96ly1ffj9k63enjg207k0dcn9q.gif)

**USAGE**
```jsx
render() {
    return (
      <SwipeHiddenHeader
        header={()=> <View style={styles.header}><Text style={styles.headerText}>Header</Text></View>}
      >
        <View style={styles.block}>
            <Text>This is content</Text>
        </View>
      </SwipeHiddenHeader>
    );
  }
```