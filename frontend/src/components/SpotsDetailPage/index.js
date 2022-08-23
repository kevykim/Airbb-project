    import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
    import { useParams } from "react-router-dom";
import { getASpot } from "../../store/spots";



const SpotsDetailPage = () => {
     const {id} = useParams()
     console.log('id', id)
     const dispatch = useDispatch()

     const test = useSelector(state => state.spot[id])
     console.log('WHERE IS THE LAMB SAUCE',test)

     useEffect(() => {
        dispatch(getASpot(id))
     }, [dispatch, id])
    return (
        <h1>{test.address}</h1>
    )
}





export default SpotsDetailPage;