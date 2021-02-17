import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const CustomModal = ({ open, header, confirmation, noActions, children, onOpen, onClose, onConfirm }) => {
    return (
        <Modal
            closeIcon={true}
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            className="custom-modal"
        >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
            {!noActions
                ? <Modal.Actions>
                    <Button
                        content={confirmation}
                        labelPosition="right"
                        icon="checkmark"
                        onClick={onConfirm}
                        positive
                    />
                </Modal.Actions>
                : null
            }
        </Modal>
    );
};

export default CustomModal;
