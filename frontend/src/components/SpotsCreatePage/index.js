import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSpots } from '../../store/spots'

import './SpotsCreatePage.css'



const SpotsCreatePage = () => {
   const history = useHistory()
   const dispatch = useDispatch()

//    const spot = useSelector(state => state.spot)


   const [address, setAddress] = useState('') // address 
   const [city, setCity] = useState ('')//city
   const [state, setState] = useState('') // state
   const [country, setCountry] = useState('') // country
   const [lat, setLat] = useState() // lat
   const [lng, setLng] = useState() // lng
   const [name, setName] = useState('') // name
   const [description, setDescription] = useState('') // description
   const [price, setPrice] = useState() // price
   const [validationErrors, setValidationErrors] = useState([])

   useEffect(() => {
    const errors = [];
    if (!address.length) errors.push('Please enter an address')
    if (!city.length) errors.push('Please enter a city')
    if (!state.length) errors.push('Please enter a state')
    if (!country.length) errors.push('Please enter a country')
    if (lat % 1 !== 0 || !lat.length) errors.push('Please enter valid latitude')
    if (lng % 1 !== 0 || !lng.length) errors.push('Please enter valid longitude')
    if (!name.length) errors.push('Please enter a name for your spot!')
    if (description.length > 200) errors.push('Please shorten description')
    if (isNaN(price)) errors.push('Please add an valid price')
    setValidationErrors(errors)
   },[address, city, state, country, lat, lng, name, description, price])

   const onSubmit = async (event) => {
    event.preventDefault()



        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        
        let createdSpot = await dispatch(createSpots(payload)) 
        
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }

        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setLat('')
        setLng('')
        setName('')
        setDescription('')
        setPrice('')
        setValidationErrors([])
   }

    return (
      <div>
        <h1>Create a Spot</h1>
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
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(event) => setState(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Lat"
              value={lat}
              onChange={(event) => setLat(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Lng"
              value={lng}
              onChange={(event) => setLng(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Name of place"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <textarea
              type="text-area"
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
          <button type="submit"
            disabled={validationErrors.length > 0}
          >Submit new spot</button>
        </form>
      </div>
    );
}


export default SpotsCreatePage;