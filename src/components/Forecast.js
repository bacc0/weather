import React  from 'react'
import { makeStyles, Card } from '@material-ui/core/'
import AnimatedNumber from 'animated-number-react'



const Forecast = (props) => {


     
     const { forecastArr, view, errors } = props
     

     const classes = useStyles()

     let result = ''

     if (forecastArr.list !== undefined) {

           result =forecastArr.list.map((list, i) => {

               const tempIcon = `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`
              
              return ( 
                    i === 5 || i === 10 || i === 20 || i === 30
                    ?    
                         <Card key={i} className={classes.card} style={{boxShadow: '0 0 0 rgba(0,0,0,0)'}}>
                              <div className={classes.temperatureContainer}>
                                   
                                   <AnimatedNumber 
                                        className={classes.temperature}
                                        value={list.main.temp.toFixed(0)}
                                        formatValue={(value) => value.toFixed(0)}
                                        duration={200}
                                   />
                                   ˚
                              </div>
                              <div className={classes.iconContainer}>
                                   <div className={classes.icon}
                                        style={{
                                             background: `url('${tempIcon}')`,
                                             backgroundSize: 'cover',
                                             backgroundColor: 'transparent',
                                             backgroundRepeat : 'no-repeat',
                                             backgroundPosition: 'center',
                                        }}
                                   /> 
                              </div>
                              <div className={classes.description}>{list.weather[0].description}</div> 

                              <div className={classes.allOt}>
                                   
                                   <AnimatedNumber 
                                        value={list.main.temp_max.toFixed(0)}
                                        formatValue={(value) => value.toFixed(0)}
                                        duration={250}
                                   />
                                   ˚
                              </div>
                              <div className={classes.allOtLett}>Max Temperature</div>

                              <div className={classes.allOt}>
                                   <AnimatedNumber 
                                        value={list.main.feels_like.toFixed(0)}
                                        formatValue={(value) => value.toFixed(0)}
                                        duration={275}
                                   />
                                   ˚
                              </div> 
                              <div className={classes.allOtLett}>Feels like</div>

                              <div className={classes.allOt}>
                                   
                                   <AnimatedNumber 
                                        value={list.wind.speed.toFixed(0)}
                                        formatValue={(value) => value.toFixed(0)}
                                        duration={275}
                                   />
                              </div> 
                              <div className={classes.allOtLett}>Wind speed </div>
                        
                         </Card>
                    
                    :    null
               )
           })
     }

     return (
          <React.Fragment>
          {
               !errors &&

               <div className={classes.root}>
                    { 
                    !view &&
                         <div className={classes.paper}>
                              
                              {result}
                         </div>
                    }
               </div>
          }
          </React.Fragment>
     )
}
export default Forecast



const useStyles = makeStyles((theme) => ({



     paper: {
          width: 300,
          height: 500,
          display: 'flex',
          justifyContent: 'space-between',
          // backgroundColor: 'transparent',
          margin: '0 auto',
          background:'rgb(0, 0, 0, 0.2)',
          borderRadius: '15px 15px 0 0',
          backdropFilter  : 'blur(6px)',

          '@media (min-width : 720px)': { 
               width: 480,
               height: 582,
               margin: '0 auto',
               justifyContent: 'center',
          },
     },

    
     card:{
          width: 124,
          color: '#FFFFFF',
          marginLeft: 0,
          background:'transparent',
     },

     temperatureContainer:{
          height: '26%',
          display: 'flex',
          fontSize:'2rem',
          alignItems: 'center',
          justifyContent: 'center',

          '@media (min-width : 720px)': { 
               fontSize:'3.4rem',
               },
     },

     temperature:{
          marginLeft: 18,
     },

     iconContainer:{
          height: '14%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     icon:{
          width :70,
          margin : '0 auto',
          height :50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },

     description:{
          color: '#6389CA',
          height: '13%',
          display: 'flex',
          fontSize : '0.8rem',
          alignItems: 'center',
          justifyContent: 'center',
     },

     allOt:{
          height: '13%',
          display: 'flex',
          fontSize : '1.4rem',
          alignItems: 'center',
          justifyContent: 'center',
     },

     allOtLett:{
          marginTop : -13,
          fontSize : '0.6rem',
     },
}))


