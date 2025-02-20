import './App.css'
import CalculatorModal from './components/CalculatorModal'
import {useState} from "react";

function App() {

    let [modalIsShown, setModalIsShown] = useState(false);

    const handleOpenModal = () => {
        setModalIsShown(true);
    };

    return (
        <>
            <CalculatorModal showModal={modalIsShown}/>

            <button type="button" onClick={handleOpenModal}>
                Show Modal
            </button>
        </>
    )
}

export default App
