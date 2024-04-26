import "./Actions.css"

function Actions() {
    return (
        <div className="Actions">
            <a className='createAccount' href='/createaccount'>Create An Account</a>
            <a className="login" href='/login'>Login</a>
        </div>
    )
}

export default Actions;