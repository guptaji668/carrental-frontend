import {useEffect,useState} from "react";
import {Grid,TextField,Button,Avatar}  from "@mui/material";
import {useStyles} from "./CompanyCss"
import { ServerURL,postData, getData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// yhe component banya h comapany naam ka
export default function Company(props){


    var classes=useStyles()
    var navigate=useNavigate()

const[categoryList,setCategoryList]=useState([])
const[subCategoryList,setSubCategoryList]=useState([])
 const[categoryId,setCategoryId]=useState('')
 const[subCategoryId,setSubCategoryId]=useState('')
 const[companyName,setCompanyName]=useState('')
 const[categoryName,setCategoryName]=useState('')
 const[subCategoryName,setSubCategoryName]=useState('')
 const[icon,setIcon]=useState({filename:"/assets/car6.jpg",bytes:''})

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
  


const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

   const handleSubmit=async()=>{
    var formdata=new FormData()
    formdata.append("categoryid",categoryId)
    formdata.append("subcategoryid",subCategoryId)
    formdata.append("companyname",companyName)
    formdata.append("icon",icon.bytes)
    var result=await postData('company/companysubmit',formdata)
    if(result.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Company Submited Successfully'
       
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
    setCompanyName("")
    setIcon({filename:"/assets/car6.jpg",bytes:''})

}


const handleShowCompanyList=()=>{
    navigate('/dashboard/displayallcompany')

}





    return(
        
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>


                <Grid item xs={12} className={classes.headingStyle}>
          <div className={classes.center}>
          <ListAltIcon onClick={handleShowCompanyList}/>
          <div style={{marginLeft:8,fontSize:'24',fontWeight:'bolder'}}>
          Company Interface   
          </div>
          </div>
       

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

                <Grid item xs={6} >
        <Button fullWidth variant="contained" component="label">
        Upload
        <input onChange={handlePicture} hidden accept="image/*" multiple type="file"   />
      </Button>
        </Grid>

                <Grid xs={6} item  className={classes.center}>
                    <Avatar 
                        alt="Category Icon"
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
                    <Button  onClick={resetValue} fullWidth variant="contained" color="primary">
                        Reset
                    </Button>
                </Grid>





                </Grid>
                

            </div>

        </div>
    )




}