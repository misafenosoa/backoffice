import { useState } from "react";
import { Link } from "react-router-dom";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Header() {
  const [, setSidebarIconOnly] = useState(false);

  const toggleSidebarClass = () => {
    setSidebarIconOnly((prev) => !prev);
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
    document.body.classList.toggle('sidebar-icon-only');
  };
    return( 
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="nav-link" to="/validation">
          <a class="navbar-brand brand-logo mr-5"><img src="images/A.O.C.svg" class="mr-2" alt="logo"/></a>
          <a class="navbar-brand brand-logo-mini" ><img src="images/A.O.C.svg" alt="logo"/></a>
        </Link>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button class="navbar-toggler navbar-toggler align-self-center" id="toggleButton" type="button" data-toggle="minimize"
                  onClick={toggleSidebarClass}
                  >
            <span class="icon-menu"></span>
          </button>
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a class="dropdown-item">
                  <i class="ti-settings text-primary"></i>
                  Settings
                </a>
                <a class="dropdown-item">
                  <i class="ti-power-off text-primary"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas"
                  onClick={toggleSidebarClass}
                  >
            <span class="icon-menu"></span>
          </button>
        </div>
    </nav>
    )
}