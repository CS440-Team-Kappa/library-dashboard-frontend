import './UserInfo.css';
import UserProfile from '../Components/UserProfile';

function UserInfo({name, email}) {
    let display;
    
    if (!UserProfile.isLoggedIn()) {
        display = <div className='text'><h2>Log in to view dashboard!</h2></div>
    } else {
        display = <div className='text'><h2 className='name'>{UserProfile.getName()}</h2><p className='email'>Email: {UserProfile.getEmail()}</p></div>
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