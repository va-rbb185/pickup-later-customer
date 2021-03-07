import React from 'react';
import { connect } from 'react-redux';
import { hideAbout } from '../actions';

const About = ({ aboutShown, hideAbout }) => {
    if (aboutShown) {
        return (
            <div id="about" className="about">
                <div className="app-info">
                    <img className="app-logo" src="https://dl.dropboxusercontent.com/s/8ejf6swokdb030j/app_logo.png" alt="Pickup Later logo" />
                    <h2 className="app-name">Pickup Later</h2>
                </div>
                <div className="authors">
                    <h4>Tác giả:</h4>
                    <p>- Tăng Hoàng Ân (16520020)</p>
                    <p>- Đậu Đức Việt Anh (16520029)</p>
                </div>
                <div className="contact">
                    <h4>Liên hệ để đưa cửa hàng lên hệ thống:</h4>
                    <p>- Email: <b>anhddv98@gmail.com</b></p>
                    <p>- Số điện thoại (Zalo): <b>0352305969</b></p>
                </div>

                <div className="close" onClick={hideAbout}>
                    <span>&times;</span>
                </div>
            </div>
        );
    }
    return null;
};

const mapStateToProps = ({ aboutShown }) => ({ aboutShown });
const mapDispatchToProps = { hideAbout };
const ConnectedAbout = connect(mapStateToProps, mapDispatchToProps)(About);

export default ConnectedAbout;
