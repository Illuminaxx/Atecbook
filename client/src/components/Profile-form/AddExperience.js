import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import { connect } from "react-redux";

function AddExperience({ addExperience, history }) {
  const [toggleTo, setToggelTo] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false
  });
  const { title, company, location, from, to, current } = formData;

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Ajouter une expérience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Ajouter les postes que vous avez occupés dans le passé
      </p>
      <small>*required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={e => onChange(e)}
            aria-label="Titre du job"
            aria-required="true"
            title="Titre du job"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={e => onChange(e)}
            aria-label="Entreprise"
            aria-required="true"
            title="Entreprise où s'effectue le travail"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
            aria-label="Lieu"
            title="Lieu d'exercise de la fonction"
          />
        </div>

        <div className="form-group">
          <h4>De</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
            aria-label="Date de début"
            title="Date de début de la prise de fonction"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                setToggelTo(!toggleTo);
              }}
              aria-label="Entreprise actuelle"
              title="Entreprise où se déroule l'emploi"
            />{" "}
            Entreprise actuelle ?
          </p>
        </div>
        {toggleTo && (
          <div className="form-group">
            <h4>&Agrave;</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={e => onChange(e)}
              aria-label="Date de fin"
              title="Date de fin de la prise de fonction"
            />
          </div>
        )}

        <input type="submit" className="btn btn-primary my-1" title="Ajouter une expérience professionnelle à notre curriculum vitae" />
        <Link className="btn btn-light my-1" to="/dashboard" value="Revenir au tableau de bord">
          Retour
        </Link>
      </form>
      </section>
    </>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addExperience: addExperience
};

export default connect(null, mapDispatchToProps)(withRouter(AddExperience));
