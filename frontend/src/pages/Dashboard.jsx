import { NavLink} from 'react-router-dom';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <header className="App-header"> {/* Apply the fixed header styling */}
        <h3 className="d-flex justify-content-center m-3">
          Rent estate Arrive
        </h3>
        <nav className="navv navbar navbar-expand-sm">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary">
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="App-body"> {/* Add this for additional content */}
        {/* Additional content for your page goes here */}
      </div>
    </div>
  );
};

export default Dashboard;