import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import EduExp from "./EduExp";
import { Link } from "react-router-dom";
import Loading from "../layout/loading";

const Profile = ({
  profile: { profile, loading },
  auth: { user },
  match,
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [match, loading, getProfileById]);
  return (
    <>
      <section className="container">
      <>
        <Link to="/profiles" className="btn btn-light">
          Retour aux profils
        </Link>
        {user !== null && user._id === match.params.id ? (
          <Link to="/edit-profile" className="btn btn-light">
            Editer le profil
          </Link>
        ) : null}
      </>
      {profile != null ? (
        <>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <EduExp profile={profile} />
        </>
      ) : (
        <Loading />
      )}
      </section>
    </>
 
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = {
  getProfileById: getProfileById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
