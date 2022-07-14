import React, { useRef, useContext } from 'react';
import '../App.css';
import { GlobalContext } from '../App';

export const Input = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const editingCity = state.editingCity;
    const ref = useRef(null)

    const handelOnAdd = () => {
        ref.current.focus();
        dispatch({
            type: 'ADD_CITY',
            payload: state.inputValue
        })
    }
    const handelOnChange = (e) => {
        dispatch({
            type: 'CHANGE_INPUT_VALUE',
            payload: e.target.value
        })
    }

    const handelOnDone = () => {
        dispatch({
            type: 'EDIT_CITY_DONE',
            payload: state.inputValue
        })
    }

    return(
        <div className="InputWrap">
            <input ref={ref} onChange={handelOnChange} type="text" className="Input" value={state.inputValue}/>
            {
                state.editCity
                ?
                <button className="Btn" onClick={handelOnDone}>Done</button>
                :
                <button className="Btn" onClick={handelOnAdd}>+</button>
            }
        </div>
    )
}