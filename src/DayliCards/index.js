import React, { useState, useEffect } from 'react';
import { DailyCard } from '../DailyCard';
import { URL } from '../setting';
import '../App.css'

export const DailyCards = ({ lat, lon }) => {
    const [ orderBy, setOrderBy ] = useState('by_date_asc');
    const [ data, setData ] = useState(null);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,current,minutely,hourly&appid=${URL}&units=metric`)
            .then(res => res.json())
            .then(setData)
    }, [])
    if(!data) {
        return null
    }
    const handelOnChange = (e) => {
        setOrderBy(e.target.value);
    }
    const daily = data.daily;
    console.log(daily)

    let sortedCitiesList = daily.sort((a, b) => a.dt - b.dt)
    if(orderBy === 'by_date_desc'){
        sortedCitiesList.reverse()
    }
    return (
        <>
            <select className="Select" onChange={handelOnChange} value={orderBy}>
                <option value='by_date_asc'>By date asc</option>
                <option value='by_date_desc'>By date desc</option>
            </select>
            <div className="DailyCards">
                {
                    daily.map((dayilyCard) => <DailyCard dayilyCard={dayilyCard} key={dayilyCard.dt}/>)
                }
            </div>
        </>
    )
}