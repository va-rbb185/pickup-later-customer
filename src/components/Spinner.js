import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner = ({ showSpinner }) => {
    if (showSpinner) {
        return (
            <div className="spinner">
                <Dimmer active inverted>
                    <Loader inverted />
                </Dimmer>
            </div>
        );
    }
    return null;
};

const mapStateToProps = ({ showSpinner }) => ({ showSpinner });

const ConnectedSpinner = connect(mapStateToProps)(Spinner);

export default ConnectedSpinner;
