import React, { Component } from 'react';
import '../Styles/DropListProp.css'

class DropListProp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      devs: [ 
        { devsId: 0, devsName: 'Select a dev' },
        { devsId: 1, devsName: 'House' },
        { devsId: 2, devsName: 'Office' },
        { devsId: 3, devsName: 'Apartment' }
    ]
    };
  }

  selectHandler = (e) =>{  
    this.props.devSelectHandler(e.target.value) 
}

  render() {
    const { devs } = this.state;
    const { value } = this.props;
    return (

        <div className="dropdown-container">
            <div className="dropdown-list">
            
            <select  value={value}  onChange={this.selectHandler}>

            {devs.map((item) => (
                <option key={item.devsId} value={item.devsName}>
                {item.devsName}
                </option>
            ))}
            </select>
            </div>
        </div>
    );
  }
}

export default DropListProp;
