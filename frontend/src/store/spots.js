// TYPES
const createASpot = '/spots/createASpot'
const getAllSpots = '/spots/getAllSpots' //technically READ
const updateASpot = '/spots/updateASpot'
const deleteASpot = '/spots/deleteASpot'


// ACTION CREATORS
const allSpots = (spots) => {
    return {
        type: getAllSpots,
        spots
    }
}

// THUNK ACTION CREATORS

export const getSpots = () => async dispatch => {
    const response = await fetch ('/api/spots')

    if (response.ok) {
        const data = await response.json()
        dispatch(allSpots(data.Spots))
        console.log('data',data.Spots)
    }
}


const initalState = {}

const spotReducer = (state = initalState, action) => {
    let newState = {...state}
    switch (action.type) {
        case getAllSpots:
            // console.log(action.spots)
            action.spots.forEach(spots => {
                newState[spots.id] = spots
            })
            return newState
        default:
        return state
    }
}


export default spotReducer;