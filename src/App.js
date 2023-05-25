import React, { useState, useEffect } from 'react';
import TopLogo from "./components/TopLogo.js"
import NavButtons from "./components/NavButtons.js"
import './App.css';

function App() {

    const [cards, setCards] = useState([]);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character?page=1')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCards(data.results);
                setInfo(data.info.pages);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <TopLogo />
            <NavButtons />
            <div>
                {info}
            </div>
            <div>
                {cards.map((card) => {
                    return (
                        <div key={card.id}>
                            {card.name}
                            <img src={card.image} alt="avatar" />
                        </div>
                    );
                })};
            </div>
            {/* <div className="card">
                <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#!" className="btn btn-primary">Button</a>
                </div>
            </div> */}
        </div>
    );
};

export default App;