import "./home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { CategoriesSideBar, Pagination, SinglePost } from "../../allPagesPaths";
import Spinner from "../../components/common/spinner/Spinner";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const POST_PER_PAGE = 6;

const Home = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { post, posts, postsCount, loading, isPostDelete } = useSelector((state) => state.post);

  const { profile } = useSelector((state) => state.profile);

  const { categories } = useSelector((state) => state.category);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  /*===========================================*/

  // get all post based on currentPage and if the post delete state
  useEffect(() => {
    dispatch(getAllPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage, isPostDelete]);

  /*===========================================*/

  // get post count and categories
  useEffect(() => {
    dispatch(getPostsCount());
    dispatch(fetchCategories());
  }, []);

  /*===========================================*/

  //delete post depend on it id
  const Delete = async (id) => {
    dispatch(deletePost(id));
  };

  /*===========================================*/

  // show confirm msg,when need to delete some post
  const handlePostDelete = async (id) => {
    confirmAlert({
      message: "Are you sure you want to delete this post?",
      buttons: [{
        label: 'Yes',
        onClick: () => Delete(id)
      },
      { label: 'No' }
      ]
    });
  }

  /*===========================================*/

  if (loading) return <Spinner />;
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                {posts.length > 0 ? (
                  posts.map(post => (
                    <div className="col-md-6 col-lg-4 mb-4" key={post._id}>
                      <div className="card h-100 shadow-sm p-2">
                        <SinglePost
                          post={post}
                          userInLocalStorage={user}
                          profile={profile}
                          onPostDelete={handlePostDelete}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center mt-5">
                    <h2 className="text-muted">No posts yet</h2>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-3 mt-4 mt-lg-0">
              <CategoriesSideBar categories={categories} />
            </div>
          </div>

          {/* Pagination */}
          {posts.length > 0 && (
            <div className="row mt-4">
              <div className="col-12 d-flex justify-content-center">
                <Pagination
                  pages={pages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
        <ToastContainer autoClose={6000} />
      </div>
    </>
  );
}

export default Home;