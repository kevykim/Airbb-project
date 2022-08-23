    import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
    import { useParams } from "react-router-dom";
import { getASpot } from "../../store/spots";



const SpotsDetailPage = () => {
     const {id} = useParams()
     console.log('id', id)
     const dispatch = useDispatch()

    // const test2 = useSelector(state => state.spot[id].Images)
    // const image = test2.map((image) => (
    //   <img src={image.url} alt="House test" width="250" height="250"></img>
    // ));
    // console.log('WHERE ARE YOU', test2)


     const test = useSelector(state => state.spot[id])
     console.log('WHO ARE YOU',test)

     useEffect(() => {
        dispatch(getASpot(id))
     }, [dispatch, id])
    return (
      <>
        <div>{test.name}</div>
        <div>{test.avgStarRating}</div>
        {/* A NAV LINK TO REVIEWS FOR THAT SPOT */}
        <div>{`${test.city}, ${test.state}, ${test.country}`}</div>

         <div>
          {/* <img src={test.Images[0].url} alt="House test" width="250" height="250"></img> */}
          {/* {image} */}
        </div> 

        <div>{test.description}</div>

        <div>{test.avgStarRating}</div>
        {/* SHOW ALL REVIEWS BUTTON */}
      </>
    );
}





export default SpotsDetailPage;