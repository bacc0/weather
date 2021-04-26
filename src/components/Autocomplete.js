import fetch from 'cross-fetch';
import React, { useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default function Asynchronous({setSearch}) {



     const [open, setOpen] = useState(false)
     const [options, setOptions] = useState([])

     const loading = open && options.length === 0

     useEffect(() => {

          let active = true

          if (!loading) { return undefined }

          (async () => {
               const response = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
               const cities = await response.json()

               if (active) {
                    setOptions((cities).map((city) => city))
               }                
          })()

          return () => { active = false }

     }, [loading])

     useEffect(() => {

          if (!open) { setOptions([]) }

     }, [open]);

     const style = {
          width: 210,
          background: '#FFFFFF',
          borderRadius: 4,
          fontSize: '1px',
          margin: '0 auto',
     }

     const handelSubmit = (val) => {
          setSearch( val ? val.name : null)
     }

     const setVal= (e) => {
          setSearch( e.target.value )
          setOpen(true)
     }

     return (
          <Autocomplete
               id="Search for City"
               open={open}
               style={style}
               options={options}
               loading={loading}
               onClose={() => { setOpen(false) }}
               onChange={(event, value) => handelSubmit(value)}
               getOptionLabel={(option) => `${option.name}, ${option.country}`}
               getOptionSelected={(option, value) => option.name === value.name }

               renderInput={ (params) => (

                    <TextField
                         {...params}
                         id="inputField"
                         size="small"
                         style={style}
                         variant="outlined"
                         onChange={e => setVal(e)}
                         autoFocus
                         placeholder=" Search for City"
                    />
               )}
          />
     )
}


