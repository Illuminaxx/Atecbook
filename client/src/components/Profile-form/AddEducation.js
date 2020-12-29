import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import { connect } from "react-redux";

function AddEducation({ addEducation, history }) {
  const [toggleTo, setToggelTo] = useState(true);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: ""
  });
  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description
  } = formData;

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
    addEducation(formData, history);
  };
  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Ajoutez votre formation</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Ajouter une école, un bootcamp, etc.
      </p>
      <small>*required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
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
            />{" "}
            &Eacute;cole ou bootcamp actuel ?
          </p>
        </div>
        {toggleTo && (
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={e => onChange(e)}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Retour
        </Link>
      </form>
      </section>
    </>
  );
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addEducation: addEducation
};

export default connect(null, mapDispatchToProps)(withRouter(AddEducation));
