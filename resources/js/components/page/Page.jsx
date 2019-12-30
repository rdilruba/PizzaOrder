import React from "react";

import "./page.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Page = props => {
    const { children } = props;

    return (
        <div className="root-container">
            <Navbar />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default Page;
