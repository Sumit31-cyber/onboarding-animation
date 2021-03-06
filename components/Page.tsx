import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'

interface PageProps{
    title:string,
    index:number,
    translateX:Animated.SharedValue<number>;
}
const {height, width} = Dimensions.get('window')
const SIZE = width * 0.7;

const Page:React.FC<PageProps> = ({index, title, translateX}) => {
    const inputRange =   [(index - 1) * width, index*width, (index + 1) * width]

    const rTextStyle = useAnimatedStyle(()=>{
        const translateY = interpolate(translateX.value,inputRange,[height/2,0,-height/2],Extrapolate.CLAMP)
        const opacity = interpolate(translateX.value, inputRange, [-2,1,-2],Extrapolate.CLAMP )
        return {
            opacity, 
            transform:[
                {translateY}
            ]
        }
    })   

    const rStyle = useAnimatedStyle(()=>{


        // Scaling Square according to screen dimensions?
        const scale = interpolate(translateX.value, 
          inputRange
         ,[0,1,0],
        Extrapolate.CLAMP
        )

        // Scaling Border Radius according to screen dimensions?
        const borderRadius = interpolate(translateX.value, 
            inputRange
           ,[0,SIZE/2,0],
          Extrapolate.CLAMP
          )
        return {
            borderRadius,
            transform:[
                {scale}
            ]
        }
    })
    return <View style = {[styles.pageContainer ,{backgroundColor:`rgba(0,0,256,0.${index + 2})`}]}>
        <Animated.View style = {[styles.square, rStyle]}/>
        <Animated.View style = {[{position:'absolute'}, rTextStyle]}>
            <Text style = {styles.text}>{title}</Text>
        </Animated.View>
    </View>
} 

const styles = StyleSheet.create({
    pageContainer:{
        width,
        height:height+30,
        alignItems:'center',
        justifyContent:'center'
    },
    square:{
        width:SIZE,
        height:SIZE,
        backgroundColor:'rgba(0,0,256,0.4)',
    },
    text:{
        fontSize:70,
        color:'#fff',
        textTransform:'uppercase',
        fontWeight:'700'
    }
})

export default Page