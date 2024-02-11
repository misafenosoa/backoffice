/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../Config';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CarburantCRUD() {

  
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default items per page
  const [carburantData, setCarburantData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewRow, setIsNewRow] = useState(false);
  const [pages ,setPages] = useState(10);
  const [editedData, setEditedData] = useState({
    IdMarque: '',
    Marque: '',
  });
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
  };
    // MISA
  const [currentPage, setCurrentPage] = useState(1); // Default current page
  const [error, setError] = useState(null); // Nouvel état pour stocker les erreurs
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const navigate = useNavigate(); // Initialisez useNavigate
  
  const handleUnauthorized = () => {
    // Détruisez le token et redirigez vers la page de connexion
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]); // Update data when currentPage or itemsPerPage changes

  const fetchData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `${accessToken}`,
    };
   

   //  MISA
   try {
    // ETO MIOVA
      const response = await axios.get(`${API_BASE_URL}/carburants/${currentPage-1}/${itemsPerPage}`, { headers });
      setCarburantData(response.data.listCarburant);  //tsy miova
      setPages(response.data.page)  //miampy
      if (response.data.errors != null) {
        setError(response.data.errors);
      }
    } 
    catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      setError("Une erreur s'est produite.");

      console.error('Failed to fetch categorie data', error);
    }
  };
// HATRETO

  const handleEditClick = (id, marque) => {
    setIsEditing(true);
    setEditedData({
      IdMarque: id,
      Marque: marque,
    });
  };

  const handleInputChange = (e, columnName) => {
    setEditedData({
      ...editedData,
      [columnName]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `${accessToken}`,
      };

      if (isNewRow) {
        // Logic for adding a new row
        const response=  await axios.post(
            `${API_BASE_URL}/carburants`,
            {
              carburant: {
                carburant: editedData.Marque,
              },
            },
            { headers }
          );
          if(response.data.errors!=null){
            setError(response.data.errors);
          }
      } else {
        // Logic for updating an existing row
        const response=  await axios.put(
            `${API_BASE_URL}/carburants/${editedData.IdMarque}`,
            {
              carburant: {
                carburant: editedData.Marque,
              },
            },
            { headers }
          );
          if(response.data.errors!=null){
            setError(response.data.errors);
          }      else{
            // Clear any existing errors
    setError(null);

    }
      }

      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      console.error('Failed to update carburant data', error);
      setError("Une erreur s'est produite.");

    }

    // Reset editedData and isNewRow state
    setEditedData({
      IdMarque: '',
      Marque: '',
    });
    setIsNewRow(false);
  };

  const handleDeleteClick = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `${accessToken}`,
      };

      const response = await axios.delete(`${API_BASE_URL}/carburants/${id}`, { headers });
      if(response.data.errors!=null){
        setError(response.data.errors);
      }      else{
        // Clear any existing errors
setError(null);

}
      fetchData();

    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      setError("Une erreur s'est produite.");
      console.error('Failed to delete carburant data', error);
    }
  };

  const handleAddRowClick = () => {
    setIsNewRow(true);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsNewRow(false);

    // Reset editedData state
    setEditedData({
      IdMarque: '',
      Marque: '',
    });
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Les détails du carburant</h4>
          <p className="card-description">
            <code>Modifier, Ajouter, Supprimer</code>
          </p>
          <button className="btn btn-inverse-primary btn-fw" onClick={handleAddRowClick}>
            <FaPlus /> Ajouter
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichage de l'erreur */}

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>IdMarque</th>
                  <th>Marque</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carburantData.map((data) => (
                  <tr key={data.idCarburant}>
                    <td>{data.idCarburant}</td>
                    <td>
                      {isEditing && editedData.IdMarque === data.idCarburant ? (
                        <input
                          className='form-control'
                          type="text"
                          value={editedData.Marque}
                          onChange={(e) => handleInputChange(e, 'Marque')}
                        />
                      ) : (
                        data.carburant
                      )}
                    </td>
                    <td>
                      {isEditing && editedData.IdMarque === data.idCarburant ? (
                        <button className='btn btn-inverse-success btn-fw' onClick={handleSaveClick}>
                          {isNewRow ? <FaCheck /> : <FaSave />}
                        </button>
                      ) : (
                        <FaEdit
                          style={{ color: 'green', cursor: 'pointer' }}
                          onClick={() => handleEditClick(data.idCarburant, data.carburant)}
                        />
                      )}
                    </td>
                    <td>
                      {isEditing && editedData.IdMarque === data.idCarburant ? (
                        <button className="btn btn-inverse-danger btn-fw" onClick={handleCancelClick}>
                          <FaTimes />
                        </button>
                      ) : (
                        <FaTrash
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDeleteClick(data.idCarburant)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
                {isEditing && isNewRow && (
                  <tr>
                    <td></td>
                    <td>
                      <input
                        className='form-control'
                        type="text"
                        placeholder="Nouveau carburant"
                        value={editedData.Marque}
                        onChange={(e) => handleInputChange(e, 'Marque')}
                      />
                    </td>
                    <td>
                      <button className='btn btn-inverse-success btn-fw' onClick={handleSaveClick}>
                        <FaCheck />
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-inverse-danger btn-fw" onClick={handleCancelClick}>
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Misa */}
          <div className="misa">
            <div className="items-per-page-input">
              <label htmlFor="itemsPerPage">Elements par page:</label>
              <input
                type="number"
                id="itemsPerPage"
                name="itemsPerPage"
                min="1"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              />
            </div>
            <Stack spacing={2}>
              <Pagination count={pages} color="secondary" onChange={handlePageChange} />
            </Stack>
          </div>
          
        </div>
      </div>
    </div>
  );
}
