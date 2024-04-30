import "./Actions.css"
import { useNavigate } from 'react-router-dom';
import { handleClick } from 'react'
function Actions() {
    let Navigate = useNavigate();
    handleClick = () => Navigate('/createemployee');

    return (
        <div className="Actions">
            <a className='createAccount' href='/createaccount'>Create An Account</a>
            <a className="login" href='/login'>Login</a>
            <button enabled="true" onClick={handleClick}>Create Employee</button>
        </div>
    )
}

export default Actions;