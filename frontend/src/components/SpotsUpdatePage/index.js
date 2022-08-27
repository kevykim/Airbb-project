import { useState, useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { editSpots, getASpot } from '../../store/spots'


import './SpotsUpdatePage.css'


const SpotsUpdatePage = ({spot, onClick}) => {
    // const {id} = useParams()
    // const spot = useSelector(state => state.spot[id])
      const history = useHistory()
   const dispatch = useDispatch()

  // console.log('this',spot)

//    const spot = useSelector(state => state.spot)
    // console.log('updatepage',spot)

   const [address, setAddress] = useState(spot.address) // address 
   const [city, setCity] = useState (spot.city)//city
   const [state, setState] = useState(spot.state) // state
   const [country, setCountry] = useState(spot.country) // country
   const [lat, setLat] = useState(spot.lat) // lat
   const [lng, setLng] = useState(spot.lng) // lng
   const [name, setName] = useState(spot.name) // name
   const [description, setDescription] = useState(spot.description) // description
   const [previewImage, setPreviewImage] = useState(spot.previewImage)
   const [price, setPrice] = useState(spot.price) // price
   const [validationErrors, setValidationErrors] = useState([])

   useEffect(() => {
    const errors = [];
    if (!address.length) errors.push('Please enter an address')
    if (!city.length) errors.push('Please enter a city')
    if (!state.length) errors.push('Please enter a state')
    if (!country.length) errors.push('Please enter a country')
    if (!lat.length) errors.push('Please enter valid latitude')
    if (!lng.length) errors.push('Please enter valid longitude')
    if (!name.length) errors.push('Please enter a name for your spot!')
    if (description.length > 200) errors.push('Please shorten description')
    if (!price.length) errors.push('Please add an valid price')
    setValidationErrors(errors)
   },[address, city, state, country, lat, lng, name, description, price])

   const onSubmit = async (event) => {
    event.preventDefault()



        const payload = {
            id: spot.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }

        
        let updatedSpot = await dispatch(editSpots(payload)) 
        
        await dispatch(getASpot(payload.id))

        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
            onClick()
        }

        // setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setLat('')
        setLng('')
        setName('')
        setDescription('')
        setPreviewImage(spot.Images[0].url);
        setPrice('')
        setValidationErrors([])
   }

    return (
      <div>
        {validationErrors.length > 0 && (
          <div>
            The following errors were found:
            <ul>
              {validationErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div>
            <div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(event) => setState(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="Lat"
              value={lat}
              onChange={(event) => setLat(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="Lng"
              value={lng}
              onChange={(event) => setLng(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="Name of place"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            </div>
            <div>
            <textarea
              type="text-area"
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
            </div>
            <div>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
            </div>
          </div>
          <button type="submit"
            disabled={validationErrors.length > 0}
          >Update Spot</button>
        </form>
      </div>
    );
}

export default SpotsUpdatePage;