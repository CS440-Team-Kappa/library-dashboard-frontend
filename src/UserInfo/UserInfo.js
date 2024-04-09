import './UserInfo.css';

function UserInfo() {
    const Name = 'John Smith'
    const email = 'johnsmith@email.com'
    
    return (
        <div className="UserInfo">
            <div className='text'>
                <h2 className='name'>{Name}</h2>
                <p className='email'>Email: {email}</p>
            </div>
        </div>
    );
}

export default UserInfo;