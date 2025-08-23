import React, { useState, useEffect } from 'react';
import parse from "html-react-parser";
import services from '../../auth/config';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router';
import './Post.css'; 

function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Determines if the current logged-in user is the author of the post.
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setLoading(true);
        if (slug) {
            services.Getpost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        // If no post is found, navigate to the home page.
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch post:", error);
                    navigate("/");
                })
                .finally(() => {
                    // Stop loading once the process is complete.
                    setLoading(false);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Handles the entire deletion process.
    const handleDeletePost = () => {
        if (!post) return;

        services.DeletPost(post.$id).then((status) => {
            if (status) {
                // If the post document is deleted, also delete the associated file.
                services.deletFile(post.featuredImg);
                navigate("/"); // Navigate away after successful deletion.
            } else {
                console.error("Failed to delete post.");
                // Optionally, show an error message to the user.
            }
        }).finally(() => {
            setShowDeleteModal(false); // Close the modal regardless of outcome.
        });
    };

    // A simple loading spinner to display while data is being fetched.
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="post-page-wrapper py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        {/* Featured Image */}
                        <div className="featured-image-container mb-4">
                            <img
                                src={services.getfilepreview(post.featuredImg)}
                                alt={post.title}
                                className="img-fluid post-image"
                            />
                        </div>

                        {/* Post Header */}
                        <div className="post-header">
                            <h1 className="post-title">{post.title}</h1>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="post-author mt-4 mb-0">By {post.name || 'Unknown Author'}</p>
                                {/* Action Buttons for the Author */}
                                {isAuthor && (
                                    <div className="author-actions">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <button className="btn me-4 btn-sm btn-outline-primary">
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="btn mt-4 btn-sm btn-outline-danger" onClick={() => setShowDeleteModal(true)}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <hr className="my-4" />

                        {/* Post Content */}
                        <div className="post-content">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content-custom">
                        <h5 className="modal-title-custom">Confirm Deletion</h5>
                        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={handleDeletePost}>
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}

export default Post;
