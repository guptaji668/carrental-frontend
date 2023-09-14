import MaterialTable from "@material-table/core";

import{useState,useEffect} from "react"
import {getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import { Avatar ,Button,Grid,TextField} from "@material-ui/core";
import { render } from "@testing-library/react";
import { useStyles } from "./DisplayVehicleCss";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function DisplayVehicle(){

    var classes=useStyles()
    var navigate=useNavigate()

    const[vehicleId,setVehicleId]=useState("")
    const[vehicleList,setVehicleList]=useState([])
    const[modelList,setModelList]=useState([])
    const[categoryList,setCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[companyList,setCompanyList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[companyId,setCompanyId]=useState('')
    const[modelId,setModelId]=useState('')
    const[vendorId,setVendorId]=useState('')
    const[registrationNo,setRegistrationNo]=useState('')
    const[color,setColor]=useState('')
    const[fuel,setFuel]=useState('')
    const[ratings,setRatings]=useState('')

    const[average,setAverage]=useState('')
    const[remark,setRemark]=useState('')
    const[capacity,setCapacity]=useState('')
    const[status,setStatus]=useState('')
    const[feature,setFeature]=useState('')
    const[originalPicture,setOriginalPicture]=useState({filename:'/assets/HONDA.png',bytes:''})

    const[open,setOpen]=useState(false)//dialog kaa 
    var [prevPicture,setPrevPicture]=useState('')
  var [buttonStatus,setButtonStatus]=useState({upload:true})
  var [oldPicture,setOldPicture]=useState('')

/////table display///////////////////////////////////////////////////////////////
 var fetchAllVehicle=async()=>{
var result=await getData("vehicle/displayallvehiclelist")
setVehicleList(result.data)

 }
 useEffect(function(){
    fetchAllVehicle()
 },[])

 
 function displayVehicle(){
    return(
        <MaterialTable
        title="Vehicle List"
        columns={[

          { title:'Vehicle', field: 'vehicleid',render:(rowData)=><div>{rowData.vehicleid}/{rowData.vendorid}<br/>{rowData.status}</div> },
            // ek sath kai mix kar di database ki row 
          { title:'Company', render:(rowData)=><div>{rowData.companyname}<br/>{rowData.modelname}/{rowData.capacity}</div> },
          { title: 'Category', field: 'categoryid',render:(rowData)=><div>{rowData.categoryname}<br/>{rowData.subcategoryname}<br/></div> },
          { title: 'Registration', field: 'registrationno',render:(rowData)=><div>{rowData.registrationno}/{rowData.color}<br/>{rowData.fueltype}/{rowData.average}</div> },
          { title: 'Ratings', field: 'ratings' },
          { title: 'Remarks', field: 'remarks' },
 
          { title: 'Features', field: 'feature'},
        

          
          { title: 'OriginalPicture', field: 'originalpicture',render:(rowData)=><Avatar  src={`${ServerURL}/images/${rowData.originalpicture}`}  style={{width:100,height:70}} variant="rounded"/>},
         
        ]}
        data={vehicleList}      
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Vehicle',
            onClick: (event, rowData) =>handleSetDataForDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Vehicle',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/vehicle')//navigate laga dia h
          }

        ]}
      />
    )


}
//////////////////dialog work/////////////////////////////////

const handleSetDataForDialog=(rowData)=>{

setVehicleId(rowData.vehicleid)
  setCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  setCompanyId(rowData.companyid)
  setModelId(rowData.modelid)
  setVendorId(rowData.vendorid)
  setRegistrationNo(rowData.registrationno)
  setColor(rowData.color)
  setFuel(rowData.fueltype)
  setRatings(rowData.ratings)
  setAverage(rowData.average)
  setCapacity(rowData.capacity)
  setFeature(rowData.feature)
  setRemark(rowData.remarks)
  setStatus(rowData.status)
  setOriginalPicture({filename:`${ServerURL}/images/${rowData.originalpicture}`,bytes:''})
  setOldPicture(rowData.originalpicture)
  setPrevPicture(`${ServerURL}/images/${rowData.originalpicture}`)



  fetchAllSubcategoryByCategory(rowData.categoryid)
  fetchAllCompanyBySubCategory(rowData.subcategoryid)
  fetchAllModelByCompany(rowData.companyid)
  setOpen(true)
}


    ///// categoryDropDown start..........................//
    const fetchAllCategory=async()=>{
      var result=await getData('category/display_all_category')
      setCategoryList(result.data)
  }

  useEffect(function(){
      fetchAllCategory();
  },[])

 const fillCategoryDropDown=()=>{
      return categoryList.map((item)=>{

          return(  <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        
      })

  }
  const handleChangeCategory=(event)=>{
      setCategoryId(event.target.value)
      fetchAllSubcategoryByCategory(event.target.value)
  }

///categorydorpdown END.............//

///// start subcategory dropdown//////////////////////
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

////end.. subcategory///////////////////////


const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
  var body={subcategoryid:subcategory_id}
  var response=await postData('company/fetch_all_company_by_subcategory',body)
  setCompanyList(response.result)
}

const fillCompanyDropDown=()=>{
  return companyList.map((item)=>{
      return(<MenuItem value={item.companyid}>{item.companyname}</MenuItem>)
  })

}


const handleCompanyChange=(event)=>{
  setCompanyId(event.target.value)
  fetchAllModelByCompany(event.target.value)

}
//////end company dropdown//////


const fetchAllModelByCompany=async(company_id)=>{
var body={companyid:company_id}
  var response=await postData('model_ctrl/fetch_all_model_by_company',body)
setModelList(response.result)
}

const fillModelDropDown=()=>{
  return modelList.map((item)=>{
      return(<MenuItem value={item.modelid}>{item.modelname}</MenuItem>) 
  })
}

const handleModelChange=(event)=>{
  setModelId(event.target.value)

}

//end model dropdoewn////////////////////////

const handleFuelChange=(event)=>{
  setFuel(event.target.value)
}

const handleRatingsChange=(event)=>{
  setRatings(event.target.value)
}

const handlestatusChange=(event)=>{
  setStatus(event.target.value)
  }

const handleDialogClose=()=>{
  setOpen(false)
}

const handleEditPicture=(event)=>{
  setOriginalPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setButtonStatus({upload:false})

}

const handleDiscard=(rowData)=>{
  setOriginalPicture({filename:prevPicture,bytes:''})
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
  formdata.append('vehicleid',vehicleId)
  
  formdata.append('oldpicture',oldPicture)
  formdata.append('originalpicture',originalPicture.bytes)
  var response=await postData('vehicle/edit_picture',formdata)
  if(response.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Picture Updated Successfully'
      
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
fetchAllVehicle()

  }


  const handleEditData=async()=>{
    // ab hme formdata ka use json jese karenge ku ki hume pic nh deni only data dena h
    var body={vendorid:vendorId,regisno:registrationNo,color:color,fuel:fuel,ratings:ratings,average:average,remarks:remark,capacity:capacity,status:status,features:feature,vehicleid:vehicleId}
     
      var response=await postData('vehicle/edit_data',body)
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
    fetchAllVehicle()
    // dubara refresh ho jaye table
    }



    const handleDeleteData=async()=>{
      var body={vehicleid:vehicleId,oldpicture:oldPicture}
       var response=await postData('vehicle/delete_data',body)
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
     fetchAllVehicle()
     // dubara refresh ho jaye table
     }




const ShowDialog=()=>{
  return(
    <div>
 <Dialog
        open={open}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>

                <Grid xs={12} item style={{fontSize:24,fontWeight:'bolder'}}>
                    Edit Vehicle Interface  
                  </Grid>


                
                 <Grid xs={6} item >
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

                <Grid xs={6} item >
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


                <Grid xs={6} item >
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


                <Grid xs={6} item >
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={modelId}
                       label="Select MOdel"
                    onChange={handleModelChange}>
                     
                       {fillModelDropDown()}          
                 
                      </Select>
                        </FormControl>
                        </Grid>


                        <Grid xs={4} item>
                    <TextField value={vendorId} onChange={(event)=>setVendorId(event.target.value)} fullWidth label='Vendor Id'></TextField>
                    </Grid>

                    <Grid xs={4} item>
              <TextField  value={registrationNo} onChange={(event)=>setRegistrationNo(event.target.value)} fullWidth label='Registration No.'></TextField>
                    </Grid>

                    <Grid xs={4} item>
                    <TextField value={color} onChange={(event)=>setColor(event.target.value)} fullWidth label='Colour'></TextField>
                    </Grid>


                    <Grid xs={4} item>
                    <Box sx={{ minWidth: 120 }}>
           <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select-FuelType</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fuel}
          label=" Select-FuelType"
          onChange={handleFuelChange}
        >
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="CNG">CNG</MenuItem>
        </Select>
              </FormControl>
                </Box>
  
                    </Grid>



                    <Grid xs={4} item>
                    <Box sx={{ minWidth: 120 }}>
           <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select-Ratings</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ratings}
          label=" Select-Ratings"
          onChange={handleRatingsChange}
        >

              <MenuItem value={1}>1*</MenuItem>
         <MenuItem value={2}>2**</MenuItem>
          <MenuItem value={3}>3***</MenuItem>
          <MenuItem value={4}>4****</MenuItem>
          <MenuItem value={5}>5******</MenuItem>
          
        </Select>
              </FormControl>
                </Box>
  
                    </Grid>

                    <Grid xs={4} item>
                    <TextField value={average} onChange={(event)=>setAverage(event.target.value)} fullWidth label='Average'></TextField>
                    </Grid>


                    <Grid xs={6} item>
                    <TextField value={remark} onChange={(event)=>setRemark(event.target.value)} fullWidth label='Remarks'></TextField>
                    </Grid>

                    
                    <Grid xs={6} item>
                    <TextField  value={capacity} onChange={(event)=>setCapacity(event.target.value)} fullWidth label='Capacity'></TextField>
                    </Grid>

                    <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={status}
                   onChange={handlestatusChange}
                   >
                  <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
                  <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
                  </RadioGroup>
                  </FormControl>
                </Grid>

                   

                    
                    <Grid xs={6} item>
                    <TextField value={feature} onChange={(event)=>setFeature(event.target.value)} fullWidth label='Features'></TextField>
                    </Grid>

                    <Grid xs={6} item className={classes.center} >
                {showHidePictureButton()}
                </Grid>


                    <Grid xs={6} item  className={classes.center}>
                    <Avatar 
                        alt="Vehicle Picture"
                        src={originalPicture.filename}
                          variant="rounded"
                      sx={{ width: 120, height: 56 }}
                      />

                    
                </Grid>


                <Grid xs={6} item >
                    <Button  onClick={handleEditData} fullWidth variant="contained" color="primary">
                        Edit Data
                    </Button>
                </Grid>


                <Grid xs={6} item >
                    <Button onClick={handleDeleteData} fullWidth variant="contained" color="primary">
                        Delete
                    </Button>
                </Grid>



                  







                  </Grid>
                  </div>
                  </div>


         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} >Close</Button>
         
          
        </DialogActions>
      </Dialog>

    </div>

  )
}




    return(<div> 

<div className={classes.dialogmainContainer}>
    <div className={classes.dialogbox}>

{displayVehicle()}
        </div>

        {ShowDialog()}
        </div>

   
    </div>
        )
}