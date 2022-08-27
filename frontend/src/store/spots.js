import { csrfFetch } from "./csrf"

// TYPES
const createASpot = '/spots/createASpot'
const getAllSpots = '/spots/getAllSpots' //technically READ
const getOneSpot = '/spots/getOneSpot'
const updateASpot = '/spots/updateASpot'
const deleteASpot = '/spots/deleteASpot'


// ACTION CREATORS
const createSpot = (spots) => {
    return {
        type: createASpot,
        spots
    }
}

const allSpots = (spots) => {
    return {
        type: getAllSpots,
        spots
    }
}

const oneSpot = (spot) => {
    return {
        type: getOneSpot,
        spot,

    }
}

const editSpot = (spot) => {
    return {
        type: updateASpot,
        spot
    }
}

const deleteSpot = (id) => {
    return {
        type: deleteASpot,
        id
    }
}


// THUNK ACTION CREATORS
export const createSpots = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        header: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        let dataImage = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify({url: payload.prevImage, previewImage: true})
        })
        if (dataImage.ok) {
            let workingImage = dataImage.json()
            data.previewImage = workingImage.url
            dispatch(createSpot(data))
            return data
        }
    } 
}

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json()
        dispatch(allSpots(data.Spots))
        // console.log('data',data.Spots)
    }
}

export const getASpot = (id) => async dispatch => {
    // console.log('thunk', id)
    const response = await csrfFetch(`/api/spots/${id}`)
    // console.log('Thunk', response)
    const data = await response.json()
    dispatch(oneSpot(data))
}

export const editSpots = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        header: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(editSpot(data))
      return data  
    }
}

export const deleteSpots = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const removal = await response.json()
        dispatch(deleteSpot(id))
        // return removal
    }
}


const initalState = {}

const spotReducer = (state = initalState, action) => {
    let newState = {...state}
    switch (action.type) {
        case createASpot:
            newState[action.spots.id] = action.spots
            return newState
        case getAllSpots:
             newState = {}
            action.spots.forEach(spots => {
                newState[spots.id] = spots
            })
            return newState
        case getOneSpot:
            newState = {}
            newState[action.spot.id] = action.spot
            // console.log('where', action.spot)
            return newState
        case updateASpot:
            // const updatedCopy = {...state[action.spot.id]}
            newState[action.spot.id] = action.spot
            return newState
        case deleteASpot:
            delete newState[action.id]
            //console.log(newState)
            //console.log(action)
            return newState
        default:
        return state
    }
}


export default spotReducer;