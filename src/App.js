import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { CssBaseline, Grid, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { getPlacesData, getWeatherData } from './api/api'
import { useEffect, useState } from 'react'

const theme = createTheme()

function App() {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [places, setPlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIslLoading] = useState(false)
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [bounds, setBounds] = useState({})
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(() => {
    const filteredPlaces = places.filter(place => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIslLoading(true)

      getPlacesData(type, bounds.sw, bounds.ne).then(data => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIslLoading(false)
      })
    }
  }, [type, bounds])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={filteredPlaces.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
