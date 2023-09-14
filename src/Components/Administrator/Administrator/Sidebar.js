import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { useNavigate } from 'react-router-dom';
//react.Fragment ek div ki trhe hi hota h
export default function SideBar() {
  var nevigate=useNavigate()
    return(
  <div>
  <React.Fragment>

    <ListItemButton  onClick={()=>nevigate('/dashboard/displayallcategory')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon >
      <ListItemText  primary="Category" />
    </ListItemButton>
    
    <ListItemButton   onClick={()=>nevigate('/dashboard/displayallsubcategory')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon >
      <ListItemText primary="Sub Category" />
    </ListItemButton>

    <ListItemButton    onClick={()=>nevigate('/dashboard/displayallcompany')}>
      <ListItemIcon >
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Company" />
    </ListItemButton>

    <ListItemButton   onClick={()=>nevigate('/dashboard/displayallmodel')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Model" />
    </ListItemButton>

    <ListItemButton  onClick={()=>nevigate('/dashboard/displayallvehicle')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicle" />
    </ListItemButton>

    
    <ListItemButton  onClick={()=>nevigate('/dashboard/featureinterface')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Featured" />
    </ListItemButton>
        
    <ListItemButton  onClick={()=>nevigate('/dashboard/offer')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Offers" />
    </ListItemButton>
        
    <ListItemButton  onClick={()=>nevigate('/dashboard/whypnpinterface')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="whyPNP" />
    </ListItemButton>
 
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
 
  </React.Fragment>



  <React.Fragment>
    <ListSubheader component="div" inset>
      User Report
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
  </div>
    )
}
