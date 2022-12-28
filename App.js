import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from './src/components/context';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './src/common/CustomDrawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/components/loginScreen/LoginScreen';
import HomeScreen from './src/components/homeScreen/HomeScreen';
import DataScreen from './src/components/dataScreen/DataScreen';
import LicenseScreen from './src/components/licenseScreen/LicenseScreen';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getLicense, getToken ,logoutRequest} from './src/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StockScreen from './src/components/stockScreen/StockScreen';
import SalesScreen from './src/components/salesReport/SalesReport';
import TodaySales from './src/components/salesReport/TodaySales';
import MonthlySales from './src/components/salesReport/MonthlySales';
import ListScreen from './src/components/listScreen/ListScreen';
import YearlySales from './src/components/salesReport/YearlySales';
import BankBook from './src/components/bookScreen/BankBook';
import SwitchScreen from './src/components/SwitchScreen';
import SwitchUser from './src/components/SwitchUser';
import BankBookDetail from './src/components/bookScreen/BankBookDetail';
import CashBookDetail from './src/components/bookScreen/CashBookDetail';
import CashScreen from './src/components/bookScreen/CashScreen';
import TenderCash from './src/components/tenderCash/TenderCash';
import TenderCashList from './src/components/tenderCash/TenderCashStatic';
import PurchaseReport from './src/components/purchaseReport/PurchaseReport';
import DetailedSales from './src/components/detailedSales/DetailedSales';
import SalesReturn from './src/components/salesReturn/SalesReturn';
import EventScreen from './src/components/EventScreen';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen'
import AccountsList  from './src/components/accountsList/AccountsList';
import RefreshTags  from './src/components/refreshTags/RefreshTags';
import PostedCheques  from './src/components/postedCheques/PostedCheques';

const Stack = createNativeStackNavigator()

const DailyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="today" component={TodaySales} />

    </Stack.Navigator>
  )
}

const YearlyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Year" component={YearlySales} />

    </Stack.Navigator>
  )
}
const MonthlyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Monthly" component={MonthlySales} />

    </Stack.Navigator>
  )
}
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />

    </Stack.Navigator>
  )
}
const StockStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Stock" component={StockScreen} />

    </Stack.Navigator>
  )
}
const SalesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sales" component={SalesScreen} />


    </Stack.Navigator>
  )
}
const DataStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Data" component={DataScreen} />

    </Stack.Navigator>
  )
}
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />

    </Stack.Navigator>
  )
}
const loginStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()
const HomeDrawer = createDrawerNavigator()
const LOGINDrawer = createDrawerNavigator()

const LoginDrawerNavigator = () => {
  return (
    <loginStack.Navigator  initialRouteName={"login"}drawerContent={props => <CustomDrawer {...props} />}>

      <loginStack.Screen swipeEnabled={false} options={{
        headerShown: false,
      }}

        name="login" component={LoginScreen} />
      <loginStack.Screen options={{ headerShown: false, swipeEnabled: false }}
        name="license" swipeEnabled={false} component={LicenseScreen} />
      <loginStack.Screen options={{ headerShown: false }}
        name="SwitchScreen" component={SwitchScreen} />
    </loginStack.Navigator>
  )
}
const HomeDrawerNavigator = () => {
  return (
    <HomeDrawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Add Shop" component={HomeStackNavigator} />
      
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="BankBook" component={BankBook} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Cashes" component={CashScreen} />

      <HomeDrawer.Screen options={{ headerShown: false }}
        name="BankBookDetail" component={BankBookDetail} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="List" component={ListScreen} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="SwitchUser" component={SwitchUser} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="CashBookDetail" component={CashBookDetail} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="StockReport" component={StockScreen} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Daily Report" component={DailyStackNavigator} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Yearly Report" component={YearlyStackNavigator} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Monthly Report" component={MonthlyStackNavigator} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Sales Report" component={SalesStackNavigator} />
      <HomeDrawer.Screen options={{ headerShown: false }}
        name="Switch Shop" component={DataStackNavigator} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="Tender Cash" component={TenderCash} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="Tender Cashlist" component={TenderCashList} />
     
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="Detailed Sales" component={DetailedSales} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="Purchase Report" component={PurchaseReport} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="Event Logs" component={EventScreen} />
        <HomeDrawer.Screen options={{ headerShown: false }}
        name="SalesReturn" component={SalesReturn} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="AccountsList" component={AccountsList} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="RefreshTags" component={RefreshTags} />
         <HomeDrawer.Screen options={{ headerShown: false }}
        name="PostedCheques" component={PostedCheques} />
    </HomeDrawer.Navigator>
  )
}

export default function App() {
  const [license, setLicense] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState("")
  const [isloading, setIsLoading] = useState(false)
  const initialLoginState = {
    isLoading: true,
    userName: null,
    clientToken: null,
    logIN: null
  };
  LogBox.ignoreAllLogs()
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          clientToken: action.token,
          isLoading: false,
          logIN: action.logIn

        };
      case 'LOGIN':
        
        return {
          ...prevState,
          userName: action.id,
          isLoading: false,
          logIN: 1
        };
      case 'LOGOUT':
       
        return {
          ...prevState,
          userName: null,
          isLoading: false,
          logIN: null
        };
      case 'ADDLICENSE':
        return {
          ...prevState,
          clientToken: action.token,
          isLoading: false,
        };
    }
  };
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  }
  useEffect(() => {
    setTimeout(() => { SplashScreen.hide() }, 10)

  }, [])
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (userName) => {
      try {

        await AsyncStorage.setItem("isLoggedIn", "true");
      } catch (e) {
       
      }
      dispatch({ type: 'LOGIN', id: userName });
    },
    signOut: async (switchShop) => {
      if(!switchShop)
      {
      try {
        await AsyncStorage.removeItem("isLoggedIn");
        const clienttoken = await AsyncStorage.getItem("clienttoken");
   
    
      let deviceId = await DeviceInfo.getUniqueId()
      const token = await AsyncStorage.getItem("token");
      
       await logoutRequest(clienttoken, token,deviceId);

      } catch (e) {
        
      }
    }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);
  useEffect(() => {
    setTimeout(async () => {

      try {
        userToken = await AsyncStorage.getItem('token');
        const logIn = await AsyncStorage.getItem('isLoggedIn');
        dispatch({ type: 'RETRIEVE_TOKEN', logIn: logIn });
      } catch (e) {
      
        
      }





    }, 1000);
  }, []);
  getGuestToken = async () => {
    let deviceId = await DeviceInfo.getUniqueId()
   


    const isSignedIn = await AsyncStorage.getItem("token");
    if (!isSignedIn) {
      const network = await NetInfo.fetch();
      if (network.isConnected) {

        const response = await getToken(deviceId)
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("appId", JSON.stringify(response.data.app_id));


      }
      else {
        showToast("please check your network connection")
      }
    }
  }
  const getLicense = async () => {
    const license = await AsyncStorage.getItem("clienttoken");
    
    setLicense(license)
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    

    setIsLoggedIn(isLoggedIn)
    setIsLoading(true)


  }
  useEffect(() => {

    getGuestToken()
    getLicense()
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

      </View>
    );
  }


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
        {loginState.logIN !== null ? 
          <HomeDrawerNavigator />
        
          :
          <LoginDrawerNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>

  );
}