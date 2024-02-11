/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Link } from "react-router-dom";
import { TiChartBar, TiCogOutline, TiBriefcase  , TiUser, TiExport } from 'react-icons/ti'; // Import des icônes Ti (Titanium)
import { FaCheckSquare } from 'react-icons/fa'; // Import d'une icône de validation de FontAwesome

export default function SideNav({ params }) {
    const [isActive] = useState(false);

    return (
        <nav className={`sidebar sidebar-offcanvas ${isActive ? 'active' : ''}`} id="sidebar">
            <ul className="nav">
                <li className={`nav-item ${params === 'Validation' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/validation">
                        <FaCheckSquare  className="icon" id="con"/>
                        <span className="menu-title">Validation</span>
                    </Link>
                </li>
                <li className={`nav-item ${params === 'SeeStatistics' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/statistics">
                        <TiChartBar className="icon" id="con"/>
                        <span className="menu-title">Voir les statistiques</span>
                    </Link>
                </li>
                <li className={`nav-item ${params === 'CreateCarModel' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/createModel">
                        <TiCogOutline className="icon" id="con"/>
                        <span className="menu-title">Creation de modele</span>
                    </Link>
                </li>

                <li className={`nav-item ${params === 'ManageInformation' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/elements">
                        <TiBriefcase className="icon" id="con"/>
                        <span className="menu-title">Infos-modeles</span>
                    </Link>
                </li>
                <li className={`nav-item ${params === 'UserAdmin' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/admins">
                        <TiUser className="icon" id="con"/>
                        <span className="menu-title">Les administrateurs  </span>
                    </Link>
                </li>
                <li className={`nav-item ${params === 'Deconnexion' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/deconnection">
                        <TiExport className="icon"  id="con"/>
                        <span className="menu-title">Se deconnecter  </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
