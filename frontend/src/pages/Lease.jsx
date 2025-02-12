import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/PropertyForm.css";
import { getList } from "../services/api";

const Lease = () => {
  const location = useLocation();
  const property = location.state?.property;

  const [tenantCPF, setTenantCPF] = useState("");
  const [allCPFs, setAllCPFs] = useState(new Set());
  const [foundCPF, setFoundCPF] = useState(null);

  useEffect(() => {
    const fetchCPFs = async () => {
      try {
        const response = await getList('http://localhost:7000/api/users');
        const cpfList = response;
        const filterList = cpfList.map(user => user.cpf)
        setAllCPFs(new Set(filterList));
      } catch (error) {
        console.error("Error fetching CPFs:", error);
      }
    };
    fetchCPFs();
  }, []);

  const handleTenantCPFChange = (e) => {

    const cpf = e.target.value;

    const cpfFormat = parseInt(cpf);

    setTenantCPF(cpfFormat);

    if(allCPFs.has(cpfFormat))
    {
      setFoundCPF(true);
    }
    else
    {
      setFoundCPF(false);
    }

   

  };

  return (
    <div className="property-form">
      <h2>Lease Property</h2>
      <p>
        <strong>Type:</strong> {property.propertyType}
      </p>
      <p>
        <strong>Address:</strong> {property.address}
      </p>
      <p>
        <strong>Price:</strong> {property.price}
      </p>
      <p>
        <strong>Owner:</strong> {property.owner}
      </p>

      <div>
        <label>Tenant CPF:</label>
        <input          
          placeholder="Enter Tenant CPF"
          id="TenantCPF"
          value={tenantCPF}
          onChange={handleTenantCPFChange} 
          maxLength={11}
        />
        {foundCPF === true && 
        <form>
          <p>Usuario ja cadastrado</p>

          <div>
              <label>User CPF</label>
                <input
                  type="number"               
                  placeholder="Enter user CPF"                   
                />
          </div>

          <div>
              <label>User WhatsApp</label>
                <input
                  type="number"               
                  placeholder="Enter user WhatsApp"                   
                />
          </div>

          <div>
              <label>Marital status</label>                
          </div>


        </form>}
        {foundCPF === false &&
         <form>
          <p>Usuario não cadastrado</p>
          <button>Faça um cadastro rapido</button>
        </form>}
      </div>

      <button disabled={!foundCPF}>Confirm Lease</button>
    </div>
  );
};

export default Lease;
