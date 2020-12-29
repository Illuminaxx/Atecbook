import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  function onChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      setAlert("paswords do not match", "danger");
    } else {
      try {
        register(name, email, password);
      } catch (err) {
        console.error(err);
      }
    }
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Créer un compte</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Créer votre compte
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nom"
            name="name"
            required
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Adresse mail"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
           Ce site utilise Gravatar, donc si vous voulez une image de profil, utilisez le courriel associé à Gravatar
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="S'inscrire" />
      </form>
      <p className="my-1">
        Vous avez déjà un compte ? <Link to="/login">S'identifier</Link>
      </p>
      </section>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  setAlert,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
