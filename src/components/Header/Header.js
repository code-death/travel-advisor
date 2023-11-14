import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import useStyles from './styles'
import { useState } from 'react'

const Header = props => {
  const classes = useStyles()
  const [autocomplete, setAutocomplete] = useState(null)

  const onLoad = autoC => setAutocomplete(autoC)
  const onPlaceChange = () => {
    const lat = autocomplete.getPlace().geometry.loaction.lat()
    const lng = autocomplete.getPlace().geometry.loaction.lng()

    props.setCoordinates({ lat, lng })
  }

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore new Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
