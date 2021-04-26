import React from 'react'
import { makeStyles } from '@material-ui/core'
import Autocomplete from './Autocomplete'


const Search = (props) => {
     

     const { search, setSearch, getData} = props

     const classes = useStyles()

     const handleClick = (e) => { 
          e.preventDefault()
          getData() 
     }

     return (
               <form>
                    <Autocomplete setSearch={setSearch}/>
                    <button 
                         onClick={handleClick}
                         className={classes.button}
                         disabled={search === ''  ? true : false}
                    >
                         SEARCH
                    </button>
                    
               </form>
     )
}


export default Search



const useStyles = makeStyles((theme) => ({

     button: {
          color: '#141721',
          width :210,
          height: 39,
          border: 'none',
          cursor: 'pointer',
          margin: '10px 0 0',
          padding: 0,
          fontSize: '1rem',
          borderRadius: 4, 
          backgroundColor: '#FFCA28',
          fontWeight : 500,

 
          '&:hover': {
               backgroundColor: '#FFD249',
          },
          '&:active': {
               backgroundColor: '#D09D01',
          },
     },

      switch:{
           marginTop: -22,
     }
}))