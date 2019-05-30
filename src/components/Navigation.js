import React from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from '../constants/routes';
import '../styles/Navigation.css';


const Navigation = () => {
    return (
        <nav>
            <div>
            <Link to={ROUTES.CARDVIEW} style={{textUnderline: 'none'}}>
                <button className="headerButton">
                    Card View
                </button>
            </Link>
            <Link to={ROUTES.LISTVIEW}>
                <button className="headerButton">
                    List View
                </button>
            </Link>
            </div>
        </nav>
    );
};

export default Navigation;
