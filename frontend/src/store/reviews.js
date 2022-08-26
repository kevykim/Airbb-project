import { csrfFetch } from "./csrf"

// TYPES
const createAReview = '/reviews/createAReview'
const readReview = '/reviews/readAReview'
const deleteAReview = '/reviews/deleteAReview'


// ACTION CREATORS 
const createReview = (review) => {
    return {
        type: createAReview,
        review,
        
    }
}

const readAllReview = (reviews) => {
    return {
        type:readReview,
        reviews
    }
}

const deleteReview = (id) => {
    return {
        type: deleteAReview,
        id
    }
}

// THUNK ACTION CREATORS

export const thunkCreateReview = (payload) => async dispatch => {
    console.log('review create  thunk',payload.spotId)
    const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
        method: 'POST',
        header: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });
    console.log('create payload', response)
    if (response.ok) {
        const data = await response.json()
        dispatch(createReview(data))

    } 
}

export const thunkReadReview = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        dispatch(readAllReview(data))
        // data.Spots??? 
    }
}

export const thunkDeleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        //reviewId??
        method: 'DELETE'
    });
    // console.log('where', Number(id))
    if (response.ok) {
        dispatch(deleteReview(id))
    }

}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case createAReview:
            newState[action.review.id] = action.review
            // console.log(action.review)
            return newState
        case readReview:
            // stale state
            newState = {};
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        case deleteAReview:
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default reviewReducer;


