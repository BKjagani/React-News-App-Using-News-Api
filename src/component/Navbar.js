import React from "react";

export default function Navbar(props) {
 

  let idArr = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const handleCategoryClick = (category) => {
    props.setCategory(category);
    
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <div className="navbar-brand">News App</div>
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
                <div
                  className="nav-link active btn"
                  id={idArr[0]}
                  aria-current="page"
                  onClick={() => {
                    handleCategoryClick("general");
                  }}
                >
                  General
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link btn"
                  id={idArr[1]}
                  onClick={() => handleCategoryClick("business")}
                >
                  Business
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link btn"
                  id={idArr[2]}
                  onClick={() => handleCategoryClick("entertainment")}
                >
                  Entertainment
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link btn"
                  id={idArr[3]}
                  onClick={() => handleCategoryClick("health")}
                >
                  Health
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link btn"
                  id={idArr[4]}
                  onClick={() => handleCategoryClick("science")}
                >
                  Science
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link btn"
                  id={idArr[5]}
                  onClick={() => handleCategoryClick("sports")}
                >
                  Sports
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link btn"
                  id={idArr[6]}
                  onClick={() => handleCategoryClick("technology")}
                >
                  Technology
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
