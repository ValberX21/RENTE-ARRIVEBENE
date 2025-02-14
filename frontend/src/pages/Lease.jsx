import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/PropertyForm.css";
import { getList } from "../services/api";
import DropdownStatusMatrial from '../components/DropdpwmStatusMatrial';
import NavBar from "../components/NavBar";
import DropdpwmPaymentOptions from "../components/DropdpwmGuaranteeOptions";

const Lease = () => {

  const location = useLocation();
  const [property, setProperty] = useState(location.state?.property || null);

  const [tenantCPF, setTenantCPF] = useState("");
  const [foundCPF, setFoundCPF] = useState(null);
  const [allCPFs, setAllCPFs] = useState(new Set());

  const [newUserCPF, setNewUserCPF] = useState('');
  const [newUserMatrialStatus, setMS] = useState('');
  const [newUserWhatsApp, setNewUserWhatsApp] = useState('');

  const [blockPayment, setBlockPayment] = useState(null);

  const [guaranteMethod, setguaranteeMethod] = useState('');

  const [dates, setDates] = useState({ from: "", to: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
  };

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
      setBlockPayment(true);
    }
    else
    {
      setFoundCPF(false);
      setBlockPayment(true);
    } 
  };

  const createLease = () => {
    console.log(property.propertyType);
  }
  
  return (
    <div>
      <NavBar/>
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
          type='number'
          onChange={handleTenantCPFChange} 
          maxLength={11}
        />
        {foundCPF === true &&       
          <form>
            <p>Usuario ja cadastrado</p>          
           
          </form>
        }
        {foundCPF === false &&

          <form>
             <p>Usuario não cadastrado</p>
            <div>
                <label>User CPF</label>
                  <input
                    type="number"               
                    placeholder="Enter user CPF"
                    value={newUserCPF} 
                    onChange={(e) => setNewUserCPF(e.target.value)}                  
                  />
            </div>
            <div>
                <label>User WhatsApp</label>
                  <input
                    type="number"               
                    placeholder="Enter user WhatsApp"   
                    value={newUserWhatsApp} 
                    onChange={(e) => setNewUserWhatsApp(e.target.value)}                 
                  />
            </div>
            
            <div>
                <label>Marital status</label> 
                <DropdownStatusMatrial value={newUserMatrialStatus} matrialStatusSelectHandler={setMS} />               
            </div>
          </form>
        }
        {
          blockPayment === true && 
          <form>
            <div>
                <label>Guarantee Form</label>
                 <DropdpwmPaymentOptions value={guaranteMethod} guaranteeMethodSelectHandler={setguaranteeMethod} />
            </div>

            <label>Lease term</label>
            <div className="date-fields">
            
              <div className="form-group">
                <label htmlFor="from">From:</label>
                <input type="date" id="from" name="from" value={dates.from} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="to">To:</label>
                <input type="date" id="to" name="to" value={dates.to} onChange={handleChange} required />
              </div>
            </div>
            
            <label>Adjustment date</label>
            <input type='number'/>

            <label>History</label>
            <textarea
            type="text"
            id="maritalStatus"
            name="maritalStatus"           
            placeholder="Enter marital status"
            required
          />
            
          </form>
        }
      </div>

      <button disabled={!foundCPF} onClick={() => createLease()} >Confirm Lease</button>

    </div>
    </div>
 
  );
};

export default Lease;
