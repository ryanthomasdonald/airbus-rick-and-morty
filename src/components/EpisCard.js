import React from "react";
import "./Cards.css"

function EpisCard(apiResArr) {

    const cards = apiResArr.data;

    return (
        <div className="row justify-content-center g-0">
            {cards.map((card) => {

                let airDateColor = "";
                let airDateString = "";
                let episodeColor = "";
                let episodeString = "";

                if (card.air_date === "unknown" || null || "" || undefined || card.air_date.length === 0) {
                    airDateColor = "orange";
                    airDateString = "Unknown";
                }
                else {
                    airDateColor = "white";
                    airDateString = card.air_date;
                };

                if (card.episode === "unknown" || null || "" || undefined || card.episode.length === 0) {
                    episodeColor = "orange";
                    episodeString = "Unknown";
                }
                else {
                    episodeColor = "white";
                    episodeString = card.episode;
                };

                return (
                    <div key={card.id} className="episCard row g-0">
                        <div className="locaInfoCard">
                            <div className="charSpecText">
                                <span style={{color: "lightgray"}}>
                                    Type:&nbsp;
                                </span>
                                <span style={{color: airDateColor}}>
                                    {airDateString}
                                </span>
                            </div>
                            <div className="charStatText">
                                <span style={{color: "lightgray"}}>
                                    Episode:&nbsp;
                                </span>
                                <span style={{color: episodeColor}}>
                                    {episodeString}
                                </span>
                            </div>
                            <div className="charStatText">
                                <span style={{color: "lightgray"}}>
                                    Number of Characters:&nbsp;
                                </span>
                                <span style={{color: "white"}}>
                                    {card.characters.length}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className="cardName">
                                {card.name}
                            </h1>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EpisCard;