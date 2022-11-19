import { csrfFetch } from "./csrf";

// TYPES
const createBooking = '/bookings/createBooking'
const getAllSpotsBooking = '/bookings/getAllSpotsBooking'
const getCurrentBooking = '/bookings/getCurrentBooking'
const updateBooking = '/bookings/updateBooking'
const deleteBooking = '/bookings/deleteBooking'


// ACTION CREATORS
const actionCreateBooking = (booking) => {
    return {
        type: createBooking,
        booking
    }
}

const actionGetAllSpotsBooking = (bookings) => {
    return {
        type: getAllSpotsBooking,
        bookings
    }
}

const actionGetCurrentBooking = (bookings) => {
    return {
        type: getCurrentBooking,
        bookings
    }
}

const actionUpdateBooking = (booking) => {
    return {
        type: updateBooking,
        booking
    }
}

const actionDeleteBooking = (id) => {
    return {
        type: deleteBooking,
        id
    }
}




// THUNKS

export const thunkCreateBooking = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateBooking(data))
        return data
    }
}

export const thunkGetAllSpotsBooking = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllSpotsBooking(data))
    }
}

export const thunkGetCurrentBooking = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetCurrentBooking(data))
    }
}

export const thunkUpdateBooking = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${payload.bookingId}`, {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateBooking(data))
        return data
    }
}

export const thunkDeleteBooking = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionDeleteBooking(id))
    }
}




const initialState = {}

const bookingReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case createBooking:
            newState[action.booking.id] = action.booking
            return newState
        case getAllSpotsBooking:
            newState = {};
            action.bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState
        case getCurrentBooking:
            newState = {};
            action.bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState
        case updateBooking:
            newState[action.booking.id] = action.booking
            return newState
        case deleteBooking:
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default bookingReducer