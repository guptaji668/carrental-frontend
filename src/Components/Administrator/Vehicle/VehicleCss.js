import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";
export const useStyles=makeStyles({
mainContainer:{
  display:'flex',

  paddingLeft:'10%',
  width:'100vw',
  height:'100vh'


},
box:{
  width:'60%',
  height:600,
  padding:2,
  borderRadius:'20',
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
