import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPost, deletePost, like, unlike } from "../../actions/post";
import { connect } from "react-redux";
import Loading from "../layout/loading";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
function Posts({
  getPost,
  deletePost,
  unlike,
  like,
  post: { posts, loading },
  auth,
}) {
  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      <section className="container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <CreatePost />

          {posts != null &&
            posts.map((post) => (
              <div className="posts" key={post._id}>
                <div className="post bg-white p-1 my-1">
                  <div>
                    <a href={`/profile/${post.user}`}>
                      <img className="round-img avatar" src={post.avatar} alt="" />
                      <h4 className="post-name">{post.name}</h4>
                    </a>
                  </div>
                  <div>
                    <p className="my-1 post-text">{post.text}</p>
                    <p className="post-date date">{`${new Date(post.date).toLocaleDateString("fr-FR")}`}</p>
                    <button
                      type="button"
                      className="btn btn-light post-like"
                      onClick={() => like(post._id)}
                      value="bouton pour aimer un post"
                    >
                      <i className="fas fa-thumbs-up"></i>
                      <span>{post.likes.length > 0 && post.likes.length}</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light post-unlike"
                      onClick={() => unlike(post._id)}
                      value="bouton pour ne pas aimer un post"
                    >
                      <i className="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-primary comments count">
                      {" "}
                      {post.comments.length > 0 && (
                        <span className="comment-count">
                          {post.comments.length}
                        </span>
                      )}
                    </Link>
                    {auth.user._id === post.user && (
                      <button
                        type="button"
                        onClick={() => deletePost(post._id)}
                        className="btn btn-danger post-delete"
                        value="Supprimer un post de la liste des postes"
                      >
                        
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
      </section>
    </>
  );
}

Posts.propTypes = {
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

const mapDispatchToProps = {
  getPost: getPost,
  deletePost: deletePost,
  like: like,
  unlike: unlike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
