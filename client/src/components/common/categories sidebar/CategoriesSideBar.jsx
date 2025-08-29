import { Link } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const CategoriesSideBar = ({ categories }) => {

  return (
    <div className="categories-sidebar">
      <h3>Categories</h3>
      <ul className="list-unstyled">
        {categories?.map(cat =>
        (<li key={cat._id}>
          <Link
            to={`/post/category/${cat.title}`}
          >{cat.title}</Link>
        </li>)
        )}
      </ul>
    </div>
  )
}

export default CategoriesSideBar;