
import React, { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar,FlatList,Text,ActivityIndicator ,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image} from 'react-native';
import { getTenderCashUser, getTenderCash} from '../../request';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../common/Header';
import {rounder,getTotal} from './../../common/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; 
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
const TenderCashStatic =({navigation,route}) =>
{
  const [decimal, setDecimal] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(  [
    {label: 'Tender Cash Summary', value: 'Tender Cash Summary'},
    {label: 'Tender Cash By User', value: 'Tender Cash By User'},
    {label: 'Tender Cash By Counter', value: 'Tender Cash By Counter'},
])
 
    const [data, setData] = useState("");
    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(false);

    const showToast = (msg) => {
      Toast.show(msg, Toast.SHORT, [
          'UIAlertController',
      ]);
  }
  const getDecimal=async()=>
  {
    const decimals = await AsyncStorage.getItem("decimals");
    setDecimal(decimals)
  }
  React.useEffect(() => {
    getDecimal();
      });
  
   
    useFocusEffect(
      React.useCallback(() => {
          console.log("FOCUSSED")
          if(value === "Tender Cash Summary")
          {
            tenderCash()
            
          }
          if(value === "Tender Cash By User")
          {
            tenderCashUser()
            
          }
          if(value === "Tender Cash By Counter")
          {
            tenderCashCounter()
            
          }
        
      }, [value])
    );
  const tenderCashUser = async () => {
     
    let deviceId = await DeviceInfo.getUniqueId()
      const token = await AsyncStorage.getItem("token");
      const clienttoken = await AsyncStorage.getItem("clienttoken");
   
      const network = await NetInfo.fetch();
  
      if (network.isConnected) {
  
        const tenderCash = await getTenderCashUser(clienttoken, token, deviceId,1)
  console.log(tenderCash)
        if (tenderCash.status === 200) {
  
          setUserData(tenderCash.response)
          setData("")
        }
        else if (tenderCash.status === 303) { signOut() }
        else {
          showToast("no data found")
        }
  
      }
      else {
  
        showToast("please check your network connection")
      }
  }
  const tenderCashCounter = async () => {
      
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");
 
    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const tenderCash = await getTenderCashUser(clienttoken, token, deviceId,2)
console.log("counterr")
      if (tenderCash.status === 200) {

        setUserData(tenderCash.response)
        setData("")
      }
      else if (tenderCash.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }

  }
  const tenderCash = async () => {
    
    
 
      let deviceId = await DeviceInfo.getUniqueId()
      const token = await AsyncStorage.getItem("token");
      const clienttoken = await AsyncStorage.getItem("clienttoken");
   
      const network = await NetInfo.fetch();
  
      if (network.isConnected) {
  
        const tenderCash = await getTenderCash(clienttoken, token, deviceId)
  console.log("tendercash",tenderCash)
        if (tenderCash.status === 200) {
  
          setData(tenderCash.response);
        }
        else if (tenderCash.status === 303) { signOut() }
        else {
          showToast("no data found")
        }
  
      }
      else {
  
        showToast("please check your network connection")
      }
    }
    const User = ({ item }) => {
     
      return (

        
      

       

        <View style={{ flex:1 ,margin:5}}>
          <View>
            <View style={{borderBottomWidth:2}}>
        <Text style={{flex:1,fontSize:18,fontWeight:"bold",textAlign:"left",padding:5,color:"#000"}}>User : {item.item}  </Text>
        </View>
        {item.details.map((item)=>(<View style={{flex:1,flexDirection:"row",padding:5}}><Text style={{flex:1,fontSize:18,fontWeight:"bold",color:"green",textAlign:"left"}}> {item.type} -   </Text>
        <Text style={{flex:1,fontSize:18,fontWeight:"bold",color:"green",textAlign:"right",padding:5}}> {rounder(item.amount,decimal)}  </Text></View>))}
      <View style={{flexDirection:"row",padding:5}}>
      <Text style={{flex:1,fontSize:18,fontWeight:"bold",textAlign:"left",padding:5,color:"#000"}}>Total : </Text>
      <Text style={{flex:1,fontSize:18,fontWeight:"bold",textAlign:"right",padding:5,color:"red"}}>{rounder(getTotal(item.details,"amount"),decimal)} </Text>
      </View>
      </View>
        </View>
        


      );
    }
    
    const Item = ({ item }) => {
      console.log("item",item)
      return (

        
      

       

        <View style={{ flex:1,flexDirection: "row" ,margin:5}}>
        <Text style={{flex:1,fontSize:18,fontWeight:"bold",textAlign:"left",padding:5,color:"#000"}}> {item.name}  </Text>
        <Text style={{flex:1,fontSize:18,fontWeight:"bold",textAlign:"right",padding:5,color:"green"}}> {rounder(item.amount,decimal)}  </Text>
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

      <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>
          <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start", margin: 20 }}>

                  <Header name="Add Shop" screenName="Tender Cash Report" />


              </View>

              <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        containerStyle={{
                             margin: "5%", width: "90%",marginRight:"10%"
                        }}
                        zIndex={1000}
                        defaultIndex={1}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                  {data ? ( <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
<Text style={{flex:1,textAlign:"center",fontSize:17,fontWeight:"bold",color:"#000"}}>Tender Code</Text>
<Text style={{flex:1,textAlign:"center",fontSize:17,fontWeight:"bold",color:"#000"}}>Value</Text>
                    </View>):null}
              {
                data ? <FlatList
                numColumns={1}
                data={data}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => <Item item={item} />}

            />:
            <FlatList
                numColumns={1}
                data={userData}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => <User item={item} />}

            />
              }
         
            
          </View>
      </SafeAreaView>



  );
};


const styles = StyleSheet.create({


  button: {
      backgroundColor: "#000000",
      alignItems: "center",
      padding: 10,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20

  },

  boxImage: {
      width: 50,
      height: 60,
      resizeMode: 'stretch'
  },
  boxImageHead: {
      width: 40,
      height: 40,
      resizeMode: 'stretch'
  },


  boxText: {

      padding: 5,
      textAlign: "center",
      fontWeight: 'bold',color:"#000"



  },
  lottie: {
      width: 100,
      height: 100,
  },

  boxView: {
      height: 150,
      borderRadius: 10,

      backgroundColor: '#ffffff',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 3
  },

  boxInnerView: {marginTop:"3%",
     alignSelf:"center",
      justifyContent: 'center'
  },


  input: {
      backgroundColor: "#ffffff",
      height: 40,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      padding: 5,
  },

  titleText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 20
  },

  footerText: {
      color: '#fff',
      fontSize: 15,
      textAlign: 'center'
  },




});



export default TenderCashStatic