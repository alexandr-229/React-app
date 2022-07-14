import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../Card';
import { GlobalContext } from '../App';
import '../App.css'

export const CardList = () => {
    const [ orderBy, setOrderBy ] = useState('asc')
    const { state } = useContext(GlobalContext);
    const citiesList = state.citiesList;

    useEffect(() => {
        localStorage.setItem('citiesList', JSON.stringify(citiesList))
    },[citiesList])
    const handelOnChange = (e) => {
        setOrderBy(e.target.value);
    }

    let sortedCitiesList = citiesList.sort();
    if(orderBy === 'desc'){
        sortedCitiesList.reverse()
    }
    return(
        <>
            <select className="Select" onChange={handelOnChange} value={orderBy}>
                <option value='asc'>By name asc</option>
                <option value='desc'>By name desc</option>
            </select>
            <div className="CardList">
                {
                    sortedCitiesList.map((city) => <Card key={city} city={city} link={true}/>)
                }
            </div>
        </>
    )
}