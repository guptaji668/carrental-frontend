import MaterialTable from "@material-table/core";

import{useState,useEffect} from "react"
import {getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import { Avatar ,Button,Grid,TextField} from "@material-ui/core";
import { render } from "@testing-library/react";
import { useStyles } from "./DisplayModelCss";

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
import { upload } from "@testing-library/user-event/dist/upload";

export default function DisplayModel(){


    var classes=useStyles()
    var nevigate=useNavigate()
    const[categoryList,setCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[companyList,setCompanyList]=useState([])
    const[modelList,setModelList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[companyId,setCompanyId]=useState('')
    const[modelId,setModelId]=useState('')
    const[modelName,setModelName]=useState('')
    const[year,setYear]=useState('')
    const[icon,setIcon]=useState({filename:'/assets/HONDA.png',bytes:''})

    const[open,setOpen]=useState(false)//dialog kaa 
    var [prevIcon,setPrevIcon]=useState('')
  var [buttonStatus,setButtonStatus]=useState({upload:true})
  var [oldIcon,setOldIcon]=useState('')




//displayModel list start///////////////////////////////////////////////////////////
const fetchAllModel=async()=>{
    var result=await getData('model_ctrl/displayallmodellist')
    setModelList(result.data)
}

useEffect(function(){
    fetchAllModel();
},[])

    function displayModel(){
        return(
            <MaterialTable
            title="Model List"
            columns={[
              { title: 'ModelId', field: 'modelid' },
              { title: 'CategoryId', field: 'categoryid' },
              { title: 'SubCategoryId', field: 'subcategoryid'},
              { title: 'CompanyId', field: 'companyid'},
              { title: 'Model Name', field: 'modelname'},
              { title: 'Model Year', field: 'year'},
              { title: 'Icon', field: 'icon',render:(rowData)=><Avatar  src={`${ServerURL}/images/${rowData.icon}`}  style={{width:100,height:70}} variant="rounded"/>},
             
            ]}
            data={modelList}      
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Model',
                onClick: (event, rowData) =>handleSetDataForDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Model',
                isFreeAction: true,
                onClick: (event) => nevigate('/dashboard/model')//navigate laga dia h
              }

            ]}
          />
        )
    

    }

///last displaymodel///////////////////////////////////////////////////////////////////////////////////////

///start dialog////////////////////////////





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

        return( <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
      
    })

}
const handleChangeCategory=(event)=>{
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
   fetchAllCompanyBySubCategory(event.target.value)
   
   }  

   const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
    var body={subcategoryid:subcategory_id}
    var response=await postData('company/fetch_all_company_by_subcategory',body)
    setCompanyList(response.result)
}

const fillCompanyDropDown=()=>{
    return companyList.map((item)=>{
        return(<menuItem value={item.companyid}>{item.companyname}</menuItem>)
    })

}


const handleCompanyChange=(event)=>{
    setCompanyId(event.target.value)
    fetchAllCompanyBySubCategory()

}


const handleSetDataForDialog=async(rowData)=>{
    setOpen(true)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setCompanyId(rowData.companyid)
    setModelName(rowData.modelname)
    setModelId(rowData.modelid)
    setYear(rowData.year)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setOldIcon(rowData.icon)
setPrevIcon(`${ServerURL}/images/${rowData.icon}`)

    fetchAllSubcategoryByCategory(rowData.categoryid)
    fetchAllCompanyBySubCategory(rowData.subcategoryid)



}


const handleEditPicture=(event)=>{
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
                {buttonStatus.upload?<> <Button fullWidth  color="primary" variant="contained" component="label">
                Edit Picture
                 <input  onChange={handleEditPicture}  hidden accept="image/*" multiple type="file"  />
              </Button></>:<><Button onClick={handleSavePicture} color="primary">save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}


                </div>

        )
    }

    const handleSavePicture=async()=>{

        var formdata=new FormData
        formdata.append('subcategoryid',subCategoryId)
        
        formdata.append('oldicon',oldIcon)
        formdata.append('icon',icon.bytes)
        var response=await postData('model_ctrl/edit_picture',formdata)
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
      fetchAllModel()

        }


        const handleEditData=async()=>{
          // ab hme formdata ka use json jese karenge ku ki hume pic nh deni only data dena h
          var body={modelname:modelName,year:year,modelid:modelId}
           
            var response=await postData('model_ctrl/edit_data',body)
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
          fetchAllModel()
          // dubara refresh ho jaye table
          }
          

          const handleDeleteData=async()=>{
            var body={modelid:modelId,oldicon:oldIcon}
             var response=await postData('model_ctrl/delete_data',body)
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
           fetchAllModel()
           // dubara refresh ho jaye table
           }
      
      


const ShowDialog=()=>{
  return(
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
                    Edit Model Interface  
                  </Grid>

                  <Grid xs={4} item >
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={categoryId}
                       label="Select category"
                    onChange={handleChangeCategory}>
                     
                       {fillCategoryDropDown()}          
                 
                      </Select>
                        </FormControl>
                    
                </Grid>

                <Grid xs={4} item >
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={subCategoryId}
                       label=" Select Subcategory"
                    onChange={handleSubCategoryChange}>
                     
                       {fillSubCategoryDropDown()}          
                 
                      </Select>
                        </FormControl>
                </Grid>

                <Grid xs={4} item >
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={companyId}
                       label="Select Company"
                    onChange={handleCompanyChange}>
                     
                       {fillCompanyDropDown()}          
                 
                      </Select>
                        </FormControl>
                    
                </Grid>
            

                <Grid xs={6} item>
                    <TextField value={modelName} onChange={(event)=>setModelName(event.target.value)} fullWidth label='Model Name'></TextField>

                </Grid>
                <Grid xs={6} item>
                    <TextField  value={year} onChange={(event)=>setYear(event.target.value)}  fullWidth label='Model Year'></TextField>

                </Grid>

                <Grid xs={6} item className={classes.center} >
                {showHidePictureButton()}
                </Grid>


                <Grid xs={6} item >
                <Avatar style={{alignItems:'center'}}
                        alt="Model Icon"
                        src={icon.filename}
                          variant="rounded"
                      sx={{ width: 120, height: 56 }}
                      />

                </Grid>


              

                

                


                <Grid xs={6} item >
                    <Button fullWidth variant="contained" color="primary" onClick={handleEditData} >
                        Edit Data
                    </Button>
                </Grid>

                <Grid xs={6} item >
                    <Button  fullWidth variant="contained" color="primary" onClick={handleDeleteData}  >
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
  )
}






//////////////////End dialog/////////////////////////////

return(<div>
   <div className={classes.dialogmainContainer}>
    <div className={classes.dialogbox}>

    {displayModel()}
    </div>
    {ShowDialog()}

    </div>

</div>
)

}
