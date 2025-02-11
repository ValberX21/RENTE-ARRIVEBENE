import React, { useState, useEffect  } from 'react';
import DropListProp from "../components/DropdownProps"
import {postBody, getList} from '../services/api';
import PropertyCard from '../components/PropertyCard';
import  '../Styles/PropertyForm.css';

const PropertyForm = () =>{

    const [propertyType, setType] = useState('');
    const [propertyAdress, setAdress] = useState('');
    const [propertyPrice, setPrice] = useState(0);
    const [propertyOwner, setOwner] = useState('');
    const [propertyId, setPropId] = useState('');
    const [propertiesRegistred, setPropries] = useState([]); 

    const addProperty = async (e) =>{

    e.preventDefault();
        
    if (!propertyType.trim())     
        {
          alert('Please fill type of property');
          return;
        }
        else if (!propertyAdress.trim())
        {
            alert('Please fill adress');
            return;
        }
        else if (propertyPrice <= 0)
        {
            alert('Please fill price');
            return;
        }
        else if(!propertyOwner.trim())
        {
            alert('Please fill Owner');
            return;
        }

 
        const dt =  
        {
            "name":propertyType,
            "address":propertyAdress,
            "price":propertyPrice,
            "owner":propertyOwner
        }

        try
        {
          var response;

          if(!propertyId)
          {
            response = await postBody('http://localhost:7000/api/properties/', dt, 'POST'); 
            alert('Property added')
          }
          else
          {
            response = await postBody('http://localhost:7000/api/properties/'+propertyId, dt, 'PUT'); 
            alert('Property updated')
          }

          setPropries((properties) => [
            ...properties,
            { ...dt },
          ]);

        }
        catch(erro)
        {
            console.log(erro)
            alert(erro)
        }

        setType(0);
        setOwner('');
        setAdress('');
        setPrice(0);       

    }

    const devSelectHandler = (property) => {
      console.log("Selected property:", property);

      setPropId(property._id)
      setType(property.propertyType);
      setOwner(property.owner)
      setAdress(property.address)
      setPrice(property.price)
    };

    const listProperties = async () => {
        try {
          const response = await getList('http://localhost:7000/api/properties');
          const properties = await response; 
          setPropries(properties); 
        } catch (error) {
          console.error('Error fetching tasks:', error);
          alert('Failed to fetch tasks');
        }
      };

      const deleteProperty = async ()  => {

        const dt = {}

        try 
        {
          const response = await postBody('http://localhost:7000/api/properties/'+ propertyId, dt ,'DELETE'); 
          const properties = await response; 
          alert('Property Deleted')
        } 
        catch (error) 
        {
          alert(error);
        }
      }

    useEffect(() => {
        listProperties();
    }, [listProperties, addProperty])

    return(
        <div className="property-manager">

        <div className="property-list">
            {propertiesRegistred.length === 0 ? (
            <p>No tasks registered yet.</p>
            ) : (          
                propertiesRegistred.map((property, index) => (                  
                  <PropertyCard property={property} propSelected={devSelectHandler} />
               
            ))       
            )}
        </div>
  
        <div className="property-form">
          <h2>Register a Property</h2>
          <form>

          <div>
              <label>Select a type of property:</label>
              <DropListProp value={propertyType} devSelectHandler={setType} />
            </div>
  
            <div>
              <label>Adress:</label>
              <input
                type="text"               
                placeholder="Enter Adress"
                id='propertyAdress'
                value={propertyAdress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div>
              <label>Type the owner:</label>
              <input
                type="text"               
                placeholder="Enter owner name"
                id ='propertyonwer'
                value={propertyOwner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>

            <div>
              <label>Type the price:</label>
              <input
                type="number"               
                placeholder="Enter price"
                id ='propertyonwer'
                value={propertyPrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>            

            <div className="button-container">
              <button type="submit" onClick={addProperty}>Add Property</button>
              <button className="delete-btn" onClick={deleteProperty}>Delete Property</button>
              

            </div>

          </form>
        </div>
      </div>
    )

}

export default PropertyForm