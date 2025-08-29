import "./categoriesDetails.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";
import { SinglePost } from "../../allPagesPaths";
import Spinner from "../../components/common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const CategoriesDetails = () => {

  const dispatch = useDispatch();

  const { postsCate, loading } = useSelector((state) => state.post);

  const { category } = useParams();

  /*===========================================*/

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
  }, [category]);

  /*===========================================*/

  if (loading) return <Spinner />;
  return (
    <div className="categories-details">
      <div className="container-fluid">
        <div className="categories-details-content">
          {
            postsCate?.length > 0
              ?
              <>
                <h2>
                  Posts based on <span className="text-primary">[{category}]</span> category.
                </h2></>
              :
              <>
                <h2>
                  no Posts based on <span className="text-primary">[{category}]</span> category yet.
                </h2></>
          }
          <div className="all-similar-cat d-flex gap-5 flex-wrap my-5">
            {
              postsCate?.map(el => (
                <SinglePost post={el} key={el._id} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesDetails;