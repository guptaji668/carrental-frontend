import { useEffect,useState } from "react";
import{Grid,Button,Avatar, TextField} from "@mui/material"
import {useStyle} from "./SubCategoryCss"
import { ServerURL,getData, postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function SubCategory(props){
    const classes=useStyle()
    var navigate=useNavigate()

    var[icon,setIcon]=useState({filename:'/assets/HONDA.png',bytes:''})

    var[categoryId,setCategoryId]=useState('')
    var[subCategoryName,setSubCategoryName]=useState('')
    var[priority,setPriority]=useState('')
    var[categoryList,setCategoryList]=useState([])


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
    }



    const handleSubmit=async()=>{
      var formdata=new FormData()
      formdata.append('categoryid',categoryId)
      formdata.append('subcategoryname',subCategoryName)
      formdata.append('icon',icon.bytes)
      formdata.append('priority',priority)
      var result=await postData('subcategory/subcategorysubmit',formdata)
      if(result.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'SubCategory Submited Successfully'
      
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
      setSubCategoryName("")
      setPriority("")
      setIcon({filename:"/assets/HONDA.png",bytes:''})
  
  }
  


    const handleShowSubCategoryList=()=>{
      navigate('/dashboard/displayallsubcategory')
    }

return(
    <div className={classes.maincontanier}>
        <div className={classes.box}>
            <Grid container spacing={2}>
              
            <Grid item xs={12} className={classes.headingStyle}>
          <div className={classes.center}>
          <ListAltIcon onClick={handleShowSubCategoryList}/>
          <div style={{marginLeft:8,fontSize:'24',fontWeight:'bolder'}}>
           SubCategory Interface   
          </div>
          </div>
       

        </Grid>

               
               
                <Grid xs={12} item >

                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                     id="demo-simple-select"
                      value={categoryId}
                       label="Select category"
                    onChange={handleChange}
                     >  
                       {fillCategoryDropDown()}          
                 
                      </Select>
                        </FormControl>
                    
                </Grid>

                <Grid xs={12} item >
                    <TextField value={subCategoryName} onChange={(event)=>setSubCategoryName(event.target.value)} fullWidth label="SubCategory Name"></TextField>
                </Grid>

                <Grid xs={12} item >
                    <TextField value={priority} onChange={(event)=>setPriority(event.target.value)} fullWidth label="Priority"></TextField>
                </Grid>

                <Grid item xs={6} >
        <Button fullWidth variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={handlePicture}  />
      </Button>
        </Grid>

        <Grid xs={6} item className={classes.center}>
        <Avatar
        alt="Category Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 56 }}
      />
        </Grid>
        <Grid xs={6} item>
            <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>

        </Grid>
        <Grid xs={6} item>
            <Button  onClick={resetValue} variant="contained" fullWidth>Reset</Button>

        </Grid>


            </Grid>

        </div>

    </div>
)

}
