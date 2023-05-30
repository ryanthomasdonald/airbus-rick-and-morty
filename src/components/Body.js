import React, { useState, useEffect } from "react";
import CharCard from "./CharCard.js"
import LocaCard from "./LocaCard.js"
import EpisCard from "./EpisCard.js"
import "./Body.css";

function Body() {

    const [apiResArr, setApiResArr] = useState([]);
    const [pageMax, setPageMax] = useState(1);
    const [category, setCategory] = useState("character");
    const [characterPage, setCharacterPage] = useState(1);
    const [locationPage, setLocationPage] = useState(1);
    const [episodePage, setEpisodePage] = useState(1);
    const [displayPage, setDisplayPage] = useState(1);
    const [isCharacters, setIsCharacters] = useState(true);
    const [isLocations, setIsLocations] = useState(false);
    const [isEpisodes, setIsEpisodes] = useState(false);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/${category}?page=${displayPage}`)
            .then((response) => response.json())
            .then((data) => {
                setApiResArr(data.results);
                setPageMax(data.info.pages);

                if (category === "character") {
                    setIsCharacters(true);
                    setIsLocations(false);
                    setIsEpisodes(false);
                }
                else if (category === "location") {
                    setIsCharacters(false);
                    setIsLocations(true);
                    setIsEpisodes(false);
                }
                else {
                    setIsCharacters(false);
                    setIsLocations(false);
                    setIsEpisodes(true);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [category, displayPage]);

    function navToCharacters(e) {
        e.preventDefault();
        setDisplayPage(characterPage);
        setCategory("character");
    };

    function navToLocations(e) {
        e.preventDefault();
        setDisplayPage(locationPage);
        setCategory("location");
    };

    function navToEpisodes(e) {
        e.preventDefault();
        setDisplayPage(episodePage);
        setCategory("episode");
    };

    function pageUp(e) {
        e.preventDefault(e);

        if (displayPage >= pageMax) {
            return
        }

        if (category === "character") {
            setCharacterPage(characterPage + 1);
            setDisplayPage(displayPage + 1);
        }
        else if (category === "location") {
            setLocationPage(locationPage + 1);
            setDisplayPage(displayPage + 1);
        }
        else {
            setEpisodePage(episodePage + 1);
            setDisplayPage(displayPage + 1);
        };
    };

    function pageDown(e) {
        e.preventDefault(e);

        if (displayPage <= 1) {
            return
        }

        if (category === "character") {
            setCharacterPage(characterPage - 1);
            setDisplayPage(displayPage - 1);
        }
        else if (category === "location") {
            setLocationPage(locationPage - 1);
            setDisplayPage(displayPage - 1);
        }
        else {
            setEpisodePage(episodePage - 1);
            setDisplayPage(displayPage - 1);
        };
    };

    return (
        <div>
            {/* category buttons */}
            <div className="text-center">
                <button type="button" className="btn topCatButton btn-lg" onClick={e => navToCharacters(e)}>
                    CHARACTERS
                </button>
                <button type="button" className="btn topCatButton btn-lg" onClick={e => navToLocations(e)}>
                    LOCATIONS
                </button>
                <button type="button" className="btn topCatButton btn-lg" onClick={e => navToEpisodes(e)}>
                    EPISODES
                </button>
            </div>

            {/* top prev/next */}
            <div className="text-center">
                <button type="button" className="btn topNavButton btn-lg" onClick={e => pageDown(e)}>
                    PREV
                </button>
                <button type="button" className="btn topNavButton btn-lg" onClick={e => pageUp(e)}>
                    NEXT
                </button>
            </div>

            {/* cards */}
            <div>
                {isCharacters
                ?
                <CharCard data={apiResArr} />
                :
                null}
            </div> 
            <div>
                {isLocations
                ?
                <LocaCard data={apiResArr} />
                :
                null}
            </div> 
            <div>
                {isEpisodes
                ?
                <EpisCard data={apiResArr} />
                :
                null}
            </div>

            {/* bottom prev/next */}
            <div className="text-center">
                <button type="button" className="btn bottomNavButton btn-lg" onClick={e => pageDown(e)}>
                    PREV
                </button>
                <button type="button" className="btn bottomNavButton btn-lg" onClick={e => pageUp(e)}>
                    NEXT
                </button>
            </div>
        </div>
    )
};

export default Body;