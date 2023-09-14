

const initialState={
    booking:{},
    userDetails:{},
    vehicle:{}
   }
  
   export default function RootReducer(state=initialState,actions)
   {
      switch(actions.type)
      {
          case 'ADD_BOOKING':
          
              state.booking=actions.payload
        
              return ({booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle})
          case 'ADD_USER':
              console.log("ADD USER:",actions)
              state.userDetails[actions.payload[0]]=actions.payload[1]
        
              return ({booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle})
          case 'ADD_VEHICLE':
                console.log("ADD VEHICLE:",actions)
                state.vehicle[actions.payload[0]]=actions.payload[1]
          
                return ({booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle})
     

          
    
          default:
              return state
  
      }
     
   }