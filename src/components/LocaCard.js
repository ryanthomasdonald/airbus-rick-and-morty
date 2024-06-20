import React from "react";
import "./Cards.css";

function LocaCard(apiResArr) {
  const cards = apiResArr.data;

  return (
    <div className="row justify-content-center g-0">
      {cards.map((card) => {
        let typeColor = "";
        let typeString = "";
        let dimensionColor = "";
        let dimensionString = "";

        if (
          card.type === "unknown" ||
          null ||
          "" ||
          undefined ||
          card.type.length === 0
        ) {
          typeColor = "orange";
          typeString = "Unknown";
        } else {
          typeColor = "white";
          typeString = card.type;
        }

        if (
          card.dimension === "unknown" ||
          null ||
          "" ||
          undefined ||
          card.dimension.length === 0
        ) {
          dimensionColor = "orange";
          dimensionString = "Unknown";
        } else {
          dimensionColor = "white";
          dimensionString = card.dimension;
        }

        return (
          <div key={card.id} className="locaCard row g-0">
            <div className="locaInfoCard">
              <div className="charSpecText">
                <span style={{ color: "lightgray" }}>Type:&nbsp;</span>
                <span style={{ color: typeColor }}>{typeString}</span>
              </div>
              <div className="charStatText">
                <span style={{ color: "lightgray" }}>Dimension:&nbsp;</span>
                <span style={{ color: dimensionColor }}>{dimensionString}</span>
              </div>
              <div className="charStatText">
                <span style={{ color: "lightgray" }}>
                  Number of Residents:&nbsp;
                </span>
                <span style={{ color: "white" }}>{card.residents.length}</span>
              </div>
            </div>
            <div>
              <h1 className="cardName">{card.name}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LocaCard;
