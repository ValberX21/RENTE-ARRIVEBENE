import  '../Styles/PropertyCard.css';

const AddressCard = ({ address,adresSelected }) => {

  const selectedProp = () =>{
    adresSelected(address);
  }

  return (
    <div className="property-card" onClick={selectedProp}>
      <p style={{ display: 'none' }}>Address: {address._id}</p>
      <p>street: {address.street}</p>
      <p>number: {address.number}</p>
      <p>complement: {address.complement}</p>
      <p>neighborhood: {address.neighborhood}</p>
      <p>city: {address.city}</p>
      <p>state: {address.state}</p>
      <p>country: {address.country}</p>
      <p>zipCode: {address.zipCode}</p>     
    </div>
  );
};

export default AddressCard;
