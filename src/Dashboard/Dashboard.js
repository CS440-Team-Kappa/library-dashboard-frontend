import "./Dashboard.css"
import Actions from '../Actions/Actions';
import BookView from '../BookView/BookView';
import UserInfo from '../UserInfo/UserInfo';
import Home from '../Home/Home';
import CheckedOut from '../CheckedOut/CheckedOut';
import Cart from '../Cart/Cart';

function Dashboard({user, email, onLogout, onLogin}) {
    
    //from user session get loggin info, pass to userinfo and other components
    
    return (
        <div className="Dashboard">
            <Home />
            <Actions />
            <BookView user={user} />
            <UserInfo name={user} email={email} />
            <CheckedOut user={user} />
            <Cart user={user} />
        </div>
    )
}

export default Dashboard;