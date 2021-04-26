import React, { useEffect, useState }from 'react'
import { withStyles, FormGroup, FormControlLabel, Switch } from '@material-ui/core/'



const  SwitchEXPORT = ( props ) => {



     const { typeUnit, setTypeUnit, setForecast } = props

     const [state, setState] =  useState({ checked: true })

     useEffect(() => {
		setTypeUnit(
               typeUnit === 'Metric'
                    ? 'Imperial'
                    : 'Metric'
          )
	}, [state])

     const style = {
          transform: 'rotate(90deg)',
          marginTop: 26,
          marginBottom:-6,
     }
    
     const handleChange = (event) => {
          setState({ ...state, [event.target.name]: event.target.checked });
          setForecast(false)
     };

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
               backgroundColor:'#31374E',
          },
     },
     checked: {},
     track: {},
})(Switch);
