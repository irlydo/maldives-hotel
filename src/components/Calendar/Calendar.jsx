import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './Calendar.css';

const Calendar = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(moment());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [blackoutDates, setBlackoutDates] = useState(() => {
        const saved = localStorage.getItem("blackoutDates");
        return saved ? JSON.parse(saved) : [];
    });
    const today = moment();
    const weekdayshort = moment.weekdaysShort();

    const reservedDates = JSON.parse(localStorage.getItem("reservedDates")) || [];

    const isDayReserved = (day) => {
        return reservedDates.some(range => 
            day.isSameOrAfter(moment(range.startDate)) && 
            day.isSameOrBefore(moment(range.endDate))
        );
    };


    const handleDayClick = (day) => {
        if (startDate && day.isBefore(startDate, 'day') || endDate) {
            setStartDate(day);
            setEndDate(null);
        } else if (!startDate) {
            setStartDate(day);
        } else if (startDate && !endDate && day.isAfter(startDate, 'day')) {
            setEndDate(day);
        }
    };

    useEffect(() => {
        localStorage.setItem("blackoutDates", JSON.stringify(blackoutDates));
    }, [blackoutDates]);

    const handleReserveClick = () => {
        if (!startDate || !endDate) {
            setErrorMessage("Please select a date range");
            return;
        }
        setErrorMessage("");

        localStorage.setItem("selectedDates", JSON.stringify({ startDate, endDate }));

        setBlackoutDates([...blackoutDates, { start: startDate, end: endDate }]);

        navigate('/checkout');
    };

    const firstDayOfMonth = () => {
        let firstDay = moment(currentDate).startOf("month").format("d");
        return firstDay;
    };

    const month = () => {
        return currentDate.format("MMMM YYYY");
    };

    const onPrev = () => {
        setCurrentDate(prev => moment(prev).subtract(1, "month"));
    };

    const onNext = () => {
        setCurrentDate(prev => moment(prev).add(1, "month"));
    };

    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(
            <td key={`blank-${i}`} className="calendar-day empty">{""}</td>
        );
    }

    const getPriceForDay = (day) => {
        return (day.day() === 0 || day.day() === 6) ? "£620" : "£480";
    };

    const calculateTotalCost = () => {
        let totalCost = 0;
        let dateCursor = startDate;

        while (dateCursor && endDate && dateCursor.isSameOrBefore(endDate, 'day')) {
            totalCost += parseInt(getPriceForDay(dateCursor).substring(1));
            dateCursor = dateCursor.clone().add(1, 'days');
        }

        return totalCost.toLocaleString('en-GB');
    };

    let daysInMonth = [];
    for (let d = 1; d <= currentDate.daysInMonth(); d++) {
        let day = currentDate.clone().date(d);
        let className = "calendar-day";
        let price = getPriceForDay(day);

         if (isDayReserved(day)) {
            className += " reserved-day";
        }
        
        if (day.isBefore(today, 'day')) {
            className += " past-day";
        } else if (day.isSame(startDate, 'day')) {
            className += " start-day";
        } else if (endDate && day.isBetween(startDate, endDate, 'day')) {
            className += " between-day";
        } else if (day.isSame(endDate, 'day')) {
            className += " end-day";
        }

        daysInMonth.push(
            <td key={`day-${d}`} className={className} onClick={() => handleDayClick(day)}>
                <div>{d}</div>
                <div className="price-info">{price}</div>
            </td>
        );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            let insertRow = cells.slice();
            rows.push(insertRow);
            cells = [];
            cells.push(row);
        }
        if (i === totalSlots.length - 1) {
            let insertRow = cells.slice();
            rows.push(insertRow);
        }
    });

    let daysOfWeek = weekdayshort.map(day => {
        return (
            <th key={day} className="week-day">
                {day}
            </th>
        );
    });

    let calendarDays = rows.map((d, i) => {
        return <tr key={`row-${i}`}>{d}</tr>;
    });

    return (
        <>
        <h1 className='book-now'>Book now</h1>
        <div className="calendar-container">
            <div className="calendar-header">
                <span className="arrow" onClick={onPrev}>&lt;</span>
                <span className="month-year">{month()}</span>
                <span className="arrow" onClick={onNext}>&gt;</span>
            </div>
            <table className="calendar">
                <thead>
                    <tr>{daysOfWeek}</tr>
                </thead>
                <tbody>{calendarDays}</tbody>
            </table>
            <div className="total-cost">
                {startDate && endDate ? `Total: £${calculateTotalCost()}` : 'Select a date range'}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button className="reserve-button" onClick={handleReserveClick}>
                Reserve
            </button>
        </div>
        </>
    );
};

export default Calendar;
