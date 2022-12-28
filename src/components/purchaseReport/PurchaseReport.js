
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar, Text, ActivityIndicator, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { stockReport } from '../../request';
import Header from '../../common/Header';
import { rounder,getDate,getTotal,tConvert} from './../../common/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
const PurchaseReport = ({ navigation, route }) => {
  const [decimal, setDecimal] = useState("");
  const [data, setData] = useState(route.params.data);
  const [loading, setLoading] = useState(false);
  const getDecimal = async () => {
    const decimals = await AsyncStorage.getItem("decimals");
    setDecimal(decimals)
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDecimal();
      setData(route.params.data)
      console.log("route", route.params.data)
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
    index = index + 1;
    var d = new Date(item.pdate) 

    var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() ;
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: 5, margin: 2 }}>
         <View style={{ flexDirection: "row", flex: 2, flexWrap: "wrap" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.boxText}>{index}.</Text>
            <View>
            <Text style={[styles.boxText, { textAlign: "left" }]}>{item.supplier_name||"CASH"}</Text>
   
            <Text style={[styles.boxText, { textAlign: "left" ,color:"grey",fontSize:12,fontStyle:"italic"}]}>(User:{(item.user_name)})</Text>
            <Text style={[styles.boxText, { textAlign: "left",color:"blue" }]}>PayMode: {item.modeofpayment}</Text>
            </View>
          </View>

        </View>
        <View style={[styles.headerText,{flex:1}]}>
         <Text style={[styles.boxText, { textAlign: "left" }]}>{datestring}</Text>
        <Text style={[styles.boxText, { textAlign: "left",color:"grey" }]}>Bill No: {item.bill_no}</Text>
       
            {/* <Text style={[styles.boxText, { textAlign: "left" ,color:"grey",fontSize:15,fontStyle:"italic"}]}>({(item.billtype)})</Text> */}
            

</View>
<View style={[styles.headerText,{flex:1}]}>

          <Text style={[styles.boxText, { color: "green", fontWeight: "bold", alignSelf: "flex-end" ,fontSize:12}]}>{rounder(item.total,decimal)}</Text>
        </View>

      </View>)
  }
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>

      <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
      <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start", margin: 15 }}>
        <Header name="Add Shop" screenName="Purchase Report" />
      </View>

      <Text style={{textAlign:"left",margin:5,color:"#000"}}>Date : {getDate()}</Text>
      <Text style={{textAlign:"left",margin:5,color:"#000"}}>Total Bills :{data.length}</Text>
  <View style={{flexDirection:"row",margin:5}}>
    <View style={{flex:2}}><Text style={styles.heading}>Particulars</Text></View>
    <View style={{flex:1}}><Text style={styles.heading}>Bill Details</Text></View>
    <View style={{flex:1}}><Text style={[styles.heading,{textAlign:"right"}]}>Amount</Text></View>

  </View>
      <FlatList
        numColumns={1}
        style={{ flexGrow: 0 }}
        data={data}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => <Item item={item} index={index} />}

      />
        <View style={{ height: 30, borderTopColor: "#000" ,borderTopWidth:2,flexDirection:"row",padding:5,marginLeft:"2%",marginRight:"2%",alignItems:"flex-end",justifyContent:"center"}} >
       
       <Text style={{color:"red",fontSize:14,fontWeight:"bold",marginLeft:"2%",textAlign:"right"}}> Total Amount :    {rounder(getTotal(data,"total"),decimal)}</Text>
      
     
     </View>



    </SafeAreaView>





  );
}

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
  heading:{
    fontSize:12,
    fontWeight:"bold",padding:10,color:"#000"
    },

  boxText: {

    padding: 5,
    textAlign: "center",
    fontSize:12,fontWeight:"bold",
    color: "#000"



  },
  boxTextBold: {

    padding: 5,
    fontSize: 25,
    color: "#000000",
    textAlign: "center",
    fontWeight: 'bold',



  },
  lottie: {
    width: 100,
    height: 100,
  },

  boxView: {
    padding: 50,
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

  boxInnerView: {
    alignItems: 'center',
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

export default PurchaseReport