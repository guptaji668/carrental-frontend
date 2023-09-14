import MaterialTable from "@material-table/core";

import{useState,useEffect} from "react"
import {getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import { Avatar ,Button,Grid,TextField} from "@material-ui/core";
import { render } from "@testing-library/react";
import { useStyles } from "./DisplayCompanyCss";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";



export default function DisplayAllCompanyList(props){

    var classes=useStyles()
    var navigate=useNavigate()

    const[companylist,setCompanyList]=useState([])
    const[categoryList,setCategoryList]=useState([])
const[subCategoryList,setSubCategoryList]=useState([])
const[categoryId,setCategoryId]=useState('')
 const[subCategoryId,setSubCategoryId]=useState('')
const[companyName,setCompanyName]=useState('')
const[companyId,setCompanyId]=useState('')

const[open,setOpen]=useState(false)//dialog kaa 

const[icon,setIcon]=useState({filename:"/assets/HONDA.png",bytes:''})
var [prevIcon,setPrevIcon]=useState('')
  var [buttonStatus,setButtonStatus]=useState({upload:true})
  var [oldIcon,setOldIcon]=useState('')



    const fetchAllCompany=async()=>{
        var result=await getData('company/displaycompanylist')
        setCompanyList(result.data)
        
      }
      useEffect(function(){
        fetchAllCompany();
      },[])
    

/*========================dialog ke liye =====================================================================*/

const fetchAllCategory=async()=>{
  var result=await getData('category/display_all_category')
  setCategoryList(result.data)

}
useEffect(function(){
  fetchAllCategory();
   },[])


   const fillCategoryDropDown=()=>{

    return categoryList.map((item)=>{

        return(
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
    })
 }

 const handleChange=(event)=>{
  setCategoryId(event.target.value)
  fetchAllSubcategoryByCategory(event.target.value)

 }

 
 const fetchAllSubcategoryByCategory=async(category_id)=>{
  var body={categoryid:category_id}
  var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
  setSubCategoryList(response.result)
}

const fillSubCategoryDropDown=()=>{
  return subCategoryList.map((item)=>{
   return(
       <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>

   )

  })

}
const handleSubCategoryChange=(event)=>{
  setSubCategoryId(event.target.value)
 
 }



   

      const handleDialogClose=()=>{
        setOpen(false)
      }

      const handlePicture=(event)=>{

        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setButtonStatus({upload:false})
      }

      const handleDiscard=(rowData)=>{
        setIcon({filename:prevIcon,bytes:''})
        setButtonStatus({upload:true})
        }

        const showHidePictureButton=()=>{

          return(
            <div>
             {buttonStatus.upload?<>
              <Button fullWidth  color="primary" variant="contained" component="label">
                Edit Picture
                 <input  onChange={handlePicture}  hidden accept="image/*" multiple type="file"  />
              </Button></>:<><Button onClick={handleSavePicture} color="primary">save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}
              </div>
              /* if else conditon ki jagy ternary oepetor upload ki value by defult humne true fi h to uploaad run hoga : (else) me nh jayega */
          )
        
        }

        
 const handleSavePicture=async()=>{

  var formdata=new FormData
  formdata.append('categoryid',categoryId)
  
  formdata.append('oldicon',oldIcon)
  formdata.append('icon',icon.bytes)
  var response=await postData('company/edit_picture',formdata)
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
fetchAllCompany()
  }


  const handleEditData=async()=>{
    // ab hme formdata ka use json jese karenge ku ki hume pic nh deni only data dena h
    var body={companyname:companyName,companyid:companyId}
     
      var response=await postData('company/edit_data',body)
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
    fetchAllCompany()
    // dubara refresh ho jaye table
    }
    

    const handleDeleteData=async()=>{
      var body={companyid:companyId,oldicon:oldIcon}
       var response=await postData('company/delete_data',body)
       if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'Delete Data Successfully'
           
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
     fetchAllCompany()
     // dubara refresh ho jaye table
     }
     



        
      
      

      const handleSetDataForDialog=(rowData)=>{

        fetchAllSubcategoryByCategory(rowData.categoryid)
        // is functon ko humne id dedi yhe humne phele se bhar ke aaye //data jis par click kre
        // islye is functon ko categoryid dedi jisse subcategory ka bhar ke aaye data ab 
        //category_id ke pass id pauchegi jese hi edit par cilk hoga

        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyName(rowData.companyname)
      setCompanyId(rowData.companyid)
        
        setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
        setOldIcon(rowData.icon)
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
        setOpen(true)
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

              <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                  <Grid xs={12} item style={{fontSize:24,fontWeight:'bolder'}}>
                    Edit Company Interface
                    
                  </Grid>
                <Grid xs={6} item >
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={categoryId}
                       label="Select category"
                    onChange={handleChange}>
                     
                       {fillCategoryDropDown()}          
                 
                      </Select>
                        </FormControl>
                    
                </Grid>

                <Grid xs={6} item >
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={subCategoryId}
                       label="Select Subcategory"
                    onChange={handleSubCategoryChange}>
                     
                       {fillSubCategoryDropDown()}          
                 
                      </Select>
                        </FormControl>
                </Grid>
                <Grid xs={12} item >
                    <TextField value={companyName} onChange={(event)=>setCompanyName(event.target.value)} fullWidth label="Company Name"></TextField>
                </Grid>
                  
                <Grid xs={6} item className={classes.center} >
                {showHidePictureButton()}
                </Grid>
                  
                <Grid xs={6} item >
                <Avatar style={{alignItems:'center'}}
                        alt="Company Icon"
                        src={icon.filename}
                          variant="rounded"
                      sx={{ width: 120, height: 56 }}
                      />

                </Grid>



                <Grid xs={6} item >
                    <Button onClick={handleEditData}  fullWidth variant="contained" color="primary">
                        Edit Data
                    </Button>
                </Grid>

                <Grid xs={6} item >
                    <Button onClick={handleDeleteData} fullWidth variant="contained" color="primary">
                        Delete Data
                    </Button>
                </Grid>

                

      
                  </Grid>
                  </div>
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

   
function displayCompany() {
    return (
 

      /* yhe materialtable ki table liya h */
      <MaterialTable
        title="List of Company"
        columns={[
          { title: 'Category Id', field: 'categoryid' },
          { title: 'SubCategory Id', field: 'subcategoryid' },
          { title: 'Company Name', field: 'companyname' },
        
          { title: 'Icon', field: 'icon',render:(rowData)=><Avatar  src={`${ServerURL}/images/${rowData.icon}`}  style={{width:100,height:70}} variant="rounded"/>},
          /* yha render fix key h  materailtable ki  jisme rowdata ka naam kuch bi rakh do yhe render har row ka data legi  Avatar pic to show karne ke liye aaya h  */
  
          // field me database ki filed likhte h
        ]}
        data={companylist}  
        // yha sara data category me aaya tha islye lagaya h      
        actions={[
          {
            icon:'edit',
            tooltip: 'Edit Company',
          onClick: (event, rowData)=>handleSetDataForDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Company',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/company')//navigate laga dia h
          }
        ]}
      />
    )
  }
  

    return(<div>
       <div className={classes.dialogmainContainer}>
    <div className={classes.dialogbox}>

      
{displayCompany()}
    </div>
    {showDialog()}

</div>    

    </div>)

}