import './UserInfo.css';

function UserInfo({name, email}) {
    let display;
    
    if (name === null) {
        display = <div className='text'><h2>Log in to view dashboard!</h2></div>
    } else {
        display = <div className='text'><h2 className='name'>{name}</h2><p className='email'>Email: {email}</p></div>
    }

    return (
        <div className="UserInfo">
            <div className='text'>
                {display}
            </div>
        </div>
    );
}

export default UserInfo;