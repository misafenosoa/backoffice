/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../Config';
import { useNavigate } from 'react-router-dom';

export default function ModelesStat() {
  const [modelesStats, setModelesStats] = useState([]);
  const handleUnauthorized = () => {
    // Détruisez le token et redirigez vers la page de connexion
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken) {
      // Redirect to ValidationAnnonce if the token is present
      navigate('/');
    } 
    else{
      fetchData();
    } 
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `${accessToken}`,
      };
      const response = await axios.get(`${API_BASE_URL}/modelesStats`, { headers });
      const modelesStatsData = response.data.listModelesStats || [];
      setModelesStats(modelesStatsData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
    }
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Statistiques de modèle</h4>
          <p className="card-description">Plutôt lié au client <code>Client</code></p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nom du modèle</th>
                  <th>Prix de vente moyen</th>
                  <th>Nombre total d'annonces</th>
                </tr>
              </thead>
              <tbody>
                {modelesStats.map((modeleStat) => (
                  <tr key={modeleStat.nomModeles}>
                    <td>{modeleStat.nomModeles}</td>
                    <td>{modeleStat.prixVenteMoyenne}</td>
                    <td>{modeleStat.nbAnnonces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
