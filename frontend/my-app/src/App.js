import {BrowserRouter as Router , Route ,Routes,useParams, Navigate } from 'react-router-dom';
import './App.css';
import Addflights from "./Admin/Addflight" ;
import Schedule from "./Admin/Schedule";
import AdminPage from "./Admin/AdminPage";
import MainPage from "./User/MainPage";
import MainPageLoggedIn from "./User/MainPageLoggedIn";
import PaymentConfirm from "./User/PaymentConfirm"
import Updateflight from "./Admin/Updateflight";
import Searchflight from './Admin/Searchflight';
import SearchflightUser from './User/SearchflightUser';
import EditFlightHandler from 'User/EditFlightHandler';
import Reservedflights from './User/Reservedflights';
import PlaneView from './User/PlaneView';
import ViewProfile from './User/ViewProfile';
import LogIn from './User/LogIn';
import Register from './User/Register';
import ViewFlightHandler from './User/viewFlightHandler';
import ViewReturnFlight from './User/ViewReturnFlight';
import ForbiddenAccess from './Admin/ForbiddenAccess';
import AdminLogIn from './Admin/AdminLogIn';
import PaymentCancel from './User/PaymentCancel';

function App() {

  return (
    <Router>
      <Routes>
            <Route path='/denied' element={<ForbiddenAccess/>} />
            <Route path='/' element={<MainPage/>} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/user' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<MainPageLoggedIn/>}/>
            <Route path='/user/profile/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<ViewProfile/>} />
            <Route path='/yourreservedflights/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<Reservedflights/>} />
            <Route path='/addFlight' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/denied" />:<Addflights/>}/>
            <Route path='/admin/login' element={(localStorage.getItem("isAdminLoggedIn") == true)?<Navigate  to="/admin" />:<AdminLogIn/>}/>
            <Route path='/admin' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/denied" />:<AdminPage/>}/>
            <Route path='/schedule' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/denied" />:<Schedule/>}/>
            <Route path='/searchflight' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/denied" />:<Searchflight/>}/>
            <Route path='/updateflight/:id' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/denied" />:<Updateflight/>}/>
            <Route path='/searchflightuser' element={<SearchflightUser/>} />
            <Route path='/PlaneView/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<PlaneView/>} />
            <Route path='/viewreturnflight/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<ViewReturnFlight/>} />
            <Route path='/viewflight/:id/:cabinclass/:numofresseats' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<ViewFlightHandler/>} />
            <Route path='/confirmPayment/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<PaymentConfirm />} />
            <Route path='/editReservation/:reservationId' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<EditFlightHandler/>} />
            <Route path='/cancelReservation/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<PaymentCancel/>} />
      </Routes>
    </Router>
  );
}

export default App;
