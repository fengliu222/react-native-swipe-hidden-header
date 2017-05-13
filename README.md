# React Native Swipe Hidden Header
![npm version](https://img.shields.io/npm/v/react-native-swipe-hidden-header.svg?style=flat-square)

A react native component that can hide navigator bar when user swipe list.

![](http://ww1.sinaimg.cn/large/56628d96ly1ffj9k63enjg207k0dcn9q.gif)

### Example
The demo app from the GIF can be found at `./example`.

To build and run the example app:

```bash
git clone https://github.com/fengliu222/react-native-swipe-hidden-header.git

cd react-native-swipe-hidden-header/examples
npm install
react-native run-ios
```

### Installation

#### Using npm:

```sh
$ npm install --save react-native-swipe-hidden-header
```

#### Using yarn:

```sh
$ yarn add react-native-swipe-hidden-header
```

**USAGE**

Use internal scrollView:

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

Use custom scrollView:

```jsx
render() {
    return (
      <SwipeHiddenHeader
        header={()=> <View style={styles.header}><Text style={styles.headerText}>Custom</Text></View>}
        renderScrollComponent={()=> <FlatList
          data={[{key: 'a'},{key: '2'},{key: '2a'},{key: '3a'},{key: 'a4'},{key: 'a1'}, {key: 'b'}, {key: 'b2'}, {key: 'b3'}, {key: 'b1'}]}
          renderItem={(item)=> <TouchableOpacity onPress={()=> props.changeType('normal')} style={styles.block}><Text>Tap here to Custom list view</Text></TouchableOpacity>}
        />}
      />
    );
  }
```

### Props

| Prop | Type | Description |
|---|---|---|
|**`children`**|`ReactElement<any>`|React Element(s) to render.|
|**`header`**|`() => ReactElement<any>`|Callback that renders a header component|
|**`renderScrollComponent`**|`?() => ReactElement<any>`|Callback that renders a ScrollComponent.|
|**`startHiddenHeaderOffset`**|`?number`|When offsetY reach this value, header will start hide.|
|**`headerWrapStyle`**|`?Object`|The styles of the header wrap element.|

### Platform Support

iOS / Android