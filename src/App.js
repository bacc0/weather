import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MainVue from './components/MainVue'
import BottomNav from './components/BottomNav'
import Forecast from './components/Forecast'
import { motion }  from 'framer-motion'
import Search from './components/Search'
import Switch from './components/Switch' 
import fetch from 'cross-fetch';



const App = () => {



	const classes = useStyles()

	const [temperature ,  setTemperature] = useState(0)
	const [humidity    ,     setHumidity] = useState(0)
	const [feelslike   ,    setFeelslike] = useState(0)
	const [windSpeed   ,    setWindSpeed] = useState(0)
	const [icon        ,         setIcon] = useState('')
	const [typeUnit    ,     setTypeUnit] = useState('Imperial')
	const [descriptions, setDescriptions] = useState('')
	const [search      ,       setSearch] = useState('')
	const [errors      ,       setErrors] = useState(false)
	const [currentCity ,  setCurrentCity] = useState('London')
	const [currentPlace, setCurrentPlace] = useState('')
	const [view        ,         setView] = useState(true)
	const [forecast    ,     setForecast] = useState(false)
	const [forecastArr ,  setForecastArr] = useState({})
	const [value       ,        setValue] = useState(0);

	const API_KEY ='b1fdaa13bc3fcfdccc5f3d96033840ab'

	useEffect(() => { setForecast(false) }, [search])

	const city = search

	const fetchData = ( api, type, save ) => {

		fetch(api)
			.then(res => res.json())
			.then((data) => {
				if (data.cod === '404') {
					setErrors(true)
					setView(true)
				} else {
					if ( type === 'forecast'){ setForecastArr(data) }
					setErrors(false)

			saveData(data, save)

				}
			})
	}

	const getData = () => {

		fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${typeUnit === 'Imperial' ? 'imperial' : 'metric'}&appid=${API_KEY}`, 
			'search', 
			true
		)
		setSearch('')
	}
	
	const unitsGetData = (units) => { 

		if (!view ){
			fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${units}&appid=${API_KEY}`, 
				'search', 
				true
			) 
			setValue(0)
		} 
	}
	
	const forecastGetData = () => {

		fetchData(`http://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&units=${typeUnit === 'Imperial' ? 'imperial' : 'metric'}&appid=${API_KEY}`, 
			'forecast', 
			false
		)
	}

	const saveData = (data, save) => {

		if ( save ) {
			setView(false)
			setTemperature(data.main.temp.toFixed(0))
			setHumidity(data.main.humidity.toFixed(0))
			setFeelslike(data.main.feels_like.toFixed(0))
			setWindSpeed(data.wind.speed.toFixed(0))
			setCurrentCity(data.name)
			setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`)
			setDescriptions(data.weather[0].description)
			setCurrentPlace(`${data.name} ${data.sys.country}` )
		}
	}

	useEffect(() => { setValue(0) }, [search])

	const resultErrors  = <React.Fragment>
					{
						view &&  
							<motion.div 
								initial    ={{ opacity: 0 }}
								animate    ={{ opacity: 1 }}
								transition ={{ duration: 0.6 }}
								className={classes.root}
							>
								<motion.div 
									initial    ={{ scale: 0 , y: -30 }}
									animate    ={{ scale: 1 , y:   0 }}
									transition ={{ duration: 0.2, delay: 0}}
									className={classes.root}
								>
									{ 	
										errors 
											? <h4 className={classes.message} style={{ color:'#F1453D'}} >
												Something went wrong please try again
											  </h4> 
											: <h3 className={classes.message}>Search the city, town or place</h3>}
								</motion.div>
							</motion.div>
					}
				</React.Fragment>

		const resultMain =
				!errors && 
					<React.Fragment>
						
						{
							!view && 
								<MainVue
									icon={icon}
									typeUnit={typeUnit}
									forecast={forecast}
									humidity={humidity}
									windSpeed={windSpeed}
									feelslike={feelslike}
									temperature={temperature}
									currentPlace={currentPlace}
									descriptions={descriptions}
								/>
						}
					</React.Fragment>
	
	return (<div>
			<div className={classes.main}>
				<div className={classes.mainContainer}>
					<div className={classes.header} style={{ position: 'relative', top : !view ? 0 : 60 }}>
							<div className={classes.mainHeaderLeft}></div>
							<div className={classes.mainHeaderCenter}>
							<div className={classes.main_Header_Buttons_cont}>

								<Search
									typeUnit={typeUnit}
									setTypeUnit={setTypeUnit}
									search={search}
									setSearch={setSearch}
									getData={getData}
									setView={setView}
									setForecast={setForecast}
								/>
							</div>
						</div>
						<div className={classes.mainHeaderRight_Switch}>
							<div className={classes.switch}>
								<Switch 

								unitsGetData={unitsGetData}
								view={view}
								currentCity={currentCity}
								API_KEY={API_KEY}
																
								
								
								typeUnit={typeUnit} setTypeUnit={setTypeUnit} setView={setView} setForecast={setForecast}/>
							</div>														
						</div>
					</div>
					<div className={classes.main_Vue}>
					{
						forecast &&
						<Forecast forecastArr={forecastArr} view={view} errors={errors}/>
					}
				          { resultErrors }
						{ resultMain }
					</div>
					<div className={classes.footer}>
						{
							!view &&
								<BottomNav 
								setForecast={setForecast} 
								search={search} 
								value={value}
								setValue={setValue}


								forecastGetData={forecastGetData}
								/>
						}
					</div>
					<div className={classes.separator}/>		
				</div>
			</div>
		</div>
	)
}



export default App



const useStyles = makeStyles((theme) => ({

	main:{
		color:'#FFFFFF',
		display: 'flex',
		fontSize: 'calc(10px + 2vmin)',
		textAlign: 'center',
		width: '100vw',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundSize     : 'cover',
		backgroundRepeat   : 'no-repeat',
		backgroundPosition : 'top center',
	},

	mainContainer: {
		height: `calc(100vh - 40px)`,
		width: `calc(100vw - 40px)`,
	},

	header: {
		height: '16%',
		display: 'flex',
		margin: '20px 0 60px',

		'@media (min-width : 520px)': { 
               margin: '40px 0 50px',
          },
		'@media (min-width : 620px)': { 
               margin: '30px 0 20px',
          },
		'@media (min-width : 720px)': { 
			margin: '20px 0 0px',
		}
	},

	mainHeaderLeft: {
		height: '100%',
		width: '20%',
	},

	mainHeaderCenter: {
		height: '100%',
		display: 'flex',
		alignItems:  'flex-end',
		width: '60%',
		minWidth: 210,
	},

	main_Header_Buttons_cont:{
		width: '100%',
		height: '90%',
	},

	mainHeaderRight_Switch: {
		height: '100%',
		width: '20%',
		display: 'flex',
		alignItems:  'center',
		justifyContent:  'center',
	},
	
	footer: {
		display: 'flex',
		justifyContent:  'center',
	},

	separator:{
		height: 40
	},
	
	app:{
		color:'#FFCA28',
		display: 'flex',
		fontSize: 'calc(10px + 2vmin)',
		textAlign: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	
	title: {
		marginBottom: 50,
		marginTop: 20,
	},

	message:{
		margin: '80px 0 0 -10px'
	}
}))