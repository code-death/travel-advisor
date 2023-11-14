import axios from 'axios'

const key = process.env.REACT_APP_RAPID_API_KEY

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'X-RapidAPI-Key':
            'fe41df5a3cmsh3a4ccb124128485p17955bjsncde95c9edfc8',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
