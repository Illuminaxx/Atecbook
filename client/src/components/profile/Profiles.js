import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";


import { Link } from "react-router-dom";
const Profiles = ({ getAllProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Communautés</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Naviguez et connectez-vous avec des personnes similaires
      </p>
      <div className="profiles">
        {profiles.map((dev) => (
          <div key={dev._id} className="profile bg-light">
            <img className="round-img" src={dev.user.avatar} alt="user" />
            <div>
              <h2>{dev.user.name}</h2>
              <p>{dev.status}</p>
              <p>{dev.location}</p>
              <Link to={`/profile/${dev.user._id}`} className="btn btn-primary">
                Voir profil
              </Link>
            </div>

            <ul>
              {dev.skills.map((skill) => (
                <li className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </section>
    </>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getAllProfiles: getAllProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
