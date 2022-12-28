
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar, Text, Switch, FlatList, ActivityIndicator, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import Header from '../../common/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBankOrCashBook, getDetails, getBankList } from './../../request'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import { rounder } from './../../common/helper'

const BankBook = ({ route, navigation }) => {

  const [bankDatas, setBankData] = useState("");
  const [todayData, setTodayData] = useState("");
  const [yesterdayData, setYesterdayData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [decimal, setDecimal] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
  ]);
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  };
  const showDetails = () => {

    navigation.navigate("BankBookDetail", { data: bankDatas.details, date: bankDatas.date, totcredit: bankDatas.total_credit, totdebit: bankDatas.total_debit, name: bankDatas.name });
  }
  const getList = async (type) => {

    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");
    const network = await NetInfo.fetch();
    if (network.isConnected) {

      const list = await getBankList(clienttoken, token, "Bank Book", deviceId)
      if (list.status === 200) {


        const cashlist = list.response.bank_books.map(item => ({ "value": item.code, "label": item.name }));

        setItems(cashlist)

      }


      else if (list.status === 303) {
        alert("license expired")

        signOut()
      }
      else {
        showToast("no data available")
      }

    }
    else {

      showToast("please check your network connection")
    }


  }
  const toggleSwitch = (toggle) => {

    setToggled(toggle)

    setIsEnabled(previousState => !previousState);

  }
  const getData = async () => {

    if (value) {
      let deviceId = await DeviceInfo.getUniqueId()
      const token = await AsyncStorage.getItem("token");
      const decimal = await AsyncStorage.getItem("decimals");
      setDecimal(decimal)
      const clienttoken = await AsyncStorage.getItem("clienttoken");
      const network = await NetInfo.fetch();
      if (network.isConnected) {
        setLoading(true)

        const listDetails = await getDetails(clienttoken, token, "Bank Book", deviceId, value, toggled)

        if (listDetails) {
          setLoading(false)
          setTodayData(listDetails.data.today);
          setYesterdayData(listDetails.data.yesterday)
          setBankData(listDetails.data)
          setBankData(listDetails.data)
        }
        else {
          setLoading(false)
          setIsEnabled(previousState => !previousState);
          showToast("please try again")
        }
      }
      else {

        showToast("please check your network connection")
      }
    }
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsEnabled(false)
      setToggled(false)
      setValue("")
      getData()
      getList()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  useEffect(() => {
    getData()
  }, [toggled, value])
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

      </View>
    );
  }
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', justifyContent: "center", alignContent: "center", marginTop: StatusBar.currentHeight }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
      <View style={{ flex: 1, backgroundColor: '#f1f2f4', margin: 20 }}>


        <Header name="Add Shop" screenName="Bank Book" />
        <View style={{ flex: 1, backgroundColor: '#f1f2f4', margin: 20 }}>
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>

            <Text style={{ color: "#000" }}>Show Grouped Data</Text>
            <Switch
              trackColor={{ false: "#767577", true: "BLUE" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: 'center', marginBottom: "2%" }}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              containerStyle={{
                marginLeft: '1%', marginRight: 10, width: 300
              }}

              style={{marginTop: (Platform.OS === 'ios' && open) ? 175:0}}
              zIndex={1000}
              defaultIndex={1}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>

          {value && <View style={{ }}>

            <TouchableOpacity style={styles.boxView} onPress={() => navigation.navigate("BankBookDetail", { data: todayData.details, date: todayData.date, totcredit: todayData.total_credit, totdebit: todayData.total_debit, name: todayData.name, code: value })}>

              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.boxTextTag, { color: "blue" }]}>Date</Text>
                <Text style={[styles.boxText, { color: "blue" }]}>{todayData.date}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={styles.boxTextTag}>Opening Balance</Text>
                <Text style={[styles.boxText, { fontWeight: "bold", color: "#000" }]}>{rounder(todayData.opening_balance, decimal)}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={[styles.boxTextTag, { color: "green" }]}>Total Debit</Text>
                <Text style={[styles.boxText, { color: "green" }]}>{rounder(todayData.total_debit, decimal)}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>
                <Text style={[styles.boxTextTag, { color: "red" }]}>Total credit</Text>
                <Text style={[styles.boxText, { color: "red" }]}>{rounder(todayData.total_credit, decimal)}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={styles.boxTextTag}>Closing Balance</Text>
                <Text style={[styles.boxText, { fontWeight: "bold", color: "#000" }]}>{rounder(todayData.closing_balance, decimal)}</Text>
              </View>




            </TouchableOpacity>
            <TouchableOpacity style={styles.boxView} onPress={() => navigation.navigate("BankBookDetail", { data: yesterdayData.details, date: yesterdayData.date, totcredit: yesterdayData.total_credit, totdebit: yesterdayData.total_debit, name: yesterdayData.name, code: value })} >

              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.boxTextTag, { color: "blue" }]}>Date</Text>
                <Text style={[styles.boxText, { color: "blue" }]}>{yesterdayData.date}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.boxTextTag}>Opening Balance</Text>
                <Text style={[styles.boxText, { fontWeight: "bold", color: "#000" }]}>{rounder(yesterdayData.opening_balance, decimal)}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.boxTextTag, { color: "green" }]}>Total Debit</Text>
                <Text style={[styles.boxText, { color: "green" }]}>{rounder(yesterdayData.total_debit, decimal)}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.boxTextTag, { color: "red" }]}>Total credit</Text>
                <Text style={[styles.boxText, { color: "red" }]}>{rounder(yesterdayData.total_credit, decimal)}</Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={styles.boxTextTag}>Closing Balance</Text>
                <Text style={[styles.boxText, { fontWeight: "bold", color: "#000" }]}>{rounder(yesterdayData.closing_balance, decimal)}</Text>
              </View>



            </TouchableOpacity>
          </View>}
        </View>
</View>
    </SafeAreaView>

  );
};

export default BankBook

const styles = StyleSheet.create({


  button: {
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20

  },

  lottie: {
    width: 100,
    height: 100,
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
    color: "#008000",
    padding: 5,
    textAlign: "left",
    fontWeight: 'bold',



  },
  boxTextTag: {
    padding: 5, flex: 1,
    textAlign: "left",
    fontWeight: 'bold', color: "#000"



  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxTextBold: {

    padding: 5,
    fontSize: 25,
    color: "#000000",
    textAlign: "center",
    fontWeight: 'bold'



  },

  boxView: {
    padding: 20,
    borderRadius: 10,

    backgroundColor: '#ffffff',


    marginTop: 20,
    justifyContent: 'flex-start',
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center'
  },




});
