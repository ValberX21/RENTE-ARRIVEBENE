import  '../Styles/PropertyCard.css';

const PropertyCard = ({ property }) => {

  return (
    <div className="property-card" >
      <p>Property: {property.propertyType}</p>
      <p>Adress: {property.address}</p>
      <p >Price: {property.price}</p>
      <p>Owner: {property.owner}</p>
    </div>
  );
};

export default PropertyCard;
