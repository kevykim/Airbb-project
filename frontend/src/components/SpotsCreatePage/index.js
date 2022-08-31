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
   const [prevImage, setPrevImage] = useState('')
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
    if (!prevImage.length) errors.push('Please add an preview Image')
    setValidationErrors(errors)
   },[address, city, state, country, lat, lng, name, description, price, prevImage])

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
            price,
            previewImage:prevImage
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
        setPrevImage('')
        setValidationErrors([])
   }

    return (
      <div className="createspotform">
        <h1>Create a Spot</h1>
        {validationErrors.length > 0 && (
          <div>
            <ul className="errorvalidationupdate">
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
                className="createaddress"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>
            <div>
              <input
              className='createcity'
                type="text"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createstate'
                type="text"
                placeholder="State"
                value={state}
                onChange={(event) => setState(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createcountry'
                type="text"
                placeholder="Country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createlat'
                type="text"
                placeholder="Lat"
                value={lat}
                onChange={(event) => setLat(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createlng'
                type="text"
                placeholder="Lng"
                value={lng}
                onChange={(event) => setLng(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createnameplace'
                type="text"
                placeholder="Name of place"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                className='createdescription'
                type="text-area"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createimg'
                type="text"
                placeholder="www.yourimage.com"
                value={prevImage}
                onChange={(event) => setPrevImage(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                className='createprice'
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
          </div>
          <button className='createspotbutton' type="submit" disabled={validationErrors.length > 0}>
            Submit New Spot
          </button>
        </form>
      </div>
    );
}


export default SpotsCreatePage;