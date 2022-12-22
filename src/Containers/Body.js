// This will contain both the form and the output - it will be the OLD version of the FormContainer that did the calculations as well. i.e move the Form Container over to this file and then convert the form contianer file into one that only has the form code

import React from "react";
import CalculationOutput from "../Presentations/CalculationOutput";
import '../Styles/CSS/App.css';
import FormContainer from "./FormContainer";

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            principalAmount: '',
            interestRate: '',
            compoundFrequency: '1',
            years: '',
            payments: '',
            numberRegularPayments: 12,
            amountAdded: 0,
            total: 0,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleEntailmentRequest = this.handleEntailmentRequest.bind(this)
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    handleChange(event){
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name] : checked}) : this.setState({[name] : value})
    }

    handleEntailmentRequest(event){
        event.preventDefault()
        let principal = this.state.principalAmount
        let regularPayments = this.state.payments === '' ? 0 : this.state.payments
        
        let rate = this.state.interestRate/100
        let compoundFrequency = this.state.compoundFrequency
        let years = this.state.years
        let numberAnnualPayments = 
            this.state.numberRegularPayments === 52 ? 
            4.333333 : this.state.numberRegularPayments === 365 ? 
            30.416667 : this.state.numberRegularPayments

        // convert periodic payments into a single annual ammount added each year 
        let PMT = numberAnnualPayments * regularPayments

        //Cleared for standard cases
        let flatCompound = principal*((1 + (rate/compoundFrequency))**(compoundFrequency*years))


        // TODO: Need to figure out why this doesn't work for Quarterly, Monthly and Daily compounding
        let contributionsCompound = PMT*((((1+(rate/compoundFrequency))**(compoundFrequency*years))-1)/(rate/compoundFrequency))
        
        let newTotal = flatCompound + contributionsCompound

        this.setState({total : newTotal})
        this.setState({amountAdded: PMT * years})        
    }

    render() {
        return(
            <div className="calculatorBody">
                <FormContainer
                    principalAmount={this.state.principalAmount}
                    interestRate={this.state.interestRate}
                    compoundFrequency={this.state.compoundFrequency}
                    payments={this.state.payments}
                    numberRegularPayments={this.state.numberRegularPayments}
                    years={this.state.years}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleEntailmentRequest}
                />
                <CalculationOutput 
                    principalAmount={this.state.principalAmount}
                    amountAdded={this.state.amountAdded}
                    total={this.state.total}
                />
            </div>
        )
    }
}

export default Body;