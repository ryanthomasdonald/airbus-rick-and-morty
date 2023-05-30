import React from "react";
import "./Cards.css";

function CharCard(apiResArr) {

    const cards = apiResArr.data;

    return (
        <div className="row justify-content-center g-0">
            {cards.map((card) => {

                let speciesColor = "";
                let speciesString = "";
                let statusColor = "";
                let statusString = "";
                let originColor = "";
                let originString = "";
                let locationColor = "";
                let locationString = "";

                if (card.species === "unknown" || null || "" || undefined || card.species.length === 0) {
                    speciesColor = "orange";
                    speciesString = "Unknown";
                }
                else {
                    speciesColor = "white";
                    speciesString = card.species;
                };

                if (card.status === "Alive") {
                    statusColor = "limegreen";
                    statusString = card.status;
                }
                else if (card.status === "unknown" || null || "" || undefined || card.status.length === 0) {
                    statusColor = "orange";
                    statusString = "Unknown";
                }
                else {
                    statusColor = "red";
                    statusString = card.status;
                };

                if (card.origin.name === "unknown" || null || "" || undefined || card.origin.name.length === 0) {
                    originColor = "orange";
                    originString = "Unknown";
                }
                else {
                    originColor = "white";
                    originString = card.origin.name;
                };

                if (card.location.name === "unknown" || null || "" || undefined || card.location.name.length === 0) {
                    locationColor = "orange";
                    locationString = "Unknown";
                }
                else {
                    locationColor = "white";
                    locationString = card.location.name;
                };

                return (
                    <div key={card.id} className="charCard g-0">
                        <img src={card.image} className="charImg" alt="avatar" />
                        <div className="charInfoCard">
                            <div className="charSpecText">
                                <span style={{color: "lightgray"}}>
                                    Species:&nbsp;
                                </span>
                                <span style={{color: speciesColor}}>
                                    {speciesString}
                                </span>
                            </div>
                            <div className="charStatText">
                                <span style={{color: "lightgray"}}>
                                    Status:&nbsp;
                                </span>
                                <span style={{color: statusColor}}>
                                    {statusString}
                                </span>
                            </div>
                            <div className="charOrigText">
                                <span style={{color: "lightgray"}}>
                                    Origin:&nbsp;
                                </span>
                                <span style={{color: originColor}}>
                                    {originString}
                                </span>
                            </div>
                            <div className="charLocaText">
                                <span style={{color: "lightgray"}}>
                                    Location:&nbsp;
                                </span>
                                <span style={{color: locationColor}}>
                                    {locationString}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className="charCardName">
                                {card.name}
                            </h1>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CharCard;