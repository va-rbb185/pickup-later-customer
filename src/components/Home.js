import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Menu } from 'semantic-ui-react';
import { loginStatus } from '../enums';

import HomeHeader from './HomeHeader';
import CategoryList from './CategoryList';
import PromoBanner from './PromoBanner';
import HomeCategory from './HomeCategory';
import AccountSidebar from './AccountSidebar';

const Home = ({ allCategories, top3Categories, authentication }) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (visible) {
            document.body.classList.add('unscrollable');
        } else {
            document.body.classList.remove('unscrollable');
        }
    });

    const isLoggedIn = authentication.login.status === loginStatus.LOGGED_IN;

    return (
        <div className="home inner-page">
            <Sidebar.Pushable>
                <Sidebar.Pusher dimmed={visible}>
                    <HomeHeader isLoggedIn={isLoggedIn} showSideBar={() => setVisible(true)} />
                    <PromoBanner />
                    <CategoryList cols={4} isShowTop={false} categories={allCategories} />
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
                            ? <AccountSidebar userData={authentication.user.data} hideSideBar={() => setVisible(false)} />
                            : null
                    }
                </Sidebar>
            </Sidebar.Pushable>
        </div>
    );
};

const mapStateToProps = ({ storeMenu, authentication }) => ({
    allCategories: storeMenu.groups,
    top3Categories: storeMenu.groups.slice(0, 3),
    authentication
});

const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;
