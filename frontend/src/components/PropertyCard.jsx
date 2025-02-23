import  '../Styles/PropertyCard.css';
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property,propSelected }) => {

  const navigate = useNavigate();

  const selectedProp = () =>{
    propSelected(property);
  }

  const createLease = () => {
    navigate("/lease", { state: { property } });      
  }

  return (
    <div className="property-card" onClick={selectedProp}>
      <p style={{ display: 'none' }}>Property: {property._id}</p>
      <p>Property: {property.propertyType}</p>
      <p>Adress: {property.address}</p>
      <p>Price: {property.price}</p>
      <p>Owner: {property.owner}</p>

      {property.available === true ? (
        <button onClick={() => createLease(property)} className="lease-btn">Lease Property</button>
      ) : (
        <button  style={{ display: 'none' }}></button>
      )
    }      
    </div>
  );
};

export default PropertyCard;
