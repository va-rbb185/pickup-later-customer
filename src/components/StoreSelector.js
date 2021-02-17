import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { fetchMenu, showSpinner, hideSpinner } from '../actions';
import { fetchStores } from '../api';

const StoreSelector = ({ hasSelectedStore, fetchMenu, showSpinner, hideSpinner, disabled = false }) => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        showSpinner();
        fetchStores()
            .then(response => setStores(response.stores))
            .catch(error => console.error(error))
            .finally(hideSpinner);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!disabled && !hasSelectedStore) {
        return (
            <div className="store-selector">
                <div className="header">
                    <h3>Hãy lựa chọn một cửa hàng để bắt đầu mua sắm!</h3>
                </div>
                <div className="store-dropdown-menu">
                    <Dropdown
                        placeholder="Chọn cửa hàng"
                        fluid
                        search
                        selection
                        options={stores.map(store => ({
                            key: store.id,
                            value: store.token,
                            text: `${store.name} - ${store.address}`
                        }))}
                        onChange={(e, { value }) => {
                            showSpinner();
                            fetchMenu(value, hideSpinner);
                        }}
                    />
                </div>
            </div>
        );
    }
    return null;
};

const mapStateToProps = ({ storeMenu }) => ({ hasSelectedStore: !!storeMenu.storeId });

const mapDispatchToProps = {
    fetchMenu,
    showSpinner,
    hideSpinner
};

const ConnectedComp = connect(mapStateToProps, mapDispatchToProps)(StoreSelector);

export default ConnectedComp;
