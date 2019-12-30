import React from "react";

import { Link, BrowserRouter } from "react-router-dom";
import logo from "../../common/log0.png";
import logotext from "../../common/log1.png";

const Logo = () => {
    return (
        <div className="logo">
            <BrowserRouter>
                <Link to="/">
                    <img src={logo} alt={logo} />
                </Link>
            </BrowserRouter>
            <img src={logotext} alt={logotext} />
        </div>
    );
};

export default Logo;
