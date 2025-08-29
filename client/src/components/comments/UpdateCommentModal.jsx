import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UpdateCommentModal = ({ show, setShowModal, setHideModal }) => {

    const dispatch = useDispatch();

    /*===========================================*/

    return (
        <div className="my-modal">
            <Modal
                show={show}
                onHide={() => { dispatch(setShowModal()) }}
                className="custom-modal"
            >
                <Modal.Header closeButton onClick={() => { dispatch(setHideModal()) }}>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="my-3">
                        <div className="form-group">
                            <textarea
                                name=""
                                id=""
                                cols="60"
                                rows="5"
                                placeholder="Edit a comment"
                                className="mytextarea p-2 border border-2 rounded w-100"></textarea>
                        </div>
                        <button type="submit" className="btn btn-small bg-dark text-white rounded-pill px-3 py-1">Edit Comment</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UpdateCommentModal;