import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSpots } from '../../store/spots'

import './SpotsCreatePage.css'



const SpotsCreatePage = ({closeModal}) => {
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
   const [submitted, setSubmitted] = useState(false)
   const [validationErrors, setValidationErrors] = useState([])

   useEffect(() => {
    const errors = [];
    if (!address.length) errors.push('Please enter an address')
    if (!city.length) errors.push('Please enter a city')
    if (!state.length) errors.push('Please enter a state')
    if (!country.length) errors.push('Please enter a country')
    if ((lat % 1 === 0) || (!lat.length)) errors.push('Please enter valid latitude')
    if ((lng % 1 === 0) || (!lng.length)) errors.push('Please enter valid longitude')
    if (!name.length) errors.push('Please enter a name for your spot!')
    if (description.length === 0) errors.push('Please provide description')
    if (description.length > 200) errors.push('Please shorten description')
    if (!price) errors.push("Please add a price");
    if (isNaN(price)) errors.push('Please add an valid price')
    if ((!prevImage.includes("jpg")) && (!prevImage.includes("png")) && (!prevImage.includes('jpeg')))
      errors.push("Please add an preview Image");
    setValidationErrors(errors)
   },[address, city, state, country, lat, lng, name, description, price, prevImage])

   const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(!submitted)
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
        setPrice('')
        setPrevImage('')
        setValidationErrors([])
   }

    return (
      <div className="createspotdiv">
        <div className="createspot_header">
          <button className="closeButton" onClick={() => closeModal(false)}>
            X
          </button>
          <div className="createspot_text">Create Spot</div>
        </div>
        <form className="createspotform" onSubmit={onSubmit}>
          {(validationErrors.length > 0 && submitted === true) && (
            <div>
              <ul className="createspot_error">
                {validationErrors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </ul>
            </div>
          )}
          <div>
            <div>
              <input
                className="createaddress"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createcity"
                type="text"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createstate"
                type="text"
                placeholder="State"
                value={state}
                onChange={(event) => setState(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createcountry"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createlat"
                type="text"
                placeholder="Lat"
                value={lat}
                onChange={(event) => setLat(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createlng"
                type="text"
                placeholder="Lng"
                value={lng}
                onChange={(event) => setLng(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createnameplace"
                type="text"
                placeholder="Name of place"
                value={name}
                onChange={(event) => setName(event.target.value)}

              />
            </div>
            <div>
              <textarea
                className="createdescription"
                type="text-area"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createimg"
                type="text"
                placeholder="www.yourimage.com"
                value={prevImage}
                onChange={(event) => setPrevImage(event.target.value)}

              />
            </div>
            <div>
              <input
                className="createprice"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}

              />
            </div>
          </div>
          <button
            className="createspotbutton"
            type="submit"
            disabled={validationErrors.length > 0 && submitted}
          >
            Create New Spot
          </button>
        </form>
      </div>
    );
}


export default SpotsCreatePage;