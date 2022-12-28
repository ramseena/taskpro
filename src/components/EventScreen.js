
import React, { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar,Text,ActivityIndicator ,TextInput,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image,FlatList} from 'react-native';
import { getEventLog } from '../request';
import Header from '../common/Header';
import {rounder,getDate,tConvert} from '../common/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; 
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
const EventScreen =({navigation,route}) =>{
  const [decimal, setDecimal] = useState("");
    const [data, setData] = useState("");
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [event,setEvent]=useState(3)
    const getDecimal = async () => {
      const decimals = await AsyncStorage.getItem("decimals");
      setDecimal(decimals)
    }
const changeDataDebit = () => {

  setEvent(1);
}
const changeDataCredit = () => {

  setEvent(2);
}
const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = data.filter(
      function (item) {
        var d = new Date(item.edate) 

        var datestring = (d.getDate()>9?d.getDate():"0"+d.getDate() ) + "-" + ((d.getMonth()+1)>9 ?(d.getMonth()+1): "0"+(d.getMonth()+1) )+ "-" + d.getFullYear() ;
        const itemData = datestring
          ? datestring.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(data);
    setSearch(text);
  }
};
const getEventLogDetails = async () => {
  let deviceId = await DeviceInfo.getUniqueId()
  const token = await AsyncStorage.getItem("token");
  const clienttoken = await AsyncStorage.getItem("clienttoken");

  const network = await NetInfo.fetch();

  if (network.isConnected) {

    const eventLog = await getEventLog(clienttoken, token, deviceId,event)

setData(eventLog.response)
setFilteredDataSource(eventLog.response)
    if (eventLog.status === 200) {

      
    }
    else if (eventLog.status === 303) { signOut() }
    else {
      showToast("no data found")
    }

  }
  else {

    showToast("please check your network connection")
  }
}
React.useEffect(() => {
  getEventLogDetails()
  },[event]);

  // Return the function to unsubscribe from the event so it gets removed on unmount

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getDecimal();
        console.log("route",route.params.data)
        setData(route.params.data) 
        setFilteredDataSource(route.params.data)
      });
    
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [route]);

    const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
  
        </View>
      );
    }
 
  const Item = ({ item, index }) => {
    var d = new Date(item.edate) 

var datestring = (d.getDate()>9?d.getDate():"0"+d.getDate() ) + "-" + ((d.getMonth()+1)>9 ?(d.getMonth()+1): "0"+(d.getMonth()+1) )+ "-" + d.getFullYear() ;
    index = index + 1;
    return (
      <View style={{ backgroundColor: "#fff",  padding: 5, margin: 2 }}>
        <View style={{  flexWrap: "wrap" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.boxText}>{index}.</Text>
            <Text style={[styles.boxText, { textAlign: "left",flex:1 }]}>{item.event}</Text>
          </View>
         
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap"}}>

          <Text style={{ color: "grey", fontWeight: "bold",padding:5,marginLeft:"5%"}}>User :{item.user_name}</Text>
          <Text style={{ color: "green", fontWeight: "bold",padding:5}}>{datestring}</Text>
          <Text style={{ color: "green", fontWeight: "bold",padding:5,marginLeft:"2%"}}>Time :{tConvert(item.event_time)}</Text>
        </View>
    
    

      </View>)
  }
  return (
      
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4',marginTop:StatusBar.currentHeight }}>
       
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "orange" translucent = {true}/>
        <View style={{ backgroundColor: '#f1f2f4' ,alignItems:"flex-start",margin:15}}>
      
<Header name ="Add Shop" screenName="Event Logs"/>
                </View>
       

                <View><TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
   </View>

                <Text style={{textAlign:"left",margin:10}}>Date : {getDate()}</Text>
  <View style={{flexDirection:"row",margin:5,alignContent:"center",justifyContent:"center"}}>
    <View style={{flex:2}}><Text style={[styles.heading,{textAlign:"center"}]}>Events</Text></View>
  </View>

                <FlatList
             numColumns={1}
             style={{ flex: 1 }}
             data={filteredDataSource}
             contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item ,index}) => <Item item={item} index={index}/>}

                />
   
   

<View style={{ flexDirection: "row" ,margin:2}}>
<TouchableOpacity onPress={()=>setEvent(3)} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "orange", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" ,fontWeight:"bold"}}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>changeDataDebit()} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "green", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" ,fontWeight:"bold"}}>Modified</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>changeDataCredit()} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "red", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" ,fontWeight:"bold"}}>Removed</Text>
          </TouchableOpacity>

         
        </View>

 
</SafeAreaView>

        
       
      
   
  );
}

const styles = StyleSheet.create({
 
  heading:{
    fontSize:19,
    fontWeight:"bold",padding:10
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
    fontSize:12,
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
 

   
   textInputStyle: {
    height: 50,width:"95%",
    borderWidth: 1,
    paddingLeft: 20,
    margin: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  }
 
});

export default EventScreen