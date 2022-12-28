import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../components/context';
import { Platform, StyleSheet, SafeAreaView, StatusBar,ActivityIndicator, Text, View, FlatList, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import { stockReport,getRefreshApi,getPostedCheque, getAccountsList,getBankList, getModules, getTenderCash ,getPurchaseReport,getDetailedSalesReport,getEventLog,getSalesReturnDetails} from '../../request';

const HomeScreen = ({ navigation, route }) => {
  const deviceType = Platform.OS === 'ios' ? 2 : 3
  const [shopName, setShopName] = useState("");
  const [userName, setUserName] = useState("");
  const [listData, setListData] = useState("");
  const [loading, setLoading] = useState(false);
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  };
  const { signOut } = React.useContext(AuthContext);
  const getList = async (type) => {

    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");
    const network = await NetInfo.fetch();
    if (network.isConnected) {

      const list = await getBankList(clienttoken, token, type, deviceId)
      console.log("lisstt", list)

      if (list.status === 200) {
        if (type === "Bank Book") {
          const banklist = list.response.bank_books.map(item => ({ "value": item.code, "label": item.name }));

          navigation.navigate('List', { data: banklist, type: type })
        }
        else {
          const cashlist = list.response.cash_books.map(item => ({ "value": item.code, "label": item.name }));

          navigation.navigate('List', { data: cashlist, type: type })

        }

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
  const getStockReport = async () => {
    console.log("ghhh")
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const stockData = await stockReport(clienttoken, token, deviceId)

      if (stockData.status === 200) {

        navigation.navigate('StockReport', { data: stockData.response })
      }
      else if (stockData.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }

  }
  const getTenderCashDetails = async () => {
    navigation.navigate('Tender Cashlist');

  }
  getSalesReturnDetails

  const getSalesReturnData = async () => {
    console.log("kooi")
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const salesReturnData = await getSalesReturnDetails(clienttoken, token, deviceId)

      if (salesReturnData.status === 200) {

        navigation.navigate('SalesReturn', { data: salesReturnData.response })
      }
      else if (salesReturnData.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }
  }
  const getSalesReportDetails = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const detailedSalesReport = await getDetailedSalesReport(clienttoken, token, deviceId)

      if (detailedSalesReport.status === 200) {

        navigation.navigate('Detailed Sales', { data: detailedSalesReport.response })
      }
      else if (detailedSalesReport.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }
  }
  const getPurchaseReportDetails = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const purchaseReport = await getPurchaseReport(clienttoken, token, deviceId)
console.log("purchaseReport",purchaseReport)
      if (purchaseReport.status === 200) {

        navigation.navigate('Purchase Report', { data: purchaseReport.response })
      }
      else if (purchaseReport.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }
  }
  const getEventLogDetails = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const eventLog = await getEventLog(clienttoken, token, deviceId,"3")
console.log("eventLog",eventLog)
      if (eventLog.status === 200) {

        navigation.navigate('Event Logs', { data: eventLog.response })
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
  const getAccountsData = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const accountData = await getAccountsList(clienttoken, token, deviceId,"1")
console.log("accountData",accountData)
      if (accountData.status === 200) {

        navigation.navigate('AccountsList', { data: accountData.response })
      }
      else if (accountData.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }
  }
  const sortByDate =(data)=>{
    let sortedCars1 = data && data.sort((a, b) => new Date(...b.chequedate.split('-').reverse()) - new Date(...a.chequedate.split('-').reverse()));
    return(sortedCars1)
  }
  const getPostedData = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const accountData = await getPostedCheque(clienttoken, token, deviceId,"2")
console.log("accountData",accountData)
      if (accountData.status === 200) {
const postedData =  sortByDate(accountData.response)
        navigation.navigate('PostedCheques', { data: postedData })
      }
      else if (accountData.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }
  }
  const getRefreshData = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const accountData = await getRefreshApi(clienttoken, token, deviceId,"1")
console.log("accountDataaaaa",accountData)
      if (accountData.status === 200) {

        navigation.navigate('RefreshTags', { data: accountData.response })
      }
      else if (accountData.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }
  }
  const getShop = async () => {

    const shopName = await AsyncStorage.getItem("shopName");
    const userName = await AsyncStorage.getItem("userName");
    setShopName(shopName)
    setUserName(userName)

    let deviceId = await DeviceInfo.getUniqueId();
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();
    if (network.isConnected) {
setLoading(true)
      const modulesData = await getModules(clienttoken, token, deviceId)

      if (modulesData.status === 200) {
        setListData(modulesData.response)
        setLoading(false)
      }
      else if (modulesData.status === 303) {
        alert("license expired")
        setLoading(false)

      }
      else {
        setLoading(false)
        showToast("no data available")
      }
    }
    else {
      setLoading(false)
      showToast("please check your network connection")
    }
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShop()
    });
    return unsubscribe;
  }, [route]);
  const showConfirmDialog = async () => {

    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {

            signOut("");
          },
        },

        {
          text: "No",
        },
      ]
    );
  };
  const renderNavigation = (name) => {
    switch (name) {
      case "Sales Report":
        navigation.navigate('Sales Report');
        break;

      case "Stock Summary":
        getStockReport();
        break;

      case "Cash Book":
        navigation.navigate("Cashes")
        break;

      case "Bank Book":

        navigation.navigate("BankBook")
        break;
      case "Tender Cash":
        getTenderCashDetails();
        break;
      case "Bill Wise Sales Report":
        console.log("kikik")
        getSalesReportDetails();
        break;
      case "Event Logs":
        getEventLogDetails();
        break;
     
      case "Purchase Report":
        getPurchaseReportDetails();
        break;
        case "Sales Return Report":
          getSalesReturnData();
          break;
          case "Accounts List":
          getAccountsData();
          break;
          case "Refresh Tags":
          getRefreshData();
          break;
          case "Post Dated Cheques":
          getPostedData();
          break;
      default:
        
    }

  }
  const renderImge = (name) => {
    switch (name) {
      case "Sales Report":
        return (<Image source={require('../../images/salesreport.png')} style={styles.boxImage}></Image>);
        break;

      case "Stock Summary":
        return (<Image source={require('../../images/stockreport.png')} style={styles.boxImage}></Image>);
        break;

      case "Cash Book":
        return (<Image source={require('../../images/cashbooks.png')} style={styles.boxImage}></Image>);
        break;

      case "Bank Book":
        return (<Image source={require('../../images/Bankbook.png')} style={styles.boxImage}></Image>);
        break;
      case "Tender Cash":
        return (<Image source={require('../../images/tendercash.png')} style={styles.boxImage}></Image>);
        break;
      case "Bill Wise Sales Report":
        return (<Image source={require('../../images/detailsalesreport.png')} style={styles.boxImage}></Image>);
        break;
      case "Event Logs":
        return (<Image source={require('../../images/eventlogo.png')} style={styles.boxImage}></Image>);
        break;
      case "Sales Return Report":
        return (<Image source={require('../../images/salesreturn.png')} style={styles.boxImage}></Image>);
        break;
      case "Purchase Report":
        return (<Image source={require('../../images/purchasereport.png')} style={styles.boxImage}></Image>);
        break;
        case "Accounts List":
        return (<Image source={require('../../images/accounts.png')} style={styles.boxImage}></Image>);
        break;
        case "Refresh Tags":
        return (<Image source={require('../../images/refresh.png')} style={styles.boxImage}></Image>);
        break;
        case "Post Dated Cheques":
        return (<Image source={require('../../images/cheque.png')} style={styles.boxImage}></Image>);
        break;
      default:
        return (<Image source={require('../../images/switchShop.png')} style={styles.boxImage}></Image>);
    }

  }
  const renderItem = ({ item }) =>
  {
    if(item.module_option !== 0 )
    {
      return(
        <TouchableOpacity disabled={item.module_option===1} style={{ flex: 1 }} onPress={()=>renderNavigation(item.name)}>
          <View style={styles.boxView}>
            <View style={styles.boxInnerView}>
    
              {renderImge(item.name)}
              {/* <Image source={require('../../images/stockreport.png')} style={styles.boxImage}></Image> */}
            </View>
            <Text style={styles.boxText}>{item.name}</Text></View>
        </TouchableOpacity>)
    }
    else{
      return(null)
    }
   
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f47822' }}>
      <View style={{ flex: 1, backgroundColor: '#f8f8ff' }}>

        <View style={{ paddingRight: 30, paddingLeft: 15, backgroundColor: '#f47822', flexDirection: "row", paddingTop: deviceType === 2 ? "1%" : "7%" }} >
          <TouchableOpacity onPress={() => navigation.openDrawer()}><Image source={require('../../images/hamburger.png')} style={{ width: 60, height: 60, resizeMode: "contain" }}></Image></TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={showConfirmDialog}><Image source={require('../../images/power-off.png')} style={styles.logout}></Image></TouchableOpacity>
        </View>
        <View style={{ flex: .2, backgroundColor: '#f47822', marginTop: -0, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={styles.titleText}>Hi {userName}!</Text>
          <Text style={{ fontStyle: "normal", fontSize: 15, color: "#fff", textAlign: "center", padding: 5 }}>{shopName}</Text>
        </View>
        
        <View style={{ flex: 1 }}>
          {listData && <FlatList
            data={listData}
            numColumns={2}

            renderItem={renderItem}
            keyExtractor={item => item.code}
          />}
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
  box: {
    width: 300,
    height: 300


  },
  boxImage: {
    width: 55,
    height: 60, resizeMode: "contain"
  },
  logout: {
    marginTop: '80%',
    width: 25,
    height: 25
  },

  boxText: {
    color: "#000",
    padding: 5,
    textAlign: "center",
    fontWeight: 'bold',



  },

  boxView: {
    height: 150,
    borderRadius: 10,

    backgroundColor: '#ffffff',
    margin: 20,
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
    color: '#000000',
    fontSize: 15,
    textAlign: 'center'
  },




});



export default HomeScreen;