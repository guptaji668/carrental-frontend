/* yhe axios bnaya h jo backend se data lene me help karta yh
2 type ka vanta h get or post metihos 
axios /fetch  yhe  dono tool backend se cumminacate karne me help karate h */



import axios from "axios";
const ServerURL="http://localhost:5000"
const getData=async(url)=>{
try{
  var response=await fetch(`${ServerURL}/${url}`)
  var result=await response.json()
  return(result)
}
catch(e){
  return(null)
}
}

// const isValidAuth=async()=>{
//   try{
//     // alert(localStorage.getItem('token'))
//     var response=await fetch(`${ServerURL}/admin/isUserAuth`,{
//       headers:{'authorization':localStorage.getItem('token')}
//     })
//     var result=await response.json()
//     return(result)

//   }catch(e){
//       return(null)
//   }
// ist method h yhee
// }

const getToken=async()=>{
  var response=await fetch(`${ServerURL}/admin/getToken`)
  var result=await response.json()
  console.log("100000",result) 
  return(result.token)
}

const isValidAuth=async()=>{
  try{
    var token=await getToken()
    console.log("GEt Token" ,token)
    var response=await fetch(`${ServerURL}/admin/isUserAuth`,{
      headers:{'authorization': token}
    })

    var result=await response.json()
    return(result)

  }catch(e){
      return(null)
  }

}


const postData=async(url,body)=>{
  try{
    var response=await axios.post(`${ServerURL}/${url}`,body)
    var result=await response.data
    /*
    respone.data me data fix keyword ku ki data me hi apne result dia tha node me
*/
    return(result)

  }
catch(e){

 
  return(false)
}
}
export {ServerURL,postData,getData,isValidAuth}