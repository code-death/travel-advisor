import {
  CircularProgress,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material'
import useStyles from './styles'
import { useState, useEffect } from 'react'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import { createRef } from 'react'

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setRating,
  setType,
}) => {
  const [elRefs, setElRefs] = useState([])

  const classes = useStyles()

  useEffect(() => {
    setElRefs(refs =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    )
  }, [places])

  return (
    <div className={classes.container}>
      <Typography variant='h4' mb={3}>
        Restraunts, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>
      ) : (
        <>
          <FormControl
            variant='standard'
            sx={{ m: 1, mb: 2, minWidth: 120 }}
            size='small'
          >
            <InputLabel id='location'>Type</InputLabel>
            <Select
              labelId='location'
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant='standard'
            sx={{ m: 1, mb: 3, minWidth: 120 }}
            size='small'
          >
            <InputLabel id='rating'>Rating</InputLabel>
            <Select
              labelId='rating'
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default List
