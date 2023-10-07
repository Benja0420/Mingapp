import { useRef } from 'react';
import deleteAction from '../redux/actions/deleteAction';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteComment = ({ delette, setDelette, token }) => {

  const dispatch = useDispatch();

  const sendDeleteComment = async () => {
    const info = {
      comment_id: delette.comment._id,
      token
    };

    try {
      await dispatch(deleteAction(info));
      closeModal();
      toast.success('Comment deleted');
    } catch (error) {
      toast.error('Error deleting comment');
    }
  };

  const closeModal = () => {
    setDelette({
      show: false,
      comment: {}
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{delette.comment.user_id.email}</h3>
                    <div className="mt-2">
                      <p>Are you sure you want to delete this comment?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={sendDeleteComment} type="button" className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 sm:ml-3 sm:w-auto">Delete</button>
                <button onClick={closeModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteComment;