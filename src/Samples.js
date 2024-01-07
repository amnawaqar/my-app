import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Samples = ({ onDataSaved }) => {
  const { id } = useParams();
  const [SapiData, setApiData] = useState(null);
  const [isFieldsVisible, setIsFieldsVisible] = useState(false);
  const [DonorCount, setDonorCount] = useState('');
  const [MaterialType, setMaterialType] = useState('');
  const Save = async () => {
    if (!DonorCount.trim() || !MaterialType.trim()) {
      alert('Both fields are mandatory');
      return;
    }
    else {
      const postData = {
        BioBankId: id,
        Donor_Count: DonorCount,
        Material_Type:MaterialType,
        Sample_Id:0
      };
  
      
        const response = await axios.post(`https://localhost:7252/api/Samples`,postData,{headers:{"Content-Type" : "application/json"}});
  
        if (response.status === 200) {
         
          alert('Data saved successfully!');
          //onDataSaved(response.data); 
          window.location.reload(); 
          
          
        } 
        
      else{
      
        alert('Failed to save data');
      }

    }}
  const AddNewSample = () => {
    setIsFieldsVisible(true);
  };
  const handleChange = (e) => {
   
    const numericValue = e.target.value.replace(/\D/g, '');
    setDonorCount(numericValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7252/api/Samples/${id}`);
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
<div>
      {SapiData && SapiData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Sample Id</th>
              <th>Donor Count</th>
              <th>Material Type</th>
              <th>Last updated</th>
            </tr>
          </thead>

          <tbody>
            {SapiData.map((material, index) => (
              <tr key={index}>
                <td>{material.sample_Id}</td>
                <td>{material.donor_Count}</td>
                <td>{material.material_Type}</td>
                <td>{material.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
    
      ) : (
        <p>No data found</p>
      )}
      <button  onClick={() => AddNewSample()}>Add</button>
        {isFieldsVisible && (
        <div>
          <input
            
            type="text" pattern="[0-9]*"
            value={DonorCount}
            onChange={handleChange}
            placeholder="Donor Count"  required
          />
          <input
            type="text"
            value={MaterialType}
            onChange={(e) => setMaterialType(e.target.value)}
            placeholder="Material Type" required
          />
          <button onClick={Save}>Save</button>
        </div>
         )}
    </div>
  );
};
export default Samples