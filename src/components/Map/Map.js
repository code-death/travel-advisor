import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Rating from '@mui/material/Rating'
import useStyles from './styles'
import mapStyles from '../../mapStyles'

const Map = props => {
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDTjX12pXPtTNLcrTyJaueAnndkBLYobQo' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={props.coordinates}
        defaultZoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={e => {
          props.setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={child => props.setChildClicked(child)}
      >
        {props.places?.map((place, i) => {
          return (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {isMobile ? (
                <LocationOnOutlinedIcon color='primary' fontSize='large' />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    noWrap
                    className={classes.typography}
                    variant='subtitle2'
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                    }
                    alt={place.name}
                  />
                  <Rating
                    name='read-only'
                    value={Number(place.rating)}
                    readOnly
                    precision={0.5}
                  />
                </Paper>
              )}
            </div>
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

export default Map
