import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { primaryColor, white } from '../../styles/theme'
import { f16, primaryFontMedium } from '../../styles/appStyles'

const Button = ({name,height,width,onPress}) => {
  return (
    <TouchableOpacity style={[styles.button,{height:height?height:'auto',width:width?width:"100%"}]} onPress={onPress}>
      <Text style={{fontSize:f16, color:white,fontFamily:primaryFontMedium}}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor:primaryColor,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    }
})