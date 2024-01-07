// Tissue.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tissue = () => {
  const [apiData, setApiData] = useState(null);
  const [isFieldsVisible, setIsFieldsVisible] = useState(false);
  const [dieaseTerm, setdieaseTerm] = useState('');
  const [Title, setTitle] = useState('');

  const Save = async () => {
    if (!dieaseTerm.trim() || !Title.trim()) {
      alert('Both fields are mandatory');
      return;
    }
    else {
      const postData = {
        
        dieaseTerm:dieaseTerm,
        title:Title
    
      };
        const response = await axios.post(`https://localhost:7252/api/BioBank`,postData,{headers:{"Content-Type" : "application/json"}});
  
        if (response.status === 200) 
          {alert('Data saved successfully!')
          window.location.reload();  
        } 
      else{
        alert('Failed to save data');
      }

    }}
  
  const AddNewSample = () => {
    setIsFieldsVisible(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7252/api/BioBank');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openSamplesInNewTab = (id) => {
    window.open(`/samples/${id}`, '_blank');
  };

  return (
    <div>
      {apiData ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DiseaseTerm</th>
              <th>Title</th>
              <th>Samples</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((material, index) => (
              <tr key={index}>
                <td>{material.id}</td>
                <td>{material.dieaseTerm}</td>
                <td>{material.title}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => openSamplesInNewTab(material.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Refresh the Application...</p>
      )}
      <button  onClick={() => AddNewSample()}>Add</button>
        {isFieldsVisible && (
        <div>
          <input
            
            type="text" pattern="[0-9]*"
            value={dieaseTerm}
            onChange={(e) => setdieaseTerm(e.target.value)}
            placeholder="Diease Term"  required
          />
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title" required
          />
          <button onClick={Save}>Save</button>
        </div>
         )}
    </div>
  );
};

export default Tissue;
