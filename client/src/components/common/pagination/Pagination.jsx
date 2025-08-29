import './pagination.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Pagination = ({ pages, currentPage, setCurrentPage }) => {

    // make empty arr to fill the pages,based on posts length in every page
    const generatedPages = [];
    for (let i = 1; i <= pages; i++) {
        generatedPages.push(i);
    }

    /*===========================================*/

    return (
        <div className="pagination mt-4">
            {
                // if the currentPage NOT equal 1, show the previous btn
                currentPage !== 1 &&
                <>
                    <button
                        className="page previous"
                        onClick={() => setCurrentPage(current => current - 1)}
                    >
                        <span><FaAngleLeft /></span>
                    </button>
                </>
            }
            {generatedPages.map(page => (
                <div
                    onClick={() => setCurrentPage(page)}
                    key={page}
                    className={currentPage === page ? "page active-pagination" : "page"}
                >
                    {page}
                </div>
            ))}
            {
                // if the currentPage EQUAL the [generatedPages.length], show the next btn
                currentPage !== generatedPages.length &&
                <>
                    <button
                        className="page next"
                        onClick={() => setCurrentPage(current => current + 1)}
                    >
                        <span>< FaAngleRight /></span>
                    </button>
                </>
            }
        </div>
    );
}

export default Pagination;