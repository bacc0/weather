import React, { useState }from 'react'
import { withStyles, FormGroup, FormControlLabel, Switch } from '@material-ui/core'



const  SwitchEXPORT = ( props ) => {



     const { typeUnit, setTypeUnit, setForecast, unitsGetData } = props

     const [state, setState] =  useState({ checked: true })
    
     const handleChange = (event) => {
          
          setState({ ...state, [event.target.name]: event.target.checked })
          setForecast(false)
          unitsGetData(typeUnit === 'Metric' ? 'Imperial' : 'Metric')
          setTypeUnit(
               typeUnit === 'Metric'
                    ? 'Imperial'
                    : 'Metric'
          )
     }

     return (
          <FormGroup  style={{ margin:'0 auto', fontSize:'0.8rem'}} >
               <div  style={style}>
               <FormControlLabel
                    control={<SwitchType 
                         checked={state.checked} 
                         onChange={handleChange} 
                         name='checked' 
                    />}
               />
               </div>
               <div>{typeUnit}</div>
          </FormGroup>
     );
}



export default SwitchEXPORT



const SwitchType = withStyles({
     switchBase: {
          color: '#FFCA28',
          '&$checked': {
               color: '#FFCA28',
          },
          '&$checked + $track': {
               backgroundColor: '#31374E',
          },
     },
     checked: {},
     track: {},
})(Switch)

const style = {
     transform: 'rotate(90deg)',
     marginTop: 26,
     marginBottom:-6,
}
