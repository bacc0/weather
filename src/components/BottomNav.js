import React from 'react'
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import TodayIcon from '@material-ui/icons/Today'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { motion } from 'framer-motion'


const BottomNav = ( props ) => {


     
     const { setForecast, value, setValue, forecastGetData } = props

     const classes = useStyles();

     return (
          <motion.div 
               initial    ={{ opacity: 0 }}
               animate    ={{ opacity: 1 }}
               transition ={{ duration: 0.4 }}
               className={classes.root}
          >
               <motion.div 
                    
                    className={classes.root}
                    initial    ={{ scale: 0 , y: -270 }}
                    animate    ={{ scale: 1 , y:    0 }}
                    transition ={{ duration: .2}}
               >
                    <BottomNavigation
                         value={value}
                         onChange={(e, newValue) => {
                              setValue(newValue)
                              setForecast(newValue === 0 ? false : true)
                              forecastGetData()
                         }}
                         showLabels
                         className={classes.rootBottomNavigationMenu}
                    >
                         <BottomNavigationAction className={classes.buttonColor} label='Today' icon={<TodayIcon />} />
                         <BottomNavigationAction className={classes.buttonColor} label='Forecast' icon={<DateRangeIcon />} />
                    </BottomNavigation>
               </motion.div>
          </motion.div>
     );
}



export default  BottomNav



const useStyles = makeStyles({

     rootBottomNavigationMenu: {
          width: 300,
          backgroundColor: '#E0E0E0',
         
          borderRadius : '0 0 15px 15px',

          '@media (min-width : 720px)': { 
               height: 70,
               width: 480,
          },
     },
     buttonColor:{
          color: '#948D8D',
     }
})