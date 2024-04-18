import "./Dashboard.css"
import Actions from '../Actions/Actions';
import BookView from '../BookView/BookView';
import UserInfo from '../UserInfo/UserInfo';
import Home from '../Home/Home';
import CheckedOut from '../CheckedOut/CheckedOut';
import CartActions from '../CartActions/CartActions';
import Cart from '../Cart/Cart';

function Dashboard() {
    return (
        <div className="Dashboard">
            <Home />
            <Actions />
            <BookView />
            <UserInfo />
            <CheckedOut />
            <CartActions />
            <Cart />
        </div>
    )
}

export default Dashboard;