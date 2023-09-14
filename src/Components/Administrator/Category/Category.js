import {useEffect,useState} from "react";
import {Grid,TextField,Button,Avatar}  from "@mui/material";
import {useStyles} from "./CategoryCss"
import { ServerURL,postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";

//mui ka icons h
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

export default function Category(props){
// yhe Category comoponent bnaya h 

 const classes=useStyles()
 var navigate=useNavigate()
 var  [icon,setIcon]=useState({filename:'/assets/HONDA.png',bytes:''})
 var  [categoryName,setCategoryName]=useState('')

 const handlePicture=(event)=>{
  //yhe ek fuction bnaya jo isi page par call hoga ku ki iske aange function nhh likha
 setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
/* yhe URL.createObjectURL fix keyword h jo file ka pura path ko uatta h */

 }
 const handleSubmit=async()=>{
   var formData=new FormData()
   // FormData bani banyi class ka object h 
   // yhe FormData bi fix h iska use  tbi  jab file or data lena ho tav karte h
   formData.append('categoryname',categoryName)
   /* yha categoryname => node ki body me diaa h bo name h
   categoryName=> react ka state h jisme value h 
   iska mtlb h ki  body ki category me append kar do state ki value */
   formData.append('icon',icon.bytes)
   // bytes me picture ki puri informatain h
   var response=await postData('category/categorysubmit',formData)

/* jese hi submit pr click hua yhe postData se seedhe FetchNodeservice me postdata par jayega
pr ('category/categorysubmit',formData)yhe udr url ko yhe mil jayega  jisse node ka comunncaiton hone lagega
or node par coomand pauch jayega udar query fire ho jayegi */

   if(response.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Category Submitted Successfully'
      
    })

   }
   else
   {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    
    })

   }

 }
// yhe reset ke liye function banaya
const clearValues=()=>{
  setCategoryName(' ')
  setIcon({filename:'/assets/HONDA.png',bytes:''})

}

const handleShowCategoryList=()=>{
  navigate('/dashboard/displayallcategory')
}

// yha className ka use karte h css ki class ko attach yha call karne ke liye
 return(<div className={classes.mainContainer}>
    <div className={classes.box}>
    <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
          <div className={classes.center}>
          <ListAltIcon onClick={handleShowCategoryList}/>
          <div style={{marginLeft:8,fontSize:'24'}}>
          Category Interface   
          </div>
          </div>
       

        </Grid>
        <Grid item xs={12}>
            <TextField value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" fullWidth />

        </Grid>
        <Grid item xs={6} >
        <Button fullWidth variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button>
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="Category Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 56 }}
      />
        </Grid>
        <Grid item xs={6}>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
            Submit
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button  onClick={clearValues} variant="contained" fullWidth >
                    Reset
                </Button>    

              
            </Grid>
        

    </Grid>
</div> 
 </div>)

}