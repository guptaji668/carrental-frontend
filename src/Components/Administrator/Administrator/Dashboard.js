import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar ,Grid} from '@mui/material';
import SideBar from './Sidebar';
import { useState,useEffect } from 'react';


import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
 
import DisplayAllCategory from "../Category/DisplayAllCategory";
import Category from "../Category/Category";
import DisplayAllSubCategory from "../SubCategory/DisplayallAllSubcategory";
import SubCategory from "../SubCategory/SubCategory";
import Company from "../Company/Company";
import DisplayAllCompanyList from "../Company/DisplayCompany";
import Model from "../Modal/Model";
import DisplayModel from "../Modal/DisplayModel";

import Vehicle from "../Vehicle/Vehicle";
import DisplayVehicle from "../Vehicle/DisplayVehicle";
import FeatureInterface from '../Featured/FeatureInterface';
import Offer from '../Offer/Offer';
import DisplayAllOffer from '../Offer/DisplayAllOffer'
import WhypnpInterface from '../WhyPnp/WhypnpInterface';
import { isValidAuth } from '../../Services/FetchNodeServices';


// flexGrow=1 ka mtlb h ki yhe last tak spacee mar deta h uske baad sabse last me kuch likega 
export default function Dashboard() {
  const[authState,setAuthState]=useState(false)

  useEffect(function(){
    checkAuth()
  },[])


  const checkAuth=async()=>{
    var result=await isValidAuth()
   
    if(result.auth)
    { setAuthState(true)}
    else
    {
  setAuthState(false)
    }
  
   }

  return (

    <div>
      {authState?
    <Box sx={{ flexGrow: 1 }}>


      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PaynRent
          </Typography>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>

<Grid container spacing={2}>
       <Grid item xs={12} >
        <div style={{paddingTop:5,paddingLeft:5,display:'flex',width:200,justifyContent:'center',alignItems:'center'}}>
          <img src='/assets/HONDA.png' style={{width:100}}/>
        </div>
        </Grid>
        <Grid item xs={2}>
         <SideBar/>
        </Grid>
  
    <Grid xs={10} item>
      
       <Routes>
          <Route  element={<Category/>} path="/category"/>
          <Route  element={<DisplayAllCategory/>} path="/displayallcategory"/>
          <Route  element={<SubCategory/>} path="/subcategory"/>
          <Route  element={<DisplayAllSubCategory/>} path="/displayallsubcategory"/>
          <Route  element={<Company/>} path="/company"/>
          <Route  element={<DisplayAllCompanyList/>} path="/displayallcompany"/>
          <Route  element={<Model/>} path="/model"/>
          <Route  element={<DisplayModel/>} path="/displayallmodel"/>
          <Route  element={<Vehicle/>} path="/vehicle"/>
          <Route  element={<DisplayVehicle/>} path="/displayallvehicle"/>
          <Route  element={<FeatureInterface/>} path="/featureinterface"/>
          <Route  element={<Offer/>} path="/offer"/>
          <Route  element={<DisplayAllOffer/>} path="/displayalloffer"/>
          <Route  element={<WhypnpInterface/>} path="/whypnpinterface"/>


  </Routes>
    </Grid>


 
 
</Grid>

    </Box>:<><h1>Not a Valid User....</h1></>}

    </div>
  );
}
