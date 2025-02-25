import './App.css'
import CalculatorModal from './components/CalculatorModal'
import {useState} from "react";
import {faCalculator} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function App() {
    let [modalIsShown, setModalVisible] = useState(false);
    let [modalValue, setModalValue] = useState('');

    return (
        <>
            <CalculatorModal isShown={modalIsShown} initialValue={modalValue} setModalValue={setModalValue} setModalVisible={setModalVisible}/>
            <h1>Calculator</h1>
            <div className="input-group">
                <input type="text" className='form-control' placeholder='0.00' value={modalValue} onChange={(e) => setModalValue(e.target.value)}/>

                <button type="button" className="btn btn-primary" onClick={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faCalculator}/>
                </button>
            </div>
        </>
    )
}

export default App
