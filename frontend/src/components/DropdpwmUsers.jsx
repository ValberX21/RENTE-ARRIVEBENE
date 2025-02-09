import React, { Component } from 'react';
import '../Styles/DropListProp.css'

class DropListUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userType: [ 
        { userTypeId: 0, userName: 'Select a user type' },
        { userTypeId: 1, userName: 'Manager' },
        { userTypeId: 2, userName: 'Employer' },
        { userTypeId: 4, userName: 'Lordland' },
        { userTypeId: 5, userName: 'Tenant' }
    ]
    };
  }

  selectHandler = (e) =>{  
    console.log(e.target.value)
    this.props.devSelectHandler(e.target.value) 
}

  render() {
    const { userType } = this.state;
    const { value } = this.props;
    return (

        <div className="dropdown-container">
            <div className="dropdown-list">
            
            <select  value={value}  onChange={this.selectHandler}>

            {userType.map((item) => (
                <option key={item.userTypeId} value={item.userName}>
                {item.userName}
                </option>
            ))}
            </select>
            </div>
        </div>
    );
  }
}

export default DropListUsers;
