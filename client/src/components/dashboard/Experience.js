import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
const Experience = ({ experienceList, deleteExperience }) => {
  return (
    <>
      <h2 className="my-2">&Eacute;xperiences</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Entreprise</th>
            <th className="hide-sm">Titre</th>
            <th className="hide-sm">Années</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experienceList.map(({ company, title, from, to, _id }) => (
            <tr key={_id}>
              <td>{company}</td>
              <td className="hide-sm">{title}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                {to == null || "" ? (
                  "Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExperience(_id)}
                >
                  Effacer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experienceList: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};
const mapDispatchToProps = {
  deleteExperience: deleteExperience
};

export default connect(null, mapDispatchToProps)(Experience);
