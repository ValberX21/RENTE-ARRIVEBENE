import React, { useState, useEffect  } from 'react';
import {postBody, getList} from '../services/api';
import  '../Styles/PropertyForm.css';
import NavBar from "../components/NavBar";
import AddressCard from '../components/AddressCard';

const Address = () =>{

    const [addressStreet, setStreet] = useState('');
    const [addressNumber, setNumber] = useState(0);
    const [addressComplement, setComplement] = useState('');
    const [addressNeighborhood, setNeighborhood] = useState('');
    const [addressCity, setCity] = useState('');
    const [addressCountry, setCountry] = useState('');    
    const [addressZipCode, setZipCode] = useState('');   
    const [addressesState, setState] = useState(''); 

    const [addressId, setAdressId] = useState(''); 
    const [addressList, setAdressList] = useState([]); 

    const addAddress = async (e) =>{

    e.preventDefault();

        if(!addressStreet.trim())
        {
            alert('Please fill Street');
            return;
        }
        else if(addressNumber <= 0)
        {
            alert('Please fill Number');
            return;
        }
        else if(!addressComplement.trim())
        {
            alert('Please fill Complement');
            return;
        }
        else if(!addressNeighborhood.trim())
        {
            alert('Please fill Neighborhood');
            return;
        }
        else if(!addressCity.trim())
        {
            alert('Please fill City');
            return;
        }
        else if(!addressCountry.trim())
        {
            alert('Please fill Country');
            return;
        }
        else if(!addressZipCode.trim())
        {
            alert('Please fill ZipCode');
            return;
        }
        else if(!addressesState.trim())
        {
            alert('Please fill State');
            return;
        }
 
        const dt =  
        {
            "street":addressStreet,
            "number":addressNumber,
            "complement":addressComplement,
            "neighborhood":addressNeighborhood,
            "city":addressCity,
            "state":addressesState,
            "country":addressCountry,
            "zipCode":addressZipCode          
        }

        var response;

        try
        {
            if(!addressId)
            {
                response =  await postBody('http://localhost:7000/api/address/', dt, 'POST')
                alert('Address added')
            }
            else 
            {
                response =  await postBody('http://localhost:7000/api/address/'+addressId, dt, 'PUT')
                alert('Address updated')
            }

            setAdressList((address) => [
                ...address,
                { ...dt },
            ])
            
        }
        catch(erro)
        {
            console.log(erro)
            alert(erro)
        }   

        setStreet('');
        setNumber('');
        setComplement('');
        setNeighborhood('');
        setCity('');
        setCountry('');
        setZipCode('');
        setState('');
    }

    const selectHandler = (address) => {

        setAdressId(address._id);
        setStreet(address.street);
        setNumber(address.number);
        setComplement(address.complement);
        setNeighborhood(address.neighborhood);
        setCity(address.city);
        setCountry(address.country);
        setZipCode(address.zipCode);
        setState(address.state);

    };

    const listAddresses = async () => {
        try {
                const response = await getList('http://localhost:7000/api/address');
                const addresses = await response; 
                setAdressList(addresses); 
        } catch (error) 
        {
            console.error('Error fetching address:', error);
            alert('Failed to fetch address');
        }
      };

      const deleteProperty = async ()  => {

        const dt = {}

        try 
        {
            const response = await postBody('http://localhost:7000/api/address/'+ addressId, dt ,'DELETE'); 
            const properties = await response; 
            alert('Property Deleted')
        } 
        catch (error) 
        {
          alert(error);
        }
      }

    useEffect(() => {
        listAddresses();
    }, [listAddresses, addAddress])

    return(
        <div>
        <NavBar/>
        <div className="property-manager">

        <div className="property-list">
            {addressList.length === 0 ? (
            <p>No tasks registered yet.</p>
            ) : (          
                addressList.map((address, index) => (                  
                  <AddressCard key={index} address={address} adresSelected={selectHandler} />
               
            ))       
            )}
        </div>

  
        <div className="property-form">
          <h2>Register a Address</h2>
          <form>
  
            <div>
              <label>Street</label>
              <input
              placeholder="Enter Street"
              value={addressStreet}
              type='text'
              onChange={(e) => setStreet(e.target.value)} />
            </div>

            <div>
              <label>Number</label>
              <input
               placeholder="Enter number"
               id="TenantCPF"
               value={addressNumber}
               type='number'
               onChange={(e) => setNumber(e.target.value)} />
            </div>

            <div>
              <label>Complement</label>
              <input
              placeholder="Enter Complement"
              id="Complement"
              value={addressComplement}
              type='text'
              onChange={(e) => setComplement(e.target.value)}/>
            </div>

            <div>
              <label>Neighborhood</label>
              <input
               placeholder="Enter Neighborhood"
               id="Neighborhood"
               value={addressNeighborhood}
               type='text'
               onChange={(e) => setNeighborhood(e.target.value)}/>
            </div> 

            <div class="input-group">
                <div class="input-container">
                    <label>City</label>
                    <input 
                    type="text"
                    placeholder="Enter City"
                    id="City"
                    value={addressCity}
                    onChange={(e) => setCity(e.target.value)} />
                </div>

                <div class="input-container">
                    <label>State</label>
                    <input 
                    type="text"
                    placeholder="Enter State"
                    id="State"
                    value={addressesState}
                    onChange={(e) => setState(e.target.value)} />
                </div>
            </div>  

            <div class="input-group">
                <div class="input-container">
                    <label>Country</label>
                    <input 
                    type="text" 
                    placeholder="Enter Country"
                    id="Country"
                    value={addressCountry}
                    onChange={(e) => setCountry(e.target.value)}/>
                </div>

                <div class="input-container">
                    <label>ZipCode</label>
                    <input 
                    type="text"
                    placeholder="Enter ZipCode"
                    id="ZipCode"
                    value={addressZipCode}
                    onChange={(e) => setZipCode(e.target.value)} />
                </div>
            </div>  

            <div className="button-container">
              <button onClick={addAddress}>Add Property</button>
              <button onClick={deleteProperty} className="delete-btn" >Delete Property</button>              
            </div>

          </form>
        </div>
      </div>
    </div>
    )

}

export default Address