import React, { Component } from 'react';
import '../Styles/DropListProp.css'

class DropdpwmPaymentOptions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      guaranteOptions: [ 
        { goId: 0, goName: 'Select a matrial status' },
        { goId: 1, goName: 'No guarantee' },
        { goId: 2, goName: 'Deposit (1,2,3)' },
        { goId: 4, goName: 'Surety bond' },
        { goId: 5, goName: 'Guarantor' }
    ]
    };
  }

  selectHandler = (e) =>{  
    this.props.paymentMethodSelectHandler(e.target.value) 
}

  render() {
    const { guaranteOptions } = this.state;
    const { value } = this.props;
    return (

        <div className="dropdown-container">
            <div className="dropdown-list">
            
            <select  value={value}  onChange={this.selectHandler}>

            {guaranteOptions.map((item) => (
                <option key={item.goId} value={item.goName}>
                {item.goName}
                </option>
            ))}
            </select>
            </div>
        </div>
    );
  }
}

export default DropdpwmPaymentOptions;
