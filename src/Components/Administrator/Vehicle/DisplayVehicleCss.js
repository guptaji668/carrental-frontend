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


    dialogmainContainer:{
        display:'flex',
     paddingLeft:'5%',
      
        width:'100%',
        height:'100vh'
      
      
      },
      dialogbox:{
        width:'90%',
        height:600,
        padding:2,
        borderRadius:10,
      
        background:'#fff'
      
      },

})