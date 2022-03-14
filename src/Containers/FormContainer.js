import '../Style/App.css';
import React from 'react';
import CurrencyFormat from 'react-currency-format'
import RadioButtonList from '../Presentations/RadioButtonList';

class FormContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            principalAmount: '',
            interestRate: '',
            compoundFrequency: '1',
            years: '',
            payments: '',
            numberRegularPayments: 12,
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
        let principal = parseFloat(this.state.principalAmount.replace(/[$,]/g, ''))
        let regularPayments
        this.state.payments === '' ?
            regularPayments = 0 :
            regularPayments = parseFloat(this.state.payments.replace(/[$,]/g, ''))
        let rate = parseFloat(this.state.interestRate.replace('%', ''))/100
        let periods = this.state.compoundFrequency
        let years = this.state.years
        let numberRegularPayments = this.state.numberRegularPayments / years

        let valueA = (1 + (rate/periods))**(periods*years)
        let contributionsCompound = regularPayments * numberRegularPayments *
            (((1 + rate/periods)**(periods*years)-1)/(rate/periods))
        let flatCompound = principal * valueA
        let newTotal = flatCompound + contributionsCompound
        this.setState({total : newTotal})
    }

    render() {
        return(
            <form>
                <p>Principal Amount:</p>
                <CurrencyFormat
                    value={this.state.principalAmount}
                    thousandSeparator={true}
                    prefix="$"
                    placeholder="$10,000"
                    onValueChange={(values) => { this.setState({principalAmount: values.formattedValue}) }}
                />
                <p>Interest Rate:</p>
                <CurrencyFormat
                    value={this.state.interestRate}
                    suffix=" %"
                    placeholder="2%"
                    onValueChange={(values) => {this.setState({interestRate: values.formattedValue}) }}
                />

                <p>Compound Frequency:</p>
                <RadioButtonList
                    attributeName="compoundFrequency"
                    buttonValues={[["1", "Annual"], ["4", "Quarterly"], ["12", "Monthly"], ["365", "Daily"]]}
                    attribute={this.state.compoundFrequency}
                    changeFunction={this.handleChange}
                />

                <p>Periodic Contributions:</p>
                <CurrencyFormat
                    value={this.state.payments}
                    thousandSeparator={true}
                    prefix="$"
                    placeholder="$100"
                    onValueChange={(values) => {this.setState({payments: values.formattedValue}) }}
                />

                <p>Contribution Frequency</p>
                <RadioButtonList
                    attributeName="numberRegularPayments"
                    buttonValues={[["365", "Daily"], ["52", "Weekly"], ["12", "Monthly"]]}
                    attribute={this.state.numberRegularPayments}
                    changeFunction={this.handleChange}
                />

                <p>Length (years):</p>
                <input
                    type="number"
                    value={this.state.years}
                    name="years"
                    placeholder="5"
                    onChange={this.handleChange}
                />
                <button onClick={(event) => this.handleEntailmentRequest(event)} >
                    Submit
                </button>

                {this.state.total > 0 ?
                    <CurrencyFormat
                        value={this.state.total}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"Total: $"}
                        suffix={" - after " + this.state.payments + " payments over " + this.state.years + " years" }
                    /> :
                    <p> </p>
                }
            </form>
        );
    }
}

export default FormContainer;