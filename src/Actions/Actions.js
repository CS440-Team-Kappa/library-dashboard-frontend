import "./Actions.css"
import { useNavigate } from 'react-router-dom';
import { handleClick, useState } from 'react'
import Modal from '../Views/Modal';
import UserProfile from './../Components/UserProfile';

function Actions() {
    let Navigate = useNavigate();
    handleClick = () => Navigate('/createemployee');

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('createEmployee');
    const condition = UserProfile.isEmployee();
    const condition2 = !(UserProfile.isLoggedIn());
    const condition3 = UserProfile.isLoggedIn();
    
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setModalOpen(true);
    }
  
    const handleModalClose = () => {
      setModalOpen(false);
      setSelectedOption('addBook');
    }

    return (
        <div className="Actions">
            {condition2 ? (
                    <div>
            <a className='createAccount' href='/createaccount'>Create An Account</a>   
            <a className="login" href='/login'>Login</a>
            </div>
                ) : null}
            {condition3 ? (
                    <div>
            <a className="login" href='/'>Logout</a>
            </div>
                ) : null}
                {condition ? (
                    <div>
                        <button enabled="true" onClick={handleClick}>Create Employee</button>
                    </div>
                ) : null}

        </div>

    )
}

export default Actions;