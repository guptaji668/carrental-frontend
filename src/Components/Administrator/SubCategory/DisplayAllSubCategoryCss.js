import { makeStyles } from "@material-ui/core";
export  const useStyles=makeStyles({


   
      box:{
        width:'90%',
        display:'flex',
        justifyContent:'center',
        padding:10,
        borderRadius:10,
        marginTop:'2%',
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
      justifyContent:'center',
      alignItem:'center'
      },


    dialogContainer:{
        display:'flex',
     paddingLeft:'10%',
      
        width:'100vw',
        height:'100vh'
      
      
      },
      dialogbox:{
        width:'65%',
        height:500,
        padding:5,
        borderRadius:10,
       
        background:'#fff'
      
      },

})