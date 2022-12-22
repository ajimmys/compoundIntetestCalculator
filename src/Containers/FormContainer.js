import React from 'react';
import CurrencyFormat from 'react-currency-format';
import RadioButtonList from '../Presentations/RadioButtonList';

export default function FormContainer(props) {
    
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <p>Principal Amount:</p>
                <CurrencyFormat
                    value={props.principalAmount}
                    thousandSeparator={true}
                    prefix="$"
                    placeholder="$10,000"
                    onValueChange={(values) => {
                        props.handleChange(
                            {
                                target: {
                                    name: "principalAmount",
                                    value: values.floatValue,
                                    type: "number",
                                    checked: false
                                }
                            })
                        }}
                />

                <p>Interest Rate:</p>
                <CurrencyFormat
                    name="interestRate"
                    value={props.interestRate}
                    suffix=" %"
                    placeholder="2%"
                    onValueChange={(values) => {
                        props.handleChange({
                            target: {
                                name: "interestRate",
                                value: values.floatValue,
                                type: "number",
                                checked: false
                            }
                        })
                    }}
                />
                
                <p>Compound Frequency:</p>
                <RadioButtonList
                    attributeName="compoundFrequency"
                    buttonValues={[["1", "Annualy"], ["4", "Quarterly"], ["12", "Monthly"], ["365", "Daily"]]}
                    attribute={props.compoundFrequency}
                    changeFunction={props.handleChange}
                />

                <p>Periodic Contributions:</p>
                <CurrencyFormat
                    value={props.payments}
                    thousandSeparator={true}
                    prefix="$"
                    placeholder="$100"
                    onValueChange={(values) => {
                        props.handleChange({
                            target: {
                                name: "payments",
                                value: values.floatValue,
                                type: "number",
                                checked: false
                            }
                        })
                    }}
                />

                <p>Contribution Frequency</p>
                <RadioButtonList
                    attributeName="numberRegularPayments"
                    buttonValues={[["1", "Annualy"], ["12", "Monthly"], ["52.17857" , "Weekly"],["365", "Daily"]]}
                    attribute={props.numberRegularPayments}
                    changeFunction={props.handleChange}
                />

                <p>Length (years):</p>
                <input
                    type="number"
                    value={props.years}
                    name="years"
                    placeholder="5"
                    onChange={props.handleChange}
                />
                <input type="submit" value="Submit"/>             
            </form>
        </div>
    );
}