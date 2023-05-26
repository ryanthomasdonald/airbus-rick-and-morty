import React from "react";

function LocaCard(apiResArr) {

    const cards = apiResArr.data;

    return (
        cards.map((card) => {
            return (
                <div key={card.id}>
                    {card.name}
                </div>
            );
        })
    );
};

export default LocaCard;