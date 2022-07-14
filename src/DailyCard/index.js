import React, { useEffect, useState } from 'react';
import { URL } from '../setting';
import '../App.css'

export const DailyCard = ({ dayilyCard }) => {
    const { dt } = dayilyCard
    const temp = dayilyCard.temp.day;
    const description = dayilyCard.weather[0].description;
    const icon = dayilyCard.weather[0].icon;
    const date = new Date(dt * 1000)
    return(
        <div>
            <div className="DailyCard">
                <p>{date.toString().split(' ')[0]}</p>
                <img className="Icon" alt="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                <p className="TemperatureIcon">{temp.toFixed()}</p>
                <p>{description}</p>
            </div>
        </div>
    )
}