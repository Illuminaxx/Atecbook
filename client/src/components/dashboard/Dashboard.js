import React, { useEffect} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Loader from "../layout/loading";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    <Loader />
  ) : (
    <>
      <h1 className="large text-primary">Tableau de bord</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Bienvenue {user && user.name} !
      </p>
      {profile == null ? (
        <>
          <p>Vous devez créer un profil, veuillez ajouter des détails</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Créer un profil
          </Link>
        </>
      ) : (
        <>
          <DashboardAction />
          <Experience experienceList={profile.experience} />
          <Education educationList={profile.education} />
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
           Supprimer mon compte
          </button>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = {
  getCurrentProfile: getCurrentProfile,
  deleteAccount: deleteAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
