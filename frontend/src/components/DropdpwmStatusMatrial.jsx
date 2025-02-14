import React, { Component } from 'react';
import '../Styles/DropListProp.css'

class DropListStatusMatrial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrialSType: [ 
        { msId: 0, msName: 'Select a matrial status' },
        { msId: 1, msName: 'Single' },
        { msId: 2, msName: 'Married' },
        { msId: 4, msName: 'Divorced' },
        { msId: 5, msName: 'Widowed' },
        { msId: 6, msName: 'Separated' },
        { msId: 7, msName: 'Engaged' },
        { msId: 8, msName: 'In a relationship' }
    ]
    };
  }

  selectHandler = (e) =>{  
    console.log(e.target.value)
    this.props.matrialStatusSelectHandler(e.target.value) 
}

  render() {
    const { matrialSType } = this.state;
    const { value } = this.props;
    return (

        <div className="dropdown-container">
            <div className="dropdown-list">
            
            <select  value={value}  onChange={this.selectHandler}>

            {matrialSType.map((item) => (
                <option key={item.msId} value={item.msName}>
                {item.msName}
                </option>
            ))}
            </select>
            </div>
        </div>
    );
  }
}

export default DropListStatusMatrial;
