/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../Config';
import {  useNavigate } from 'react-router-dom';

export default function AnnoncesStat() {
  const [annoncesClotureesStats, setAnnoncesClotureesStats] = useState([]);
  const navigate = useNavigate();
  const handleUnauthorized = () => {
    // Détruisez le token et redirigez vers la page de connexion
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
      // Check if the token is already present in local storage
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
      const response = await axios.get(`${API_BASE_URL}/AnnoncesClotureesStats`, { headers });
      const annoncesClotureesStatsData = response.data.listAnnoncesClotureesStats || [];
      setAnnoncesClotureesStats(annoncesClotureesStatsData);
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
          <h4 className="card-title">Vente et bénéfice</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nom du modèle</th>
                  <th>Nombre total de voitures vendues</th>
                  <th>Bénéfice du site</th>
                </tr>
              </thead>
              <tbody>
                {annoncesClotureesStats.map((annonceStat) => (
                  <tr key={annonceStat.nomModele}>
                    <td>{annonceStat.nomModele}</td>
                    <td>{annonceStat.nbrePosteClotures}</td>
                    <td>{annonceStat.prixvendu}</td>
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
