/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSave } from 'react-icons/fa';
import Modal from 'react-modal'; // Importez le composant Modal
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../Config';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function AdminsList() {
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default items per page
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
    const [adminsData, setAdminsData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewRow, setIsNewRow] = useState(false);
    const [pages ,setPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1); // Default current page
    const [editedData, setEditedData] = useState({
      idutilisateur: '',
      mail: '',
      prenom: '',
      birthday: '',
      nom: '',
      hierarchie: '',
    });
    const [error, setError] = useState(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false); // Nouvel état pour contrôler l'ouverture/fermeture du modal
    const [newUserData, setNewUserData] = useState({
        mail: '',
        prenom: '',
        nom: '',
        hierarchie: '',
        mdp: '',
        birthday: null, // Ajoutez la date d'anniversaire
      });
    
      
  
    const navigate = useNavigate();
  
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
    const response = await axios.get(`${API_BASE_URL}/admins/${currentPage-1}/${itemsPerPage}`, { headers });
    setAdminsData(response.data.listUtilisateur);  //tsy miova
    setPages(response.data.page)  //miampy
    if (response.data.errors != null) {
      setError(response.data.errors);
    }
    } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorized();
    }
      setError("Une erreur s'est produite.");

      console.error('Failed to fetch categorie data', error);
    }
};
// HATRETO

  const handleUnauthorized = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleEditClick = (admin) => {
    setIsEditing(true);
    setEditedData(admin);
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
        const response = await axios.post(
          `${API_BASE_URL}/admins`,
          {
            utilisateur: editedData,
            mdp: 'password', // Mettez le mot de passe approprié ici
          },
          { headers }
        );
        if (response.data.errors !== null) {
          setError(response.data.errors);
        }
      } else {
        console.log(editedData)

        const response = await axios.put(
          `${API_BASE_URL}/utilisateurs/${editedData.idutilisateur}`,
          {
            utilisateur: editedData,
          },
          { headers }
        );
        if (response.data.errors !== null) {
          setError(response.data.errors);
        } else {
          setError(null);
        }
      }

      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      console.error('Failed to update admins data', error);
      setError("Une erreur s'est produite.");
    }

    setEditedData({
      idutilisateur: '',
      mail: '',
      prenom: '',
      birthday: '',
      nom: '',
      hierarchie: '',
    });
    setIsNewRow(false);
  };

  const handleDeleteClick = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `${accessToken}`,
      };

      const response = await axios.delete(`${API_BASE_URL}/utilisateurs/${id}`, { headers });
      if (response.data.errors !== null) {
        setError(response.data.errors);
      } else {
        setError(null);
      }
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      setError("Une erreur s'est produite.");
      console.error('Failed to delete admins data', error);
    }
  };

 
  const handleAddRowClick = () => {
    setIsNewRow(true);
    setIsModalOpen(true); // Ouvre le modal au lieu d'activer l'édition
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsNewRow(false);

    setEditedData({
      idutilisateur: '',
      mail: '',
      prenom: '',
      birthday: '',
      nom: '',
      hierarchie: '',
    });
  };

  const handleModalSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `${accessToken}`,
      };

      const response = await axios.post(
        `${API_BASE_URL}/admins`,
        {
          utilisateur: newUserData,
          mdp: 'password', // Mettez le mot de passe approprié ici
        },
        { headers }
      );

      if (response.data.errors !== null) {
        setError(response.data.errors);
      } else {
        setError(null);
      }

      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      console.error('Failed to add new admin', error);
      setError("Une erreur s'est produite.");
    }

    setIsModalOpen(false); // Ferme le modal après la soumission
    setNewUserData({
      mail: '',
      prenom: '',
      nom: '',
      hierarchie: '',
    });
    setIsNewRow(false);
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Liste des administrateurs</h4>
          <p className="card-description">
            <code>Modifier, Ajouter, Supprimer</code>
          </p>
          <button className="btn btn-inverse-primary btn-fw" onClick={handleAddRowClick}>
            <FaPlus /> Ajouter
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}


          <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Ajouter un utilisateur"
                className="custom-modal"
                >
                <h2 className='titlemodal'>Ajouter un utilisateur</h2>
                <form>
                    <label>Mail:</label>
                    <input
                    type="text"
                    value={newUserData.mail}
                    onChange={(e) => setNewUserData({ ...newUserData, mail: e.target.value })}
                    />

                    <label>Prénom:</label>
                    <input
                    type="text"
                    value={newUserData.prenom}
                    onChange={(e) => setNewUserData({ ...newUserData, prenom: e.target.value })}
                    />

                    <label>Nom:</label>
                    <input
                    type="text"
                    value={newUserData.nom}
                    onChange={(e) => setNewUserData({ ...newUserData, nom: e.target.value })}
                    />

                    <label>Hiérarchie:</label>
                    <input
                    type="text"
                    value={newUserData.hierarchie}
                    onChange={(e) => setNewUserData({ ...newUserData, hierarchie: e.target.value })}
                    />

                    <label>Mot de passe:</label>
                    <input
                    type="password"
                    value={newUserData.mdp}
                    onChange={(e) => setNewUserData({ ...newUserData, mdp: e.target.value })}
                    />

                    <label>Date d'anniversaire:</label>
                    <DatePicker
                    selected={newUserData.birthday}
                    onChange={(date) => setNewUserData({ ...newUserData, birthday: date })}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    />

                    <button className="btn btn-inverse-primary btn-fw" onClick={handleModalSubmit}>
                    Ajouter
                    </button>
                </form>
            </Modal>    

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>IdUtilisateur</th>
                  <th>Mail</th>
                  <th>Prenom</th>
                  <th>Birthday</th>
                  <th>Nom</th>
                  <th>Hierarchie</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {adminsData.map((admin) => (
                  <tr key={admin.idutilisateur}>
                    <td>{admin.idutilisateur}</td>
                    <td>
                      {isEditing && editedData.idutilisateur === admin.idutilisateur ? (
                        <input
                          className='form-control'
                          type="text"
                          value={editedData.mail}
                          onChange={(e) => handleInputChange(e, 'mail')}
                        />
                      ) : (
                        admin.mail
                      )}
                    </td>
                    <td>
                      {isEditing && editedData.idutilisateur === admin.idutilisateur ? (
                        <input
                          className='form-control'
                          type="text"
                          value={editedData.prenom}
                          onChange={(e) => handleInputChange(e, 'prenom')}
                        />
                      ) : (
                        admin.prenom
                      )}
                    </td>
                    <td>{admin.birthday}</td>
                    <td>
                      {isEditing && editedData.idutilisateur === admin.idutilisateur ? (
                        <input
                          className='form-control'
                          type="text"
                          value={editedData.nom}
                          onChange={(e) => handleInputChange(e, 'nom')}
                        />
                      ) : (
                        admin.nom
                      )}
                    </td>
                    <td>
                      {isEditing && editedData.idutilisateur === admin.idutilisateur ? (
                        <input
                          className='form-control'
                          type="text"
                          value={editedData.hierarchie}
                          onChange={(e) => handleInputChange(e, 'hierarchie')}
                        />
                      ) : (
                        admin.hierarchie
                      )}
                    </td>
                    <td>
                      {isEditing && editedData.idutilisateur === admin.idutilisateur ? (
                        <button className='btn btn-inverse-success btn-fw' onClick={handleSaveClick}>
                          {isNewRow ? <FaCheck /> : <FaSave />}
                        </button>
                      ) : (
                        <FaEdit
                          style={{ color: 'green', cursor: 'pointer' }}
                          onClick={() => handleEditClick(admin)}
                        />
                      )}
                    </td>
                    <td>
                      {isEditing && editedData.idutilisateur === admin.idutilisateur ? (
                        <button className="btn btn-inverse-danger btn-fw" onClick={handleCancelClick}>
                          <FaTimes />
                        </button>
                      ) : (
                        <FaTrash
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDeleteClick(admin.idutilisateur)}
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
                        placeholder="Nouveau mail"
                        value={editedData.mail}
                        onChange={(e) => handleInputChange(e, 'mail')}
                      />
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type="text"
                        placeholder="Nouveau prénom"
                        value={editedData.prenom}
                        onChange={(e) => handleInputChange(e, 'prenom')}
                      />
                    </td>
                    <td></td>
                    <td>
                      <input
                        className='form-control'
                        type="text"
                        placeholder="Nouveau nom"
                        value={editedData.nom}
                        onChange={(e) => handleInputChange(e, 'nom')}
                      />
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type="text"
                        placeholder="Nouvelle hiérarchie"
                        value={editedData.hierarchie}
                        onChange={(e) => handleInputChange(e, 'hierarchie')}
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
                              {/* MISA */}
              <Pagination count={pages} color="secondary" onChange={handlePageChange} />
            </Stack>
          </div>

        </div>
      </div>
    </div>
  );
  
}