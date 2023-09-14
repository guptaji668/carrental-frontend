import {useEffect,useState} from "react";
import {Grid,TextField,Button,Avatar}  from "@mui/material";
import {useStyles} from "./ModelCss"
import { ServerURL,getData,postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//model component banya
export default function Model(){

    var classes=useStyles()
    var nevigate=useNavigate()
    const[categoryList,setCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[companyList,setCompanyList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[companyId,setCompanyId]=useState('')
    const[modelName,setModelName]=useState('')
    const[year,setYear]=useState('')
    const[icon,setIcon]=useState({filename:'/assets/HONDA.png',bytes:''})
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

}
//////end company dropdown//////

const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}


const handleSubmit=async()=>{
    var formdata=new FormData()
    formdata.append("categoryid",categoryId)
    formdata.append("subcategoryid",subCategoryId)
    formdata.append("companyid",companyId)
    formdata.append("modelname",modelName)
    formdata.append("year",year)
    formdata.append("icon",icon.bytes)
    var result=await postData('model_ctrl/modelsubmit',formdata)
    if(result.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Model Submited Successfully'
       
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

   const resetValue=async()=>{
    setCategoryId("")
    setSubCategoryId("")
    setCompanyId("")
    setModelName("")
    setYear("")
    setIcon({filename:"/assets/HONDA.png",bytes:''})

}

const handleDisplayModel=()=>{
    nevigate("/dashboard/displayallmodel")
}



    return(
         
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                <Grid item xs={12} className={classes.headingStyle}>
          <div className={classes.center}>
          <ListAltIcon onClick={handleDisplayModel}/>
          <div style={{marginLeft:8,fontSize:'24',fontWeight:'bolder'}}>
          Model Interface   
          </div>
          </div>
       

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
                <Grid xs={6} item>
                <Button fullWidth variant="contained" component="label">
                   Upload
                  <input onChange={handlePicture} hidden accept="image/*" multiple type="file"   />
                   </Button>
        
                </Grid>

                <Grid xs={6} item  className={classes.center}>
                    <Avatar 
                        alt="Company Icon"
                        src={icon.filename}
                          variant="rounded"
                      sx={{ width: 120, height: 56 }}
                      />

                    
                </Grid>
                <Grid xs={6} item >
                    <Button onClick={handleSubmit} fullWidth variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>


                <Grid xs={6} item >
                    <Button onClick={resetValue}  fullWidth variant="contained" color="primary">
                        Reset
                    </Button>
                </Grid>





                </Grid>
           </div>
        </div>
    )

}