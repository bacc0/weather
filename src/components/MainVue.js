import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core'
import Thermometer from 'react-thermometer-component'
import { motion }  from 'framer-motion'
import AnimatedNumber from 'animated-number-react'



const MainVue = (props) => {



     const { temperature, humidity, feelslike, 
             windSpeed, icon, typeUnit, 
             descriptions, currentPlace, forecast } = props

     const classes = useStyles()

     let format = typeUnit === 'Imperial'  ?  '°F'  :  '°C' 

     const upper_Part = (

          <div className={classes.up_Wrapper}>
               <div className={classes.up_Wrapper_Inner_center}>
                    <div className={classes.city}>
                         {currentPlace}
                    </div>
                    <div className={classes.tempe_Container}>

                         <AnimatedNumber
                              value={temperature}
                              className={classes.temperature}
                              formatValue={(value) => value.toFixed(0)}
                              duration={200}
                         />
                         <span className={classes.deg}>
                              ˚
                         </span>
                    </div>
                    <div className={classes.them_Deg}>
                         <div className={classes.up_Wrapper_Inner_1}>
                              <div>
                                   <Thermometer

                                        theme='light'
                                        value={temperature}
                                        max='100'
                                        size='small'
                                        height='97'
                                        format={format}
                                   />
                              </div>
                         </div>

                         <div className={classes.up_Wrapper_Inner_2}>
                              <div className={classes.CFcontainer}>
                                   {
                                        typeUnit === 'Imperial'
                                             ? <span className={classes.CF}>F</span>
                                             : <span className={classes.CF}>C</span>
                                   }
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )

     const lower_Part = (
          <Fragment>
          <div className={classes.down_Wrapper}>
               <div className={classes.down_Wrapper_Inner}>
                    <div className={classes.wrapper_Inner_UP}>
                         <div className={classes.inner_UP_1}>
                              <div className={classes.info_Wrapper}>
                                   <div>
                                        <div className={classes.info_Wrapper_UP}>
                                             <img 
                                                  className={classes.pic} 
                                                  src={`${icon}`} 
                                                  alt='Icon weather today'
                                             />
                                        </div>
                                        <div className={classes.info_Wrapper_DOWN} style={{ marginTop: 0}}>
                                             {descriptions}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className={classes.inner_UP_2}>
                              <div className={classes.info_Wrapper}>
                                   <div>
                                        <div className={classes.info_Wrapper_UP}>
                                             <AnimatedNumber 
                                                  value={feelslike}
                                                  className={classes.resultsValue}
                                                  formatValue={(value) => value.toFixed(0)}
                                                  duration={250}
                                             />
                                        </div>
                                        <div className={classes.info_Wrapper_DOWN}>
                                        Feels like 
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={classes.down_Inner_DOWN}>
                         <div className={classes.inner_DOWN_1}>
                              <div className={classes.info_Wrapper}>
                                   <div>
                                        <div className={classes.info_Wrapper_UP}>
                                             <AnimatedNumber 
                                                  value={windSpeed}
                                                  className={classes.resultsValue}
                                                  formatValue={(value) => value.toFixed(0)}
                                                  duration={300}
                                             />
                                        </div>
                                        <div className={classes.info_Wrapper_DOWN}>
                                             Wind speed
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className={classes.inner_DOWN_2}>
                              <div className={classes.info_Wrapper}>
                                   <div>
                                        <div className={classes.info_Wrapper_UP}>
                                             <AnimatedNumber 
                                                  value={humidity}
                                                  className={classes.resultsValue}
                                                  formatValue={(value) => value.toFixed(0)}
                                                  duration={300}
                                             />
                                        </div>
                                        <div className={classes.info_Wrapper_DOWN}>
                                             Humidity
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

          </Fragment>
     )

     return (
          
          <motion.div 
               initial    ={{ opacity: 0 }}
               animate    ={{ opacity: 1 }}
               transition ={{ duration: 0.3 }}
               className={classes.root}
          >
               <motion.div 
                    
                    className={classes.root}
                    initial    ={{ scale: 0 , y: 70 }}
                    animate    ={{ scale: 1 , y:  0 }}
                    transition ={{ duration: .2}}
               >
               {
                    !forecast &&
                         <Fragment>
                              <div  className={classes.paper1}>
                                   <div >
                                      { upper_Part }
                                       { lower_Part }                  
                                   </div>
                              </div>
                         </Fragment>
                    }
               </motion.div>
          </motion.div>
     )
}



export default MainVue



const useStyles = makeStyles((theme) => ({

     up_Wrapper:{
          width: '90%',
          display : 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          maxWidth: 860,
          margin: '-40px auto',
          paddingTop: 20,

          '@media (min-width : 720px)': {
               
               margin: '-10px auto',
               paddingTop: 0,
          },
     },
    
     up_Wrapper_Inner_center:{
          height: 240,
          width: 300,
          margin: '0 auto 40px',
          borderRadius : '15px 15px 0 0',
          background:'transparent',
          display:'block',
          boxShadow: '0 0 0 rgb(0, 0, 0, 0)',
          borderBottom: '0px solid #516B9B',
          backdropFilter  : 'blur(6px)',

          '@media (min-width : 720px)': {
               width: 480,
               height: 420,
               background:'rgb(0, 0, 0, 0.2)',
               margin: '10px auto 10px',
               boxShadow: '0 0 8px rgb(0, 0, 0, 0.1)',
               borderBottom: '0.1px solid #516B9B',
               borderLeft :'0.1px solid #1D283C',
               borderTop: '0.1px solid #1D283C',
               borderRight: '0.1px solid #1D283C',
          },
     },


     city: {
          width: '100%',
          height: '10%',
          marginTop: 0, 

          '@media (min-width : 720px)': {
               marginTop: 16, 
               marginBottom:-16
          },
     },

     tempe_Container: {
          textAlign: 'center',
          width: '100%',
          height: '80%',
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     temperature: {
          marginLeft: 20,
          fontSize: '7.2rem',
          '@media (min-width : 720px)': { 
               fontSize: '12rem',
               marginLeft: 40,
          },
     },

     them_Deg:{
          display : 'flex',
          justifyContent: 'space-between',
     },

     up_Wrapper_Inner_1:{
          width: 45,
          margin: '-90px -36px ',
          
          '@media (min-width : 720px)': { 
               margin: '-70px 16px',
          },

     },
     
     up_Wrapper_Inner_2:{
          width: 45,
          margin: '-43px 0',

          '@media (min-width : 720px)': { 
               margin: '-58px 16px',
          },

     },

     deg:{
          marginTop: -60,
          fontSize: '3.2rem',
          '@media (min-width : 720px)': { 
               fontSize: '6rem',
               marginTop: -110,
          },
     },

     CFcontainer: {
          top: 0,
          position: 'relative',

          '@media (min-width : 720px)': {  
               top: 10,
          },
     },

     CF: {
          fontSize: '4rem',

          '@media (max-width : 720px)': {  
               fontSize: '2.4rem',
          },
     },

     down_Wrapper:{
          width: '90%',
          margin: '0 auto',
     },

     down_Wrapper_Inner:{
          height: 280,
          width: 300,
          margin: '0 auto',
          borderRadius : '15px 15px 0 0',
          background:'#283958',
          display:'block',
          boxShadow: '0 0 8px rgb(0, 0, 0, 0.1)',

          '@media (min-width : 720px)': {
               display:'flex',
               width: 480,
               height: 160,
               borderRadius : '0',
          },
     },

     wrapper_Inner_UP:{
          width: '100%',
          height: '50%',
          margin: '0 auto',
          display : 'flex',

          '@media (min-width : 720px)': { 
               width: '50%',
               height: '100%',
          },
     },

     inner_UP_1:{
          width: '50%',
          height: '100%',
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     inner_UP_2:{
          width: '50%',
          height: '100%',
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     down_Inner_DOWN:{
          width: '100%',
          height: '50%',
          margin: '0 auto',
          display : 'flex',

          '@media (min-width : 720px)': { 
               width: '50%',
               height: '100%',
          },
     },

     inner_DOWN_1:{
          width: '50%',
          height: '100%',
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     inner_DOWN_2:{
          width: '50%',
          height: '100%',
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     info_Wrapper: {
          width: '100%',
          height: '80%',
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     info_Wrapper_UP: {
          width: '100%',
          height: '50%',
          textAlign: 'center',
          fontSize : '3.2rem',
     },
     info_Wrapper_DOWN: {
          width: '100%',
          height: '50%',
          textAlign: 'center',
          fontSize : '0.9rem',
     },

     pic:{
          width: 74,
          height: 74,
          marginBottom: -20,
     },
}))

