import React, { memo, useContext, useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import { URL } from "../setting";
import '../App.css';

export const Card = memo(({ city, link }) => {
    const navigate = useNavigate(null)
    const { dispatch } = useContext(GlobalContext);

    const [ data, setData ] = useState();
   
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${URL}&units=metric`)
        .then(res => res.json())
        .then(setData);
    }, []);

    const handelOnDelete = () => {
        dispatch({
            type: 'DELETE_CITY',
            payload: city
        })
    }

    const handelOnEdit = () => {
        dispatch({
            type: 'EDIT_CITY',
            payload: city
        })
    } 

    const parms = {
        city: city,
        coord: data
    }

    const handelOnClick = () => {
        navigate(`/city/${city}`, {state: parms})
    }

    const handelOnBack = () => {
        navigate('/home')
    }
    if(!data) {
        return null
    } else{
        try {
            const { name, main, weather } = data;
            const { feels_like, temp, humidity } = main;
            const { icon, description } = weather[0];
            return(
                <div>
                    {
                        link
                        ?
                        <div onClick={handelOnClick} className="Card">
                            <div className="ActionButtonWrap">
                                <button className="ActionButton" onClick={handelOnEdit}>edit</button>
                                <button className="ActionButton" onClick={handelOnDelete}>X</button>
                            </div>
                            <div className="MainInfo">
                                <img  className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icon" />
                                <h2 className="Titel">{name}</h2>
                                <p className="Description">{description}</p>
                                <h1 className="Temperature TemperatureIcon">{temp.toFixed()}</h1>
                            </div>
                            <div className="Information">
                                <div>Humidity: {humidity}%</div>
                                <div>Feels like: {feels_like.toFixed()}</div>
                            </div>
                        </div>
                        :
                        <div className="Card">
                            <div className="ActionButtonWrap">
                                <button className="ActionButton" onClick={handelOnBack}>edit</button>
                                <button className="ActionButton" onClick={handelOnBack}>X</button>
                            </div>
                            <div className="MainInfo">
                                <img  className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icon" />
                                <h2 className="Titel">{name}</h2>
                                <p className="Description">{description}</p>
                                <h1 className="Temperature TemperatureIcon">{temp.toFixed()}</h1>
                            </div>
                            <div className="Information">
                                <div>Humidity: {humidity}%</div>
                                <div>Feels like: {feels_like.toFixed()}</div>
                            </div>
                        </div>
                    }
                </div>
                
            )
        } catch(e) {
            console.error(e);
            return (
                <div className="Card">
                    <div className="ActionButtonWrap">
                        <button className="ActionButton" onClick={handelOnEdit}>edit</button>
                        <button className="ActionButton" onClick={handelOnDelete}>X</button>
                    </div>
                    <div className="MainInfo">
                        <h2 className="Titel">{city}</h2>
                        <p className="Titel">Not found</p>
                    </div>
                </div>
            )
        }
    }
})
