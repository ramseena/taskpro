
import React, { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar,Text,ActivityIndicator ,TextInput,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image,FlatList} from 'react-native';
import { getAccountsList } from "../../request";
import Header from '../../common/Header';
import {rounder,getDate,tConvert,getTotal} from '../../common/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; 
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
const AccountsList =({navigation,route}) =>{
    const [search, setSearch] = useState('');
  const [decimal, setDecimal] = useState("");
    const [data, setData] = useState("");
    const [filteredDataSource, setFilteredDataSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [name,setName]=useState(1)
    const [heading,setHeading]=useState("Customers")
    const getDecimal = async () => {
      const decimals = await AsyncStorage.getItem("decimals");
      setDecimal(decimals)
    }

const getAccountsData = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {
setLoading(true)
      const accountData = await getAccountsList(clienttoken, token, deviceId,name)
      if (accountData.status === 200) {

        setData(accountData.response)
        setFilteredDataSource(accountData.response)
        setLoading(false)
      }
      else if (accountData.status === 303) { 
        setLoading(false)
        signOut() }
      else {
        setLoading(false)
        showToast("no data found")
      }

    }
    else {
      setLoading(false)
      showToast("please check your network connection")
    }
  }
React.useEffect(() => {
    getAccountsData()
  },[name]);

  // Return the function to unsubscribe from the event so it gets removed on unmount

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getDecimal();
        setSearch("")
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
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = data.filter(
            function (item) {
              const itemData = item.name
                ? item.name.toUpperCase()
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
  const Item = ({ item, index }) => {
    index = index + 1;
    return (
      <View style={{ backgroundColor: "#fff",  padding: 5, margin: 2 ,flexDirection:"row"}}>
        <View style={{  flexWrap: "wrap" ,flex:2,padding:2}}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.boxText}>{index}.</Text>
            <Text   style={[styles.boxText, { textAlign: "left" ,flex:1}]}>{item.name}</Text>
          </View>
          <Text style={[styles.boxText, { textAlign: "left" ,color:"grey",fontSize:12,fontStyle:"italic"}]}>({item.place})</Text>
        </View>
        <View style={{flex:.6,alignItems:"flex-end"}}>

         
          <Text style={{ color: "green", fontWeight: "bold",padding:5}}>{rounder(item.balance,decimal)}</Text>
        </View>
    
    

      </View>)
  }
  return (
      
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4',marginTop:StatusBar.currentHeight }}>
       
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "orange" translucent = {true}/>
        <View style={{ backgroundColor: '#f1f2f4' ,alignItems:"flex-start",margin:15}}>
      
<Header name ="Add Shop" screenName="Accounts List"/>
                </View>
                <View><TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
   </View>
  <View style={{flexDirection:"row",margin:5,alignContent:"center",justifyContent:"center"}}>
  <View style={{flex:2}}><Text style={[styles.heading,{textAlign:"center"}]}>{heading}</Text></View>
  
 
  </View>
  <View style={{flexDirection:"row",margin:5}}>
    <View style={{flex:2}}><Text style={styles.heading}>Particulars</Text></View>
    
    <View style={{flex:1}}><Text style={[styles.heading,{textAlign:"right"}]}>Amount</Text></View>

  </View>

                <FlatList
             numColumns={1}
             style={{ flex: 1 }}
             data={filteredDataSource}
             contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item ,index}) => <Item item={item} index={index}/>}

                />
   
   <View style={{ height: 30, borderTopColor: "#000" ,borderTopWidth:2,flexDirection:"row",padding:5,marginLeft:"2%",marginRight:"2%",alignItems:"flex-end",justifyContent:"center"}} >
     {data &&  
       <Text style={{color:"red",fontSize:14,fontWeight:"bold",marginLeft:"2%",textAlign:"right"}}> Total Amount :    {rounder(getTotal(data,"balance"),decimal)}</Text>}
      
     
     </View>

<View style={{ flexDirection: "row" ,margin:2}}>
<TouchableOpacity onPress={()=>{setName(1)
setHeading("Customers")
} }style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "orange", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" ,fontWeight:"bold"}}>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setHeading("Suppliers")
            setName(2)}} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "green", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" ,fontWeight:"bold"}}>Suppliers</Text>
          </TouchableOpacity>


         
        </View>
       
 
</SafeAreaView>

        
       
      
   
  );
}

const styles = StyleSheet.create({
 
  heading:{
    fontSize:12,
    fontWeight:"bold",padding:10,color:"#000"
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

export default AccountsList