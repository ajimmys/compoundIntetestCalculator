import React from 'react';

export default function RadioButtonList(props) {
    return (
        <div className='radioButtonList'>
            {props.buttonValues.map(value => (
                <div>
                    <label key={value[0]}/>
                        <input key={value[0]}
                            type='radio'
                            name={props.attributeName}
                            value={value[0]}
                            checked={props.attribute === value[0]}
                            onChange={props.changeFunction} />
                        {value[1]}
                </div>
                ))}
        </div>
    );
}