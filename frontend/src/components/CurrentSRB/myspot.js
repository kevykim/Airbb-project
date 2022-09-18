import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpots } from "../../store/spots";
function MySpot() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

       useEffect(() => {
         dispatch(getSpots());
       }, [dispatch]);

    const allSpot = useSelector((state) => state.spot);
    const spots = Object.values(allSpot);
    const ownedSpots = spots.filter(spot => spot.ownerId === user.id)
   

    return (
      <div>
        <h1>My Spots</h1>
        <div>
          {ownedSpots.map((spot) => (
            <div key={spot.id}>
                <div><img src={spot.previewImage} alt='test'></img></div>
              <div>{spot.city}</div>
              <div>{spot.state}</div>
              <div>{spot.avgRating}</div>
              <div>{spot.price}</div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default MySpot;