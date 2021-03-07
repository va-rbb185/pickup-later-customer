import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAbout } from '../actions';

const Footer = () => {
    const dispatch = useDispatch();

    return (
        <div className="footer">
            <div className="about-link">
                <Link to="#about" onClick={() => dispatch(showAbout())}>About us</Link>
            </div>
        </div>
    );
};

export default Footer;
