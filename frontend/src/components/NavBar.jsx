import { NavLink} from 'react-router-dom';
import '../Styles/Dashboard.css';

const NavBar = () =>{
    return(
        <header className="App-header">
        <h3 className="d-flex justify-content-center m-3">Rent estate Arrive</h3>

        <nav style={{ flex: "2", display: "flex", justifyContent: "center", gap: "15px" }}>

            <NavLink to="/property" className="btn btn-green">
            Property
            </NavLink>
            <NavLink to="/employer" className="btn btn-green">
            Employer
            </NavLink>
            <NavLink to="/others" className="btn btn-green">
            Others
            </NavLink>
        </nav>

        <nav className="navv navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className="nav-item m-1">
                <NavLink className="btn btn-light btn-green">
                    Logout
                </NavLink>
                </li>
            </ul>
        </nav>
        </header>
    );
}

export default NavBar;