
import React, { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar,FlatList,Text,ActivityIndicator ,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image} from 'react-native';
import { stockReport } from '../../request';
import Header from '../../common/Header';
import {rounder} from './../../common/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; 
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
const TenderCash =({navigation,route}) =>{
  const [decimal, setDecimal] = useState("");
    const [data, setData] = useState("");
    const [cashes, setCashes] = useState("");
    const [loading, setLoading] = useState(false);
    const getDecimal=async()=>
{
  const decimals = await AsyncStorage.getItem("decimals");
  setDecimal(decimals)
}

    React.useEffect(() => {
     
        getDecimal();
        console.log("route",route.params.data)
        if(route.params.from)
        {
          setData(route.params.data) 
     console.log(route.params.data[0].details)
        }
        else
        {
          console.log("cashes",route.params.data)
        setCashes(route.params.data) 
        }
     
    }, [route]);

    
    const Item = ({ item }) => {
      console.log("item",item)
      return (

        <View style={styles.boxView}>
        <View style={styles.boxInnerView}>

       

        <View style={{ flexDirection: "column" }}>
        <Text style={styles.boxTextTag}>Counter : {item.item} </Text>
           {item.details.map((item)=>(<View> <Text style={styles.boxTextTag}>Amount : {item.amount} </Text>
            <Text style={styles.boxTextTag1}>name:{item.name} </Text></View>))}
        </View>
        

</View>


    </View>
      );
  }
  const Cash = ({ item }) => {
    console.log("item",item)
    return (

      <View style={styles.boxView}>
      <View style={styles.boxInnerView}>

     

      <View style={{ flexDirection: "column" }}>
      <Text style={styles.boxTextTag}>Counter : {item.item} </Text>
         {item.details.map((item)=>(<View> <Text style={styles.boxTextTag}>Amount : {item.amount} </Text>
          <Text style={styles.boxTextTag1}>name:{item.name} </Text></View>))}
      </View>
      

</View>


  </View>
    );
}
    const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
  
        </View>
      );
    }
  return (
      
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4',marginTop:StatusBar.currentHeight }}>
       
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "orange" translucent = {true}/>
        <View style={{ backgroundColor: '#f1f2f4' ,alignItems:"flex-start",margin:15}}>
      
<Header name ="Tender Cashlist" screenName="Tender Cash"/>
                </View>
       



 

   

   <View style={{flex:1,marginTop:10}}>
  {route.params.from ?
   <FlatList
                    numColumns={1}
                    data={data}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => <Item item={item} />}

                />:<FlatList
                numColumns={1}
                data={cashes}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => <Cash item={item} />}

            />
  }

   

   
</View>


 
</SafeAreaView>

        
       
      
   
  );
}

const styles = StyleSheet.create({
 
  boxTextTag: {
    padding: 5, flex: 1,
    textAlign: "left",
    fontWeight: 'bold',color:"#000"



},
boxTextTag1: {
    color: "#008000",
    padding: 5, flex: 1,
    textAlign: "left",
    fontWeight: 'bold'



},
  button: {
    backgroundColor:"#000000",
    alignItems: "center",
    padding: 10,
    marginLeft:20,
    marginRight:20,
    marginTop:20
   
  },

  boxImage:{
    width:50,
    height:60,
    resizeMode: 'stretch'
  },
  boxImageHead:{
   width:40,
   height:40,
   resizeMode: 'stretch'
 },


  boxText: {

    padding:5,
    textAlign: "center",
    fontWeight:'bold',
    color:"#000"
    
  
   
  },
  boxTextBold: {

   padding:5,
   fontSize:25,
   color:"#000000",
   textAlign: "center",
   fontWeight:'bold',
   
 
  
 },
 lottie: {
  width: 100,
  height: 100,
},

  boxView:{
    padding:50,
    borderRadius:10,
  
    backgroundColor:'#ffffff',
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3
  },

  boxInnerView:{
    alignItems:'center',
    justifyContent:'center'
  },


  input: {
    backgroundColor:"#ffffff",
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop:5,
    marginBottom:5,
    borderWidth: 1,
    padding: 5,
  },

  titleText: {
   color:'#FFFFFF',
   fontWeight: 'bold',
   fontSize:20
  },

  footerText: {
    color:'#fff',
    fontSize:15,
    textAlign:'center'
   },
 


 
});

export default TenderCash