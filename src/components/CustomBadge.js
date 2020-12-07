import React from 'react';

const CustomBadge = ({ text, backgroundColor }) => {
    return (
        <div className="custom-badge" style={{ backgroundColor }}>
            {text}
        </div>
    );
};

export default CustomBadge;
