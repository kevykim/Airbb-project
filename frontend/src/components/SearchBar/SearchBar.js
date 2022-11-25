import { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from "../../store/spots";


import './SearchBar.css'



function SearchBar() {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spot)
    const spotsArr = Object.values(spots)

    const [searchWord, setSearchWord] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const results = (word) => {
       let arr = []
       spotsArr.forEach((spot, i) => {
        if (
            spot['city'].toLowerCase().includes(word.toLowerCase())) {
                arr.push(spot)
            }
        })
        return arr


    /*
    const array = spotsArr.map((spot, i) => {
        if (spot[i].city.toLowerCase().includes(word.toLowerCase())) {
            return;
        }
    })
    */
    };

    useEffect(() => {
        dispatch(getSpots())
    },[dispatch])

    useEffect(() => {
      if (searchWord?.length) {
        setShowDropdown(true);
        setSearchResult(results(searchWord));
      } else {
        setShowDropdown(false);
        setSearchResult([]);
      }
    }, [searchWord]);



    return (
      <>
        <div className="searchbar_main">
          <input
            type="text"
            className="searchbar_input"
            placeholder="Anywhere | Any week | Add guests"
            onChange={(e) => setSearchWord(e.target.value)}
            value={searchWord}
          />
          <div type="submit" className="searchbar_magnify">
            <i className="fa-solid fa-magnifying-glass fa-md "></i>
          </div>
        </div>

        {showDropdown && searchResult?.length > 0 && (
          <div className="searchbar_dropmenu">
            {searchResult.map((spot) => (
              <NavLink
                to={`/spots/${spot.id}`}
                className="searchbar_dropmenu_navlink"
                onClick={() => setSearchWord("")}
              >
                <div className="searchbar_dropmenu_inner">
                  <div className="searchbar_dropmenu_text">
                    {`${spot['city']}, ${spot['country']}`}
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}

        {showDropdown && !searchResult?.length && (
          <div className="searchbar_dropmenu">
            <div className="searchbar_nosearchfound">
              No results found for : <span className="searchbar_nosearchspan">{searchWord}</span>
            </div>
          </div>
        )}
      </>
    );
}

export default SearchBar;