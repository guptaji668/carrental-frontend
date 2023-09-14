import Header from "./MyComponents/Header"
import SearchComponent from "./MyComponents/SerchComponent"
import FeaturedComponent from "./MyComponents/FeaturedComponent"
import { getData } from "../Services/FetchNodeServices"
import { useEffect, useState } from "react"
import OfferComponent from "./MyComponents/OfferComponent"
import WhyComponent from "./MyComponents/WhyComponent"
import Cities from "./MyComponents/Cities"
import Ourinvestor from "./MyComponents/Ourinvestor"
import { Ourjourney } from "./MyComponents/Ourjourney"
/** yha ourjourney {karlybraket }  me likha ku ki function export default mh h only export h matlb ki yhe ki jab hyum export akela lagate h to usme kai componet bnte h ander jese classes.mainconatainer isliye yhe {] ke ander likhte h default bala ek component hota h islir { }iske ander nh  likhte h*/

import PlayStore from "./MyComponents/PlayStore"
import Footer from "./MyComponents/Footer"

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles"




export default function Home(props){
  const [features,setFeatures]=useState([])
  // const matches = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
//sm small it means ki mobile ki scren se up sabi me clegi

// const text=()=>{
//   // return <span>{`(min-width:600px) matches: ${matches}`}</span>;
//   return <span><h1>{`theme.breakpoints.up('sm') matches: ${matches}`}</h1></span>;
// // }
 
  
  const getAllFeature=async()=>{
  var  result=await getData('user/all_feature')
  console.log("REsssssssult:",result)
  setFeatures(result.data)
   //database se feature ki image aa gyi

  }
  useEffect(function(){

    getAllFeature()
 
  },[])


    return(
        <div style={{display:'flex',flexDirection:'column',background:'#ecf0f1'}}>
          {/* { text()} */}
          <Header/>
          <div>
            <SearchComponent/>
          </div>
         <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'90%' }}>
          <FeaturedComponent  title="Featured" images={features}/>

          </div>
       </div> 


    
         <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <OfferComponent title="Offer"/>

          </div>
          </div>
          
          
         <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <WhyComponent title="Why Us"/>

          </div>
          </div>

              
         <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <Cities />

          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <Ourinvestor />

          </div>
          </div>


          <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <Ourjourney/>

          </div>
          </div>

          
          <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <PlayStore />

          </div>
          </div>
          
          <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{width:'90%' }}>
          <Footer />

          </div>
          </div>


         
        </div>
    )


}
          /** yha images naam ka yhe props h jisme  feature ka data h 
           * or featurecomponet file me props.images yhe database  ka h
           */