import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from './components/Page';

const WORDS = ["What's" ,"Up", "Mobile", "Dev?"];

export default function App() {

  const translateX = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler((event)=>{
    translateX.value = event.contentOffset.x;
  })
  return (
   <Animated.ScrollView 
   pagingEnabled
   showsHorizontalScrollIndicator = {false}
   scrollEventThrottle={16}
   onScroll={scrollHandler}
   horizontal
   style = {styles.container}>
      {WORDS.map((title,index)=>{
        return(
          <Page key={index.toString()} title={title} index={index} translateX = {translateX}/>
        )
      })}

   </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
 