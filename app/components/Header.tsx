import React from 'react';

const Header = () => {
  let headerColor, textColor, label;
  switch (process.env.VERCEL_ENV) {
    case 'local':
      headerColor = 'warning';
      textColor = 'dark';
      label = '(Localhost)';
      break;
    case 'preview':
      headerColor = 'secondary';
      textColor = 'light';
      label = '(Dev)';
      break;
    case 'production':
      headerColor = 'primary';
      textColor = 'light';
      break;
  }
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-${headerColor}`}>
      <div className="container-fluid">
        <a className={`navbar-brand text-${textColor}`} href="/transfer">
          Moon Bees Inventory {label}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link text-${textColor}`}
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            {/* <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li> */}
            {/* <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
        </li> */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle text-${textColor}`}
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                API Endpoints
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className={`dropdown-item`} href="/catalog">
                    Catalog (Pretty)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/api/catalog">
                    Catalog (JSON)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/api/inventory">
                    Inventory
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="api/locations">
                    Locations
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
