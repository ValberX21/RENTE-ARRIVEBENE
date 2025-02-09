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
    </div>
  );
};

export default PropertyCard;
