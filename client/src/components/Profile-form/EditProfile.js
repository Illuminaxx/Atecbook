import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const EditProfile = ({
  createProfile,
  history,
  profile: { profile, loading }
}) => {
  const [socialvisible, toggle] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  useEffect(() => {
    if (!loading) {
      setFormData({ ...profile });
    }
  }, [loading, profile]);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(() => ({
      ...formData,
      [name]: value
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Editer votre profil</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Quelques informations pour votre
        profil.
      </p>
      <small>*Champs requis</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">-- Je suis --</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UX Design">UX & Design</option>
            <option value="Performance digitale">Performance digitale</option>
            <option value="Qualité">Qualité</option>
            <option value="Agile Projets">Agile & Projets</option>
            <option value="Conseil digital">Conseil digital</option>
            <option value="Mobilité">Mobilité</option>
            <option value="Direction Conseil">Direction Conseil</option>
            <option value="Ressources Humaines Communication">Ressources Humaines & Communication</option>
          </select>
          <small className="form-text">
            Choisissez ce que vous voulez, sans poser de questions !
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Votre entreprise
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Vous n'êtes pas célèbre si vous n'avez pas de site web
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Ville
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Veuillez utiliser une virgule pour séparer vos compétences
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Parlez-nous un peu de vous !</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light social-media"
            onClick={() => toggle(!socialvisible)}
          >
            Ajouter vos réseaux sociaux
          </button>
          <small className="form-text">Optionnel</small>
        </div>
        {socialvisible && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1 return-button" to="/dashboard">
          Retour
        </Link>
      </form>
      </section>
    </>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  createProfile: createProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
