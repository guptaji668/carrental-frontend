import MaterialTable from "@material-table/core";

import{useState,useEffect} from "react"
import {getData,postData,ServerURL,isValidAuth } from "../../Services/FetchNodeServices";
import { Avatar ,Button,Grid,TextField} from "@material-ui/core";
import { render } from "@testing-library/react";
import { useStyles } from "./DisplayAllCategoryCss";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

 export default function DisplayAllCategory(props){
// yhe DisplayAllCategory naam ka component banya

var classes=useStyles()
var navigate=useNavigate()
const[category,setCategory]=useState([])
const[open,setOpen]=useState(false)// by defulat humne value false rakhs h yhe keyword h

var  [icon,setIcon]=useState({filename:'/assets/HONDA.png',bytes:''})
var  [categoryName,setCategoryName]=useState('')
var [categoryID,setCategoryID]=useState('')
var [oldIcon,setOldIcon]=useState('')
var [buttonStatus,setButtonStatus]=useState({upload:true})
// ek hi state me upload or savediscard ko manage karne ke liye json bna dia state me hi
var [prevIcon,setPrevIcon]=useState('')


const fetchAllCategory=async()=>{
  // yhe ek innerfunction bnya jo isi page /par call hoga
  var result=await getData('category/display_all_category')
  setCategory(result.data)

}

  const handleSetDataForDialog=(rowData)=>{
    setCategoryName(rowData.categoryname)
    setCategoryID(rowData.categoryid)
    setOldIcon(rowData.icon)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOpen(true)

  }


const handleDiscard=(rowData)=>{
setIcon({filename:prevIcon,bytes:''})
setButtonStatus({upload:true})
}

const handleSavePicture=async()=>{

  var formdata=new FormData
  formdata.append('categoryid',categoryID)
  formdata.append('oldicon',oldIcon)
  formdata.append('icon',icon.bytes)
  var response=await postData('category/edit_picture',formdata)
  if(response.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Icon Updated Successfully'
      
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
setButtonStatus({upload:true})
 setOpen(false)
fetchAllCategory()
// dubara refresh ho jaye table
}


const handleEditData=async()=>{
// ab hme formdata ka use json jese karenge ku ki hume pic nh deni only data dena h
var body={categoryname:categoryName,categoryid:categoryID}
 
  var response=await postData('category/edit_data',body)
  if(response.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Data Updated Successfully'
      
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

 setOpen(false)
fetchAllCategory()
// dubara refresh ho jaye table
}


const handleDeleteData=async()=>{


 var body={categoryid:categoryID,oldicon:oldIcon}
  var response=await postData('category/delete_data',body)
  if(response.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Delete Successfully'
      
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

 setOpen(false)
fetchAllCategory()
// dubara refresh ho jaye table
}



const showHidePictureButton=()=>{

  return(
    <div>
     {buttonStatus.upload?<>
      <Button fullWidth variant="contained" component="label">
        Upload
         <input  onChange={handlePicture}  hidden accept="image/*" multiple type="file"  />
      </Button></>:<><Button  onClick={handleSavePicture} color="primary">save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}
      </div>
      /* if else conditon ki jagy ternary oepetor upload ki value by defult humne true fi h to uploaad run hoga : (else) me nh jayega */
  )

}

const handleShowCategoryList=()=>{
  navigate('/displayallcategory')
}



 useEffect(function(){
 fetchAllCategory()
 
 },[])






/**yhe humne useEffect ka 3rd case apply kia h  yaani only ek baar execute hoga functon jab page load hoga tab */


function displayCategories() {
  return (

    /* yhe materialtable ki table liya h */
    <MaterialTable
      title="List of categories"
      columns={[
        { title: 'Category Id', field: 'categoryid' },
        { title: 'Name', field: 'categoryname' },
        { title: 'Icon', field: 'icon',render:(rowData)=><Avatar  src={`${ServerURL}/images/${rowData.icon}`}  style={{width:100,height:70}} variant="rounded"/>},
        /* yha render fix key h  materailtable ki  jisme rowdata ka naam kuch bi rakh do yhe render har row ka data legi  Avatar pic to show karne ke liye aaya h  */

        // field me database ki filed likhte h
      ]}
      data={category}  
      // yha sara data category me aaya tha islye lagaya h      
      actions={[
        {
          icon:'edit',
          tooltip: 'Edit Category',
          onClick: (event, rowData)=>handleSetDataForDialog(rowData)
        },
        {
          icon: 'add',
          tooltip: 'Add Category',
          isFreeAction: true,
          onClick: (event) => navigate('/dashboard/category')//navigate laga dia h
        }
      ]}
    />
  )
}

const handleClose=()=>{
  setOpen(false)
}


const handlePicture=(event)=>{

  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setButtonStatus({upload:false})
}


const showDialog=()=>{
  return(

    <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
      
    <div className={classes.box}>
    <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
         Category Interface   

        </Grid>
        <Grid item xs={12}>
            <TextField  value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" fullWidth />

        </Grid>
        <Grid item xs={6} >
        {showHidePictureButton()}
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="Category Icon"
        src={icon.filename}
        variant="rounded"
        sx={{width:120, height:56 }}
           />
        </Grid>
        <Grid item xs={6}>
        <Button onClick={handleEditData} variant="contained" fullWidth>
            Edit Data
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button onClick={handleDeleteData}  variant="contained" fullWidth >
                    Delete Data
                </Button>    

              
            </Grid>
        

    </Grid>
</div> 
 




      </DialogContent>
      <DialogActions>
       
        <Button onClick={handleClose} autoFocus>
        Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)


}
    
 
     
  



return(
  <div className={classes.dialogContainer}>
  <div className={classes.dialogBox}>
   
    {displayCategories()}
    </div>
    {showDialog()}
 </div>    

)
}