import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import Drawer from "../Drawer";
import Wishlist from "../Wishlist";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header__content">
                    <Link to="/" className="header__content__logo">
                        MYTHERESA
                    </Link>
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        Wishlist
                    </button>
                </div>
            </header>
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right">
                <Wishlist onClose={() => setIsOpen(false)}/>
            </Drawer>
        </>

    );
}

export default Header
