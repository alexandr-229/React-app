import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css'
import { Card } from '../Card';
import { DailyCards } from '../DayliCards';

export const SingleCity = () => {
    const coord = useLocation().state.coord.coord;
    const lat = coord.lat;
    const lon = coord.lon;
    return(
        <div>
            <div className="SingleCard">
                <Link to="/" className="GoBack">Go back</Link>
                <Card city={useLocation().state.city} link={false} />
                <DailyCards lon={lon} lat={lat} />
            </div>
        </div>
    )
}