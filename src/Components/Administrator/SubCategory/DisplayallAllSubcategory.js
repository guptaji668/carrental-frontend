
import MaterialTable from "@material-table/core";
import{useState,useEffect} from "react";
import {getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import { Avatar ,Button,Grid,TextField} from "@material-ui/core";
import { render } from "@testing-library/react";
import { useStyles } from "./DisplayAllSubCategoryCss"
import Swal from "sweetalert2";


//select tag ke liye import kiaz h
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// dialog ke liye
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { SevereCold } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function DisplayAllSubCategory(props){
    const classes=useStyles()
    var navigate=useNavigate()
  var [subcategorylist,setSubCategoryList]=useState([])
  var[categoryList,setCategoryList]=useState([])
  const[categoryId,setCategoryId]=useState('')
  const[subCtegoryId,setsubCategoryId]=useState('')
  const[categoryName,setCategoryName]=useState('')
  const[subCategoryName,setSubCategoryName]=useState('')
  const[icon,setIcon]=useState('')
  const[priority,setPriority]=useState('')
  var [oldIcon,setOldIcon]=useState('')
  const[open,setOpen]=useState(false)
  var [prevIcon,setPrevIcon]=useState('')
  var [buttonStatus,setButtonStatus]=useState({upload:true})


  



const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/displayallsubcategory')
    setSubCategoryList(result.data)
   

  }

  useEffect(function(){
    fetchAllSubCategory();
   
  },[])


const handleSetDataForDialog=(rowData)=>{
  setCategoryId(rowData.categoryid)
  setsubCategoryId(rowData.subcategoryid)
  setSubCategoryName(rowData.subcategoryname)
  setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
  setPriority(rowData.priority)
  setOldIcon(rowData.icon)
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
setOpen(true)
}

const handleDialogClose=()=>{
  setOpen(false)
}


const fetchAllCategory=async()=>{
  var result=await getData('category/display_all_category')
setCategoryList(result.data)

}

useEffect(function(){
  fetchAllCategory();
},[])


const fillCategoryDropDown=()=>{
  return categoryList.map((item)=>{

     return (
             <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

     )

  })

}
const handleChange=(event)=>{
  setCategoryId(event.target.value)

 }

 
const handlePicture=(event)=>{

  setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setButtonStatus({upload:false})
}

const handleDiscard=(rowData)=>{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:true})
  }


 const handleSavePicture=async()=>{

  var formdata=new FormData
  formdata.append('subcategoryid',subCtegoryId)
  formdata.append('oldicon',oldIcon)
  formdata.append('icon',icon.bytes)
  var response=await postData('subcategory/edit_picture',formdata)
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
fetchAllSubCategory()
  }



  const handleEditData=async()=>{
    // ab hme formdata ka use json jese karenge ku ki hume pic nh deni only data dena h
    var body={subcategoryname:subCategoryName,subcategoryid:subCtegoryId,priority:priority}
     
      var response=await postData('subcategory/edit_data',body)
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
    fetchAllSubCategory()
    // dubara refresh ho jaye table
    }
    


    const handleDeleteData=async()=>{


      var body={subcategoryid:subCtegoryId,oldicon:oldIcon}
       var response=await postData('subcategory/delete_data',body)
       if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'Delete  Data Successfully'
           
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
     fetchAllSubCategory()
     // dubara refresh ho jaye table
     }
     
     

  
const showHidePictureButton=()=>{

  return(
    <div>
     {buttonStatus.upload?<>
      <Button fullWidth  color="primary" variant="contained" component="label">
        Edit Picture
         <input  onChange={handlePicture}  hidden accept="image/*" multiple type="file"  />
      </Button></>:<><Button  onClick={handleSavePicture} color="primary">save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}
      </div>
      /* if else conditon ki jagy ternary oepetor upload ki value by defult humne true fi h to uploaad run hoga : (else) me nh jayega */
  )

}

const showDialog=()=>{  
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
        <div className={classes.box}>
         <Grid container spacing={2}>
            <Grid item xs={12} className={classes.headingStyle} style={{fontSize:24,fontWeight:'bolder'}}>
             Update SubCategory Interface   
            </Grid>

            <Grid item xs={12} className={classes.headingStyle}>
           
            <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={categoryId}
                       label="Select Category"
                    onChange={handleChange}
                     >  
                       {fillCategoryDropDown()}          
                 
                      </Select>
                        </FormControl>
            </Grid>

            <Grid item xs={12} className={classes.headingStyle}>
            <TextField fullWidth value={subCategoryName} onChange={(event)=>setSubCategoryName(event.target.value)} label="SubCategory Name"  />

        </Grid>

        <Grid item xs={12} className={classes.headingStyle}>
       <TextField  fullWidth  value={priority} onChange={(event)=>setPriority(event.target.value)} label="Priority" />

        </Grid>
        
        <Grid item xs={6} className={classes.center}>
        {showHidePictureButton()}
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="SubCategory Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 200, height: 70 }}
           />
        </Grid>

        <Grid item xs={6} className={classes.center} >
        <Button onClick={handleEditData} fullWidth variant="contained" color="primary">Edit Data</Button>
        </Grid>
        <Grid item xs={6}  className={classes.center}>
        <Button  onClick={handleDeleteData} fullWidth variant="contained" color="primary">Delete Data</Button>
        </Grid>



        </Grid>
        </div>

      
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDialogClose} autoFocus>
        Close
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );


  
}


 




function displaySubcategories(){
    return (
      <MaterialTable
        title="List of Subcategories"
        columns={[
          { title: 'SubCategory ID', field:'subcategoryid' },
          { title: 'Category ID', field: 'categoryid' },
          { title: 'SubCategory Name', field:'subcategoryname' },
    { title: 'ICON', field: 'icon',render:(rowData)=><Avatar  src={`${ServerURL}/images/${rowData.icon}`}  style={{width:100,height:70}} variant="rounded"/>},
          { title: 'priority', field:'priority' }
        ]}
        data={subcategorylist}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Subcategory',
            onClick: (event, rowData) => handleSetDataForDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add SubCategory',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/subcategory')//navigate laga dia h
          }
        ]}
      />
    )
      }



      return(
        <div className={classes.dialogContainer}>
       <div className={classes.dialogbox}>
        <div className={classes.headingStyle}>
              {displaySubcategories()}

            
               </div>
               {showDialog()}
               </div>

</div>
               
      )
}