import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/PropertyForm.css";
import { getList, postBody } from "../services/api";
import DropdownStatusMatrial from '../components/DropdpwmStatusMatrial';
import NavBar from "../components/NavBar";
import DropdpwmPaymentOptions from "../components/DropdpwmGuaranteeOptions";

const Lease = () => {

  const location = useLocation();
  const [property, setProperty] = useState(location.state?.property || null);

  const [tenantCPF, setTenantCPF] = useState("");
  const [foundCPF, setFoundCPF] = useState(null);
  const [allCPFs, setAllCPFs] = useState(new Set());

  const [newUserMatrialStatus, setMS] = useState('');
  const [newUserWhatsApp, setNewUserWhatsApp] = useState('');

  const [blockPayment, setBlockPayment] = useState(null);

  const [guaranteMethod, setguaranteeMethod] = useState('');

  const [dates, setDates] = useState({ from: "", to: "" });

  const [history , setHistory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    
    const fetchCPFs = async () => {

      try {     
        
        const response = await getList('http://localhost:7000/api/tenant/');
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

  const createLease = async () => {
    
    //Create lease
    if(!dates.from){
      alert('Please fill date from')
      return;
    }
    else if(!dates.to){
      alert('Please fill date to')
      return;
    }

    try {

      const formattedDate = formatDateForBackend(dates.from);

      if(foundCPF)
      {
        //If user already exist in the base
        const searchUserExisting = await getList('http://localhost:7000/api/tenant/foundCPF/' + tenantCPF)

        const leaseDt = 
        {
          "tenant":searchUserExisting._id,
          "property": property._id,
          "startDate":dates.from,
          "endDate":dates.to,
          "rentAmount":property.price,
          "status":'active',
          "guarant":guaranteMethod,
          "adjustmentDate":formattedDate,
          "history":history
        };

        const reponse =  await postBody('http://localhost:7000/api/Lease',leaseDt,'POST');
      }
      else
      {
        //Fast insert in user table (just essencial data)        
        const fastCreateTenant = {
          "cpf":tenantCPF,
          "matrialStatus":newUserMatrialStatus,
          "phone":newUserWhatsApp
        }

        const createNewUser =  await postBody('http://localhost:7000/api/tenant',fastCreateTenant,'POST');

          console.log(createNewUser.tenant._id)


        const leaseDt = 
        {
          "tenant":createNewUser.tenant._id,
          "property": property._id,
          "startDate":dates.from,
          "endDate":dates.to,
          "rentAmount":property.price,
          "status":'active',
          "guarant":guaranteMethod,
          "adjustmentDate":formattedDate,
          "history":history
        };

        const reponse =  await postBody('http://localhost:7000/api/Lease',leaseDt,'POST');
        
      }   

      setTenantCPF('');
      setNewUserWhatsApp('');
      setDates({ from: "", to: "" });
      setFoundCPF('');
      setHistory('');
      newUserMatrialStatus(0);
      setguaranteeMethod(0);
      setMS(0);

    } catch (error) {
      console.log('There was some error in save Lease')
    }    
  }

  const formatDateForBackend = (date) => {
    if (!date) return null; // Handle empty case
    const d = new Date(date);
    const backendDate = d.toISOString().split('T')[0];
    return backendDate;
};

const paymentMethodSelectHandler = (gm) =>
{
  console.log(gm._id)
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
                 <DropdpwmPaymentOptions value={guaranteMethod} paymentMethodSelectHandler={setguaranteeMethod} />
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
            id="history"
            name="history"               
            required
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />
            
          </form>
        }
      </div>

      <button  onClick={() => createLease()} >Confirm Lease</button>

    </div>
    </div>
 
  );
};

export default Lease;
