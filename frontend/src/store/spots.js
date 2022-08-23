// TYPES
const createASpot = '/spots/createASpot'
const getAllSpots = '/spots/getAllSpots' //technically READ
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

const editSpot = (spots) => {
    return {
        type: updateASpot,
        spots
    }
}

const deleteSpot = (id) => {
    return {
        type: deleteASpot,
        id
    }
}


// THUNK ACTION CREATORS

export const getSpots = () => async dispatch => {
    const response = await fetch ('/api/spots')

    if (response.ok) {
        const data = await response.json()
        dispatch(allSpots(data.Spots))
        // console.log('data',data.Spots)
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
            // console.log(action.spots)
            action.spots.forEach(spots => {
                newState[spots.id] = spots
            })
            return newState
        case updateASpot:
            const updatedCopy = {...state[action.spots.id]}
            newState[action.spots.id] = updatedCopy
            return newState
        case deleteASpot:
            delete newState[action.id]
            return newState
        default:
        return state
    }
}


export default spotReducer;