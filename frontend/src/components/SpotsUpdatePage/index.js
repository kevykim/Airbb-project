import { useState, useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { editSpots, getASpot } from '../../store/spots'


import './SpotsUpdatePage.css'


const SpotsUpdatePage = ({spot, closeModal}) => {
    // const {id} = useParams()
    // const spot = useSelector(state => state.spot[id])
      const history = useHistory()
   const dispatch = useDispatch()

   const [address, setAddress] = useState(spot.address) // address 
   const [city, setCity] = useState (spot.city)//city
   const [state, setState] = useState(spot.state) // state
   const [country, setCountry] = useState(spot.country) // country
   const [lat, setLat] = useState(spot.lat) // lat
   const [lng, setLng] = useState(spot.lng) // lng
   const [name, setName] = useState(spot.name) // name
   const [description, setDescription] = useState(spot.description) // description
   const [prevImage, setPrevImage] = useState(spot.previewImage);
   const [price, setPrice] = useState(spot.price) // price
   const [submitted, setSubmitted] = useState(false)
   const [validationErrors, setValidationErrors] = useState([])

   useEffect(() => {
    const errors = [];
    if (!address.length) errors.push('Please enter an address')
    if (!city.length) errors.push('Please enter a city')
    if (!state.length) errors.push('Please enter a state')
    if (!country.length) errors.push('Please enter a country')
    if ((lat.length === 0) || (lat % 1 === 0 )) errors.push('Please enter valid latitude')
    if (lng.length === 0 || lng % 1 === 0 ) errors.push('Please enter valid longitude')
    if (!name.length) errors.push('Please enter a name for your spot!')
    if (description.length === 0) errors.push("Please provide description");
    if (description.length > 200) errors.push('Please shorten description')
    if (price.length === 0) errors.push('Please add a price')
    if (isNaN(price)) errors.push("Please add an valid price");
    if ((!prevImage.includes("jpg")) && (!prevImage.includes("png")) && (!prevImage.includes('jpeg')))
      errors.push("Please add an preview Image");

    
    setValidationErrors(errors)
   },[address, city, state, country, lat, lng, name, description, price, prevImage])

   const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(!submitted)



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
            previewImage:prevImage
        }

        
        let updatedSpot = await dispatch(editSpots(payload)) 
        
        await dispatch(getASpot(payload.id))

        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
            closeModal(false)
        }

        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setLat('')
        setLng('')
        setName('')
        setDescription('')
        setPrevImage('');
        setPrice('')
        setPrevImage("");
        setValidationErrors([])
   }

    return (
      <div className="updatespotdiv">
        <div className="updatespot_header">
          <button className="closeButton" onClick={() => closeModal(false)}>
            X
          </button>
          <div className="updatespot_text">Edit spot</div>
        </div>

        <form className="updatespotform" onSubmit={onSubmit}>
          <div>
            <div>
              <input
                className="updateaddress"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updatecity"
                type="text"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updatestate"
                type="text"
                placeholder="State"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updatecountry"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updatelat"
                type="text"
                placeholder="Lat"
                value={lat}
                onChange={(event) => setLat(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updatelng"
                type="text"
                placeholder="Lng"
                value={lng}
                onChange={(event) => setLng(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updateplacename"
                type="text"
                placeholder="Name of place"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <textarea
                className="updatedescription"
                type="text-area"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updateimg"
                type="text"
                placeholder="www.yourimage.com"
                value={prevImage}
                onChange={(event) => setPrevImage(event.target.value)}
              />
            </div>
            <div>
              <input
                className="updateprice"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          {validationErrors.length > 0 && submitted === true && (
            <div className="updatespot_error">
              <div>
                {validationErrors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            </div>
          )}
          <button
            className="updatespotbutton"
            type="submit"
            disabled={validationErrors.length > 0 && submitted}
          >
            Edit Spot
          </button>
        </form>
      </div>
    );
}

export default SpotsUpdatePage;