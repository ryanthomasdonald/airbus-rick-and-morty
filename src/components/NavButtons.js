import React from "react";
import "./NavButtons.css";

function NavButtons() {
    return (
        <div className="text-center">
            <button type="button" className="btn navButton btn-lg">
                CHARACTERS
            </button>
            <button type="button" className="btn navButton btn-lg">
                LOCATIONS
            </button>
            <button type="button" className="btn navButton btn-lg">
                EPISODES
            </button>
        </div>
    );
};

export default NavButtons;