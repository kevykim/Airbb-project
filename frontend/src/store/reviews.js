
// TYPES
const createAReview = '/reviews/createAReview'
const readAReview = '/reviews/readAReview'
const deleteAReview = '/reviews/deleteAReview'


// ACTION CREATORS 
const createReview = () => {
    return {
        type: createAReview,
    }
}

const readReview = () => {
    return {
        type:readAReview
    }
}

const deleteReview = (id) => {
    return {
        type: deleteAReview,
        id
    }
}

// THUNK ACTION CREATORS

export const thunkCreateReview = () => async dispatch => {

}

export const thunkReadReview = () => async dispatch => {

}

export const thunkDeleteReview = () => async dispatch => {

}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case createAReview:
            return
        case readAReview:
            return
        case deleteAReview:
            return
        default:
            return state
    }
}

export default reviewReducer;


