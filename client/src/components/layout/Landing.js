import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">ATEC'book</h1>
          <p className="lead">
          La réussite de votre transformation digitale
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Créer un compte
            </Link>
            <Link to="/login" className="btn btn-light">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propType = {
  isAuthenticated: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
