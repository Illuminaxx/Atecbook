import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  function onChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    //console.log("submited");
    e.preventDefault();
    login(email, password);
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Connexion</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Entrez vos données de connexion
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Adresse email"
            name="email"
            value={email}
            onChange={onChange}
            aria-labelledby="email-label"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
            aria-labelledby="pwd-label"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Connexion" />
      </form>
      <p className="my-1">
        Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
      </p>
      </section>
    </>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
