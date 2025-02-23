import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink} from 'react-router-dom';
import '../Styles/Dashboard.css';
import  {useAuth } from '../context/AuthContext';

const NavBar = () =>{

    const navigate = useNavigate();

    const handlerLogout = () => {

        sessionStorage.clear();
        useAuth.setAuth(null);
        navigate('/login', { replace: true });
    }

    return(
        <header className="App-header">
        <h3 className="d-flex justify-content-center m-3">Rent estate Arrive</h3>

        <nav style={{ flex: "2", display: "flex", justifyContent: "center", gap: "15px" }}>

            <NavLink to="/property" className="btn btn-green">
            Property
            </NavLink>

            <NavLink to="/users" className="btn btn-green">
            Users
            </NavLink>

            <NavLink to="/address" className="btn btn-green">
            Address
            </NavLink>
        </nav>

        <nav className="navv navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className="nav-item m-1">
                <NavLink className="btn btn-light btn-green"
                         onClick={handlerLogout}>
                    Logout
                </NavLink>
                </li>
            </ul>
        </nav>
        </header>
    );
}

export default NavBar;