import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeComment } from "../../actions/post";

function Comments({ removeComment, post: { comments, _id }, auth: { user } }) {
  
  return (
    <div className="comments">
      {comments !== [] &&
        comments.map(comment => (
          <div className="post bg-white p-1 my-1">
            <div>
              <Link href={`/profile/${comment.user}`} aria-label="Accéder au commentaire d'un utilisateur">
                <img className="round-img" src={comment.avatar} alt="" />
                <h4>{comment.name || "Unknown"}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{comment.text} </p>
              <p className="post-date">
                <Moment locale="fr-FR" format="DD/MM/YYYY">
                  {comment.date}
                </Moment>
              </p>
            </div>
            <>
              {user._id === comment.user && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeComment(_id, comment._id)}
                  value="Efface le commentaire"
                  aria-label="Effacer le commentaire"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </>
          </div>
        ))}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post.post,
  auth: state.auth
});

const mapDispatchToProps = {
  removeComment: removeComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);