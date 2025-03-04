import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faDivide, faEquals, faMinus, faMultiply, faPlus, faX} from '@fortawesome/free-solid-svg-icons'
import {evaluate} from "mathjs";
import {useEffect, useState} from "react";

export default function CalculatorModal({initialValue, setModalValue, hideModal}) {
    const mathSymbols = ['÷', 'x', '+', '-'];

    let [calculatorInputValue, setCalculatorInputValue] = useState(initialValue ? initialValue.toString() : '');

    useEffect(() => {
        // Update the internal state whenever initialValue changes
        setCalculatorInputValue(initialValue);
    }, [initialValue]);

    function safeEval(expression) {
        if (expression === '') {
            return '';
        }

        // Replace symbols with JavaScript compatible operators
        expression = expression.replace(/÷/g, '/').replace(/x/g, '*');

        // Evaluate the expression
        const result = evaluate(expression);

        return parseFloat(result).toString();
    }

    const handleCloseCalculator = () => {
        hideModal();
    };

    const handleInputButtonClick = (event) => {
        const value = event.currentTarget.getAttribute('data-value');

        setCalculatorInputValue(function (currentValue) {
            if (currentValue.includes('.') && value === '.') {
                return currentValue;
            }

            return currentValue + value;
        });
    };

    const handleClearButtonClick = () => {
        setCalculatorInputValue('');
    }

    const handleBackspaceButtonClick = () => {
        setCalculatorInputValue(function (currentValue) {
            return currentValue.length > 0 ? currentValue.substring(0, currentValue.length - 1) : '';
        });
    }

    const handleMathSymbolButtonClick = (event) => {
        const value = event.currentTarget.getAttribute('data-value');

        setCalculatorInputValue(function (currentValue) {
            const lastChar = currentValue.slice(-1);

            if (currentValue.length === 0 || mathSymbols.includes(lastChar)) {
                return currentValue;
            }
            return currentValue + value
        });
    }

    const handleEqualsButtonClick = () => {
        setCalculatorInputValue(function (currentValue) {
            return safeEval(currentValue);
        });
    }

    const handleConfirmButtonClick = () => {
        setModalValue(safeEval(calculatorInputValue));
        hideModal();
    }

    return (
        <div className='modal' style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enter Amount</h5>
                        <button type="button" id="close-calculator" className="btn btn-danger fa-pull-right" onClick={handleCloseCalculator}>
                            <FontAwesomeIcon icon={faX}/>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row mb-2">
                            <div className="col-12">
                                <input type="text" className="form-control w-100" placeholder="0.00" name="calculator-input" id="calculator-input" readOnly value={calculatorInputValue}/>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <button type="button" className="btn btn-secondary w-100" onClick={handleClearButtonClick}>C</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-secondary w-100" onClick={handleMathSymbolButtonClick} data-value="÷"><FontAwesomeIcon icon={faDivide}/></button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-secondary w-100" onClick={handleMathSymbolButtonClick} data-value="x"><FontAwesomeIcon icon={faMultiply}/></button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-secondary w-100" onClick={handleBackspaceButtonClick}><FontAwesomeIcon icon={faArrowLeft}/></button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="7">7</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="8">8</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="9">9</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-secondary w-100" onClick={handleMathSymbolButtonClick} data-value="-"><FontAwesomeIcon icon={faMinus}/></button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="4">4</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="5">5</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="6">6</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-secondary w-100" onClick={handleMathSymbolButtonClick} data-value="+"><FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="1">1</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="2">2</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="3">3</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-primary w-100" onClick={handleEqualsButtonClick}><FontAwesomeIcon icon={faEquals}/></button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="0">0</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value="000">000</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-light w-100" onClick={handleInputButtonClick} data-value=".">.</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-success w-100 confirm-button" onClick={handleConfirmButtonClick}><FontAwesomeIcon icon={faArrowRight}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}