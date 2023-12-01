import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './completion.css'

const Completion = () => {
    const [selectedDates, setSelectedDates] = useState({
        startDate: '',
        endDate: '',
    });
    const [totalCost, setTotalCost] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const dates = JSON.parse(localStorage.getItem('selectedDates'));
        const cost = localStorage.getItem('totalCost');
        const userEmail = localStorage.getItem('email');

        if (dates) {
            setSelectedDates({
                startDate: moment(dates.startDate).format('MMMM Do YYYY'),
                endDate: moment(dates.endDate).format('MMMM Do YYYY'),
            });
        }

        if (cost) {
            setTotalCost(cost);
        }
        if (userEmail) {
            setEmail(userEmail);
        }
    }, []);

    return (
        <div className='completion'>
            <h1>Reservation Complete!</h1>
            <p>Your reservation for <strong>{selectedDates.startDate}</strong> to <strong>{selectedDates.endDate}</strong> has been successfully made.</p>
            <p>Total paid: <strong>£{totalCost}</strong>.</p>
            <p>A confirmation email will be sent to your email address: <strong>{email}</strong>.</p>
            <p>Your email will contain all necessary directions and tourism information for your trip. Thank you!</p>
        </div>
    );
};

export default Completion;
