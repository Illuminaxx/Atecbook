import React, { useEffect } from "react";
import { getPostbyId } from "../../actions/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layout/loading";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";
import Comments from "./Comments";


const Post = ({ match, getPostbyId, post: { post, loading } }) => {
  useEffect(() => {
    getPostbyId(match.params.id);
  }, [match, getPostbyId]);
  return (
    <>
      <section className="container">
      {post == null ? (
        <Loading />
      ) : (
        <>
          <Link to="/posts" className="btn" value="Revenir à la liste des posts" >
            Retour aux posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`} value="Accéder au profil d'un utilisateur">
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text} </p>
            </div>
          </div>
          <CreateComment />
          <Comments />
        </>
      )}
      </section>
    </>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired,
  getPostbyId: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPostbyId: getPostbyId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
