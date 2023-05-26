import React from "react";

function CharCard(apiResArr) {

    const cards = apiResArr.data;

    return (
        cards.map((card) => {
            return (
                <div key={card.id}>
                    {card.name}
                    {/* <img src={card.image} alt="avatar" /> */}
                </div>
            );
        })
    );
};

export default CharCard;