import CurrencyFormat from "react-currency-format";

export default function CalculationOutput(props) {
    return (
            <div >
            { (props.total > 0 && props.principalAmount > 0) ?
                <div className="results">
                    <CurrencyFormat 
                        value={props.principalAmount}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"Starting Value: $"}
                    />
                
                    <CurrencyFormat
                        value={props.amountAdded}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"Total contributions: $"}
                    />
                    
                    <CurrencyFormat
                        value={props.total - props.principalAmount}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"Total interest: $"}
                    />

                    <CurrencyFormat
                        value={props.total}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"Total: $"}
                    />
                
                </div>
                : 
                <p></p>}

            </div>
        );
}