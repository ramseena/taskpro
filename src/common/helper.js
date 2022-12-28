export const rounder =(number, digits)=> {
   var result = (number - Math.floor(number)) !== 0; 
   if(result)
   {
   var multiplier = Math.pow(10, digits),
       adjustedNum = number * multiplier,
       truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

   return truncatedNum / multiplier;
   }
   else{
      return( Math.round(number * 100) / 100).toFixed(digits);
   }
}
export const getDate =()=>{
   let today = new Date();

return(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear());
}
export const getTotal =(data,text)=>{


  const datatotal= data.map(item =>item[text])

return datatotal.reduce((acc,item)=>{return parseFloat(acc)+parseFloat(item)},0)
}
export const tConvert= (time)=> {
   // Check correct time format and split into components
   time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
 
   if (time.length > 1) { // If time format correct
     time = time.slice (1);  // Remove full string match value
     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
     time[3]=""
     time[0] = +time[0] % 12 || 12; // Adjust hours
   }
   return time.join (''); // return adjusted time or original string
 }