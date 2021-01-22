import React, { useState } from "react";
import PropTypes from "prop-types";
import { addComment } from "../../actions/post";
import { connect } from "react-redux";

const CreateComment = ({ addComment, post: { post } }) => {
  const [text, setText] = useState("");
  const submitComment = (e) => {
    e.preventDefault();
    addComment(post._id, text);
    setText("");
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Laisser un commentaire</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Commentaire"
          required
          value={text}
          onChange={onChange}
          aria-multiline="true"
          aria-label="Commentaires"
        ></textarea>
        <input
          type="submit"
          onClick={submitComment}
          className="btn btn-dark my-1"
          title="Envoyer le commentaire dans la liste des commentaires"
          aria-label="Envoyer le commentaire"
        />
      </form>
    </div>
  );
};

CreateComment.propTypes = {
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = {
  addComment: addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
