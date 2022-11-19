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






const initialState = {}

const bookingReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        default:
            return state
    }
}

export default bookingReducer