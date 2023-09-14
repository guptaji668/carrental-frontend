import {useEffect,useState,createRef} from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ServerURL } from "../../Services/FetchNodeServices";


export default function FeaturedComponent(props){
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1, 
        arrows:false
      };    
  var myslider=createRef()    
   var images=props.images

// props .images jo ki home component  me featurecomponet ke sath props images beja h bo j props banya h ??images naam ka bo h
/** my slider ka object banya  */

/** createRef apna kudh ka component ka address yha referance bannane me use karte */
const playSlide=()=>{
 return images.map((item)=>{
   return( 
   <div style={{paddingLeft:10,paddingRight:10}}>
    <img src={`${ServerURL}/images/${item.image}`} style={{borderRadius:20,width:280,height:170}} />

   </div>)

 })

}
const handleClickLeft=()=>{
myslider.current.slickPrev()

}
const handleClickRight=()=>{
  myslider.current.slickNext()

}

return(
<div>
  <div style={{display:'flex',justifyContent:'space-between',paddingBottom:10,paddingTop:10,width:'97%'}} >
    <span style={{color:'#fff',fontWeight:"bolder",fontSize:28}}>{props.title}</span>
    <span><KeyboardArrowLeftIcon  style={{fontSize:34}} onClick={handleClickLeft} /> <KeyboardArrowRightIcon  style={{fontSize:34}} onClick={handleClickRight}/></span>
  </div>
<Slider ref={myslider} {...settings}>
 {playSlide()}
</Slider>   
</div>
)

}
/** yhe props title bnanya tha featurecomponent me isliye props.title;likhs h */