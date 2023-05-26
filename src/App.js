import React from 'react';
import TopLogo from "./components/TopLogo.js"
import Body from "./components/Body.js"
import Footer from "./components/Footer.js"
import './App.css';

function App() {

    return (
        <div>
            <TopLogo />
            <Body />
            <Footer />
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