import  '../Styles/PropertyCard.css';

const PropertyCard = ({ property,propSelected }) => {

  const selectedProp = () =>{
    propSelected(property);
  }

  return (
    <div className="property-card" onClick={selectedProp}>
      <p style={{ display: 'none' }}>Property: {property._id}</p>
      <p>Property: {property.propertyType}</p>
      <p>Adress: {property.address}</p>
      <p >Price: {property.price}</p>
      <p>Owner: {property.owner}</p>

      {property.available === true ? (
        <button className="lease-btn">Lease Property</button>
      ) : (
        <button  style={{ display: 'none' }}></button>
      )
    }
      
    </div>
  );
};

export default PropertyCard;
