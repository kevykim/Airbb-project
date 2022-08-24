import { useState, useEffect } from 'react'


import './SpotsCreatePage.css'



const SpotsCreatePage = () => {
   const [address, setAddress] = useState('') // address 
   const [city, setCity] = useState ('')//city
   const [state, setState] = useState('') // state
   const [country, setCountry] = useState('') // country
    // lat
    // lng
   const [name, setName] = useState('') // name
   const [description, setDescription] = useState('') // description
   const [price, setPrice] = useState(0) // price


    return (
      <div>
        <h1>Create a Spot</h1>
        <form>
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
            {/* <input
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
            /> */}
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
          <button type='submit'>Submit new spot</button>
        </form>
      </div>
    );
}


export default SpotsCreatePage;