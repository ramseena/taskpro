import NetInfo from "@react-native-community/netinfo"; 
import { Platform, StyleSheet } from 'react-native';
const secret_key ="5135664378713265754133474858654e4d73564e54773d3d"
const ab ="6d316842584831724f4367342b7766593541527335485530476f564e6353506e4a747834467772786d626f3d";
const deviceType = Platform.OS === 'ios' ?2:3
const base_url = Platform.OS === 'ios' ?"https://report.dqtech.in/api/":"http://report.dqtech.in/api/"
export const  getToken =(deviceId)=>{
    const data = new FormData();
data.append('secret_key', secret_key);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('push_token', 3);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data',
        Accept: "application/json" },
        body: data
    };
    
     return fetch('https://taskpro.dqtech.in/api/guestToken',requestOptions)
    .then((response) => response.json())
    .then((json) => {
       
      return(json)
    })
    .catch((error) => {
     
      console.error(error);
    });
    
}
export const getLicense =(token,license,deviceId,appId,dname)=>{
    const data = new FormData();
data.append('app_id',appId);
data.append('device_type',deviceType);
data.append('device_id', deviceId);
data.append('licence_key', license);
data.append('device_name', dname);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    },
        body: data
    };
  
    return fetch('https://taskpro.dqtech.in/api/licenceRegister'
    ,requestOptions)
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([res, data]) => {
      console.log(res, data);
      return({"response":data,"status":res})
    })
    .catch(error => {
      console.error(error);
      return { name: "network error", description: "" };
    });
    
  }
    

export const loginRequest =(clientToken,token,username,password,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('username', username);
data.append('password', password);

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' ,
      'Authorization': 'Bearer ' + token
  },
      body: data
  };
 
  return fetch('https://taskpro.dqtech.in/api/userLogin',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const logoutRequest =(clientToken,token,deviceId)=>{
 
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);


  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' ,
      'Authorization': 'Bearer ' + token
  },
      body: data
  };
 
  return fetch('https://taskpro.dqtech.in/api/logOut',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    console.log("logoutsuccess")
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const stockReport =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
console.log("datta",data,token)

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'multipart/form-data'  ,
 
  'Authorization': `Bearer ${token}`
},
      body: data
  };

  return fetch('https://taskpro.dqtech.in/api/stockReport',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.stock_report,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const salesReport =(clientToken,token,date,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('type', date);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  console.log("data",data,token)
  
  return fetch('https://taskpro.dqtech.in/api/salesReport',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log("res", data);
    return({"response":data.stock_report,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getRefreshApi =(clientToken,token,deviceId,type)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);
data.append('type', type);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  console.log("req",data,token)
  
  return fetch('https://taskpro.dqtech.in/api/refreshTag',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getPostedCheque =(clientToken,token,deviceId,type)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);
data.append('type', type);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  console.log("req",data)
  
  return fetch('https://taskpro.dqtech.in/api/postedCheque',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getEventLog =(clientToken,token,deviceId,type)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);
data.append('type', type);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  console.log("req",data)
  
  return fetch('https://taskpro.dqtech.in/api/eventLog',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getTenderCash =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);
console.log("data",data);

  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('https://taskpro.dqtech.in/api/tenderCash',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getTenderCashUser =(clientToken,token,deviceId,type)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);
data.append('type', type);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('https://taskpro.dqtech.in/api/tenderCashUser',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getAccountsList =(clientToken,token,deviceId,type)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);
data.append('type', type);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  console.log("datareq",data)
  return fetch('https://taskpro.dqtech.in/api/accountList',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}

export const getPurchaseReport =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('https://taskpro.dqtech.in/api/purchaseReport',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getSalesReturnDetails =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('https://taskpro.dqtech.in/api/salesReturn',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getDetailedSalesReport =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('https://taskpro.dqtech.in/api/salesRegister',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.result,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
export const getModules =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('user_id', 12);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('https://taskpro.dqtech.in/api/getModules',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.data,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}

export const getBankOrCashBook =(clientToken,token,param,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
if (param === "Bank Book")
{
data.append('type', "bank");
}
else{
  data.append('type', "cash");
}


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
  
  return fetch('https://taskpro.dqtech.in/api/ledgerReport',requestOptions)
  .then(response => response.json())
  .then(json=> {
    
    return(json)
  })
  .catch((error) => {
    console.error(error);
  });
  
}
export const getBankList =(clientToken,token,param,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);

if (param === "Bank Book")
{
data.append('type', "bank");
}
else{
  data.append('type', "cash");
}

console.log("bnklist",data)
  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
 
  return fetch('https://taskpro.dqtech.in/api/ledgers',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const getDetails =(clientToken,token,param,deviceId,code,isEnabled)=>{
  const data = new FormData();
 
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('code', code);
data.append('day',"A");
data.append('grouped',isEnabled?"1":"0");
data.append('filter_dc',"1");


if (param === "Bank Book")
{
data.append('type', "bank");
}
else{
  data.append('type', "cash");
}

console.log("reqdata",data)
  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
 
  return fetch('https://taskpro.dqtech.in/api/ledgerReport',requestOptions)
  .then(response => response.json())
  .then(json=> {
      console.log("resp",json)
    return(json)
  })
  .catch((error) => {
    console.error(error);
  });
  
}
export const getUser =(token,deviceId)=>{
  const data = new FormData();

data.append('device_type', deviceType);
data.append('device_id', deviceId);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
 console.log("req",requestOptions)
  return fetch('https://taskpro.dqtech.in/api/switchUser',requestOptions)
  .then(response => response.json())
  .then(json=> {
      
    return(json)
  })
  .catch((error) => {
    console.error(error);
  });
  
}