import { useState, useEffect } from 'react';

/* A hook that helps get user's location */
const useGeolocation = () => {
    const [location, setLocation] = useState({ lat: '', lng: '' });

    const onSuccess = ({ coords }) => {
        setLocation({
            lat: coords.latitude,
            lng: coords.longitude
        });
    };

    const onError = err => console.error('An error occurred while trying to get your geolocation.', err);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            console.warn('Geolocation is not supported on this device/browser.');
        }
    }, []);

    return location;
};

export default useGeolocation;
