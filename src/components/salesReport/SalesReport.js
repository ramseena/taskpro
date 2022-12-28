
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../components/context';
import { View, StatusBar,ActivityIndicator, Text, Platform, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { salesReport } from '../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodaySales from './TodaySales';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../common/Header';
import {rounder} from './../../common/helper'
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

const SalesScreen = ({ navigation ,route}) => {
    const [salesData, setSalesData] = useState("");
    const [salesDataYear, setSalesDataYear] = useState("");
    const [salesDataToday, setSalesDataToday] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(  [
      {label: 'Today Sales Summary', value: 'Today Sales Summary'},
      {label: 'Day Wise Sales Summary', value: 'Day Wise Sales Summary'},
      {label: 'Monthly Sales Summary', value: 'Monthly Sales Summary'},
  ])
    let deviceId = DeviceInfo.getUniqueId()
    const { signOut } = React.useContext(AuthContext);
    const [decimal, setDecimal] = useState("");
    const getDecimal=async()=>
    {
      const decimals =  await AsyncStorage.getItem("decimals");
     console.log("decc",decimals)
      setDecimal(decimals)
    }
    useEffect(()=>{
      getDecimal();
         
        },[])
    const [loading, setLoading] = useState(false);
    const showToast = (msg) => {
        Toast.show(msg, Toast.SHORT, [
            'UIAlertController',
        ]);
    }
    const getSalesReportForMonth = async (date) => {
       
        const token = await AsyncStorage.getItem("token");
        const clienttoken = await AsyncStorage.getItem("clienttoken");

        const network = await NetInfo.fetch();
        if (network.isConnected) {
            setLoading(true)
            const salesData = await salesReport(clienttoken, token, date, deviceId)

            if (salesData.status === 200) {
                setSalesData(salesData.response)
                setSalesDataToday("")
                setLoading(false)
                
            }
            else if (salesData.status === 303) {
                alert("license expired")
                setLoading(false)
                signOut()
            }
            else {
                setLoading(false)
                showToast("no data available")
            }
        }
        else {
            
            showToast("please check your network connection")
        }
    }
    const getSalesReportForYear = async (date) => {
        
        const token = await AsyncStorage.getItem("token");
        const clienttoken = await AsyncStorage.getItem("clienttoken");
        const network = await NetInfo.fetch();
        if (network.isConnected) {
            setLoading(true)
            const salesData = await salesReport(clienttoken, token, date, deviceId)
            if (salesData.status === 200) {
                setSalesData(salesData.response)
                setSalesDataToday("")
                setLoading(false)

                
            }
            else if (salesData.status === 303) {
                setLoading(false)
                signOut()
            }
            else {
                alert("license expired")
                setLoading(false)
                showToast("no data available")
            }
        }
        else {
            
            showToast("please check your network connection")
        }

    }
    const getSalesReportForToday = async (date) => {
      
        const token = await AsyncStorage.getItem("token");
        const clienttoken = await AsyncStorage.getItem("clienttoken");
        const network = await NetInfo.fetch();
        if (network.isConnected) {
            setLoading(true)
            const salesData = await salesReport(clienttoken, token, date, deviceId)
            console.log("saleee",salesData)
            if (salesData.status === 200) {
                setSalesDataToday(salesData.response)
                setSalesData("")
                setLoading(false)
                
            }
            else if (salesData.status === 303) {
                setLoading(false)
                alert("license expired")
                signOut()
            }
            else {
                setLoading(false)
                showToast("no data available")
            }
        }
        else {
            
            showToast("please check your network connection")
        }
    }
 
    
  useFocusEffect(
    React.useCallback(() => {
        console.log("FOCUSSED")
        if(value === "Today Sales Summary")
        {
            getSalesReportForToday("today")
          
        }
        if(value === "Day Wise Sales Summary")
        {
            getSalesReportForMonth("month")
          
        }
        if(value === "Monthly Sales Summary")
        {
            getSalesReportForYear("year")
          
        }
      
    }, [value])
  );
    const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
    
          </View>
        );
      }
      const Item = ({ item,index }) => {
       
        var d = new Date(item.date) 

        var datestring = (d.getDate()>9?d.getDate():"0"+d.getDate() ) + "-" + ((d.getMonth()+1)>9 ?(d.getMonth()+1): "0"+(d.getMonth()+1) )+ "-" + d.getFullYear() ;
        return (
  
          
        
  <View style={{}}>
         
  
          <View style={{ flex:1 ,margin:5,flexDirection:"row",backgroundColor:index%2==0?"#e6e6fa":"#f0fff0"}}>
          <Text style={{flex:.9,fontSize:15,fontWeight:"bold",textAlign:"left",padding:3,color:"#000"}}> {value === "Day Wise Sales Summary"?datestring:item.date} </Text>
          
          <Text style={{flex:.8,fontSize:14,fontWeight:"bold",textAlign:"left",padding:5,color:"grey",fontStyle:"italic"}}>Total Bills- {item.total_bills} </Text>
        
          
          </View>
          <View style={{marginLeft:"2%"}}>
          <Text style={{flex:1,fontSize:12,fontWeight:"bold",textAlign:"left",padding:5,color:"#006400"}}>Total Sales - {rounder(item.nettotal,decimal)}  </Text>
          <Text style={{flex:.8,fontSize:12,fontWeight:"bold",textAlign:"left",padding:5,color:"#b22222"}}>Total Return - {rounder(item.r_nettotal,decimal)}  </Text>
          

          <Text style={{flex:1.5,fontSize:14,fontWeight:"bold",textAlign:"left",padding:5,color:"#008080",textAlign:"left"}}>Sales After Return - {rounder(item.total_diff,decimal)} </Text>
          </View>

          </View>
        
  
  
        );
      }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start", margin: 20 }}>

                    <Header name="Add Shop" screenName="Sales Report" />


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
           {/* {salesData &&  <View style={{flexDirection:"row",margin:5}}>
    <View style={{flex:.9}}><Text style={[styles.heading,{textAlign:"left"}]}>{value === "Day Wise Sales Summary"?"Date":"Month"}</Text></View>

   
    <View style={{flex:1}}><Text style={[styles.heading,{textAlign:"right"}]}>Sales</Text></View>
    <View style={{flex:1}}><Text style={[styles.heading,{textAlign:"right"}]}>Return</Text></View>
  </View>} */}
                {
                salesData && <FlatList
                numColumns={1}
                data={salesData}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => <Item item={item} />}

            />} 
            {salesDataToday &&<TouchableOpacity style={{flex:1}}>
            <View style={styles.boxView}>
            <View style={styles.boxInnerView}>
     
               </View>
              
              
              
                   <View style={{flexDirection:"row"}}>
               <Text style={styles.boxTextTag}>Cash Sale </Text>
               <Text style={styles.boxText}>{rounder(salesDataToday.today_cash_sale,decimal)}</Text>
               </View>
                   <View style={{flexDirection:"row"}}>
               <Text style={styles.boxTextTag}>Credit Sale </Text>
               <Text style={styles.boxText}>{rounder(salesDataToday.today_credit_sale,decimal)}</Text>
               </View>
                   <View style={{flexDirection:"row"}}>
               <Text style={[styles.boxTextTag,{color:"#006400"}]}>Total Sale </Text>
               <Text style={[styles.boxText,{color:"#006400"}]}>{rounder(salesDataToday.today_total_sale,decimal)}</Text>
               </View>
               
               <View style={{flexDirection:"row"}}>
               <Text style={[styles.boxTextTag,{color:"#b22222",fontWeight:"bold"}]}>Return Amount</Text>
               <Text style={[styles.boxText,{color:"#b22222"}]}>{rounder(salesDataToday.today_return_amount,decimal)}</Text>
               </View>
               <View style={{flexDirection:"row"}}>
               <Text style={[styles.boxTextTag,{color:"#008080",fontSize:15}]}>Sales After Return</Text>
               <Text style={[styles.boxText,{color:"#008080",fontSize:15}]}>{rounder(salesDataToday.today_diff,decimal)}</Text>
               </View>
               <View style={{flexDirection:"row"}}>
               <Text style={styles.boxTextTag}>Sales Bills</Text>
               <Text style={styles.boxText}>{salesDataToday.today_total_bills}</Text>
               </View>
               <View style={{flexDirection:"row"}}>
               <Text style={styles.boxTextTag}>Return Bills</Text>
               <Text style={styles.boxText}>{salesDataToday.today_return_bills}</Text>
               </View>
              
               <View style={{backgroundColor:"#000",height:.1}}/>
              
               </View>
     
            </TouchableOpacity>}
                <View>
                    <Text style={styles.footerText}>Powerd by</Text>
                    <Text style={styles.footerText}>DQ Technologies</Text>


                </View>
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
        height: 200,
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
    boxTextTag: {
        color:"#000",
        padding: 5,flex:1,
        textAlign: "left",
        fontWeight: 'bold'
    
    
    
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


export default SalesScreen