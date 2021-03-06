import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Menu } from 'semantic-ui-react';
import { LoginStatus } from '../enums';

import HomeHeader from './HomeHeader';
import CategoryList from './CategoryList';
import HomeCategory from './HomeCategory';
import AccountSidebar from './AccountSidebar';

const Home = ({ allCategories, top3Categories, isLoggedIn, userData }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (visible) {
            document.body.classList.add('unscrollable');
        } else {
            document.body.classList.remove('unscrollable');
        }
        return () => {
            document.body.classList.remove('unscrollable');
        };
    }, [visible]);

    return (
        <div className="home inner-page">
            <Sidebar.Pushable>
                <Sidebar.Pusher dimmed={visible}>
                    <HomeHeader isLoggedIn={isLoggedIn} showSideBar={() => setVisible(true)} />
                    <CategoryList cols={4} categories={allCategories} />
                    <div className="home-categories">
                        {top3Categories.map(
                            homeCategory => <HomeCategory key={`homeCat_${homeCategory.id}`} category={homeCategory} />
                        )}
                    </div>
                </Sidebar.Pusher>
                <Sidebar
                    as={Menu}
                    vertical
                    direction="right"
                    animation="overlay"
                    visible={visible}
                    onHide={() => setVisible(false)}
                >
                    {
                        isLoggedIn
                            ? <AccountSidebar userData={userData} hideSideBar={() => setVisible(false)} />
                            : null
                    }
                </Sidebar>
            </Sidebar.Pushable>
        </div>
    );
};

const mapStateToProps = ({ storeMenu, authentication }) => {
    const allCategories = storeMenu.groups;
    const isLoggedIn = authentication.login.status === LoginStatus.LOGGED_IN;

    return {
        allCategories,
        top3Categories: allCategories.slice(0, 3),
        isLoggedIn,
        userData: isLoggedIn ? authentication.user.data : null
    };
};

const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;
