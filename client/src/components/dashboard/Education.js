import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";
import { connect } from "react-redux";

const Education = ({ educationList, deleteEducation }) => {
  return (
    <>
      <h2 className="my-2">Diplômes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>&Eacute;cole</th>
            <th className="hide-sm">Diplôme</th>
            <th className="hide-sm">Années</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educationList.map(({ school, degree, from, to, _id }) => (
            <tr key={_id}>
              <td data-label="ecole">{school}</td>
              <td data-label="diplome" className="hide-sm">{degree}</td>
              <td data-label="années" className="hide-sm">
                <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
                {to === null || "" ? (
                  "Now"
                ) : (
                  <Moment format="DD/MM/YYYY">{to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEducation(_id)}
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

Education.propTypes = {
  educationList: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};
const mapDispatchToProps = {
  deleteEducation: deleteEducation
};

export default connect(null, mapDispatchToProps)(Education);
