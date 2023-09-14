import {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { getData,postData,ServerURL} from '../../Services/FetchNodeServices';



// ====>  <box> or <div> ek hi ceez h ek jese h
// flexGrow=1 se sbselast me ata h content 
export default function Header(props){

const[categories,setCategories]=useState([])
const[subCategories,setSubCategories]=useState([])
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);//true yaa false ==boolean operator typecastting



const fetchAllSubCategory=async(cid)=>{
  var body={categoryid:cid}
var response=await postData('user/fetch_all_subcategory_by_category',body)
setSubCategories(response.data)
}

const handleClick=(event)=>{
    setAnchorEl(event.currentTarget)
    fetchAllSubCategory(event.currentTarget.value)
}

const handleClose=()=>{
    setAnchorEl(null)
}

const fetchAllCategory=async()=>{
var response=await getData("user/display_all_category")
setCategories(response.data)
}

const showMainMenu=()=>{
    return( categories.map((item)=>{
        return(
            <Button value={item.categoryid} onClick={handleClick}>{item.categoryname}</Button>
        )
    }))
}

const showSubMenu=()=>{
  return(subCategories.map((item)=>{
      return(
        <MenuItem onClick={handleClose}>{item.subcategoryname}</MenuItem>
      )
  }))
}


useEffect(function(){
    fetchAllCategory();
},[])

    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit'>
          <Toolbar>
           <img src="/assets/logo1.png" style={{width:70}}></img>
           <Box  component="div" sx={{ flexGrow: 1 }}>
           </Box>

           <Box>
            {showMainMenu()}
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      {showSubMenu()}
      </Menu>


            </Box>

            <Button color="inherit">LOGIN/SIGNUP</Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
}