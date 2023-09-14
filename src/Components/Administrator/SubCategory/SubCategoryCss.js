import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";
export const useStyle=makeStyles({
mainContainer:{
  display:'flex',
 paddingLeft:'20%',

  width:'100vw',
  height:'100vh'


},
box:{
  width:'40%',
  height:'250',
  paddingLeft:'20%',
  borderRadius:10,
 
  background:'#fff'

},
headingStyle:{
  fontWidth:24,
  fontWeight:'bold',
  letterSpacing:1,
  paddingTop:5,
  paddingBottom:5    
},
center:{display:'flex',
justifyContent:'left',
alignItem:'center',
flexDirection:'row'
}

})
