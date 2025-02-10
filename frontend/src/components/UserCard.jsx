import  '../Styles/PropertyCard.css';

const UserCard = ({ users , userSelected }) => {

  const selectedProp = () =>{
    userSelected(users);
  }

  return (
    <div className="property-card" onClick={selectedProp}>
      <p style={{ display: 'none' }}>{users._id}</p>
      <p>Name: {users.name}</p>
      <p>Email: {users.email}</p>
      <p>Role: {users.role}</p>
    </div>
  );
};

export default UserCard;
