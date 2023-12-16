import { MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import useVideoStore from "../../../../../stores/videoStore";
import { useEffect } from "react";

const DeleteVideoModal = ({ data }) => {
  const remove = useVideoStore(state => state.deleteVideo);
  const reset = useVideoStore(state => state.resetSuccess);
  const loading = useVideoStore(state => state.loading.delete);
  const success = useVideoStore(state => state.success.delete);

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete video ( ${data.name} )?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        remove(data._id);
      }
    });
  };

  return (
    <MDBBtn
      disabled={loading}
      onClick={handleDelete}
      className="cvitem-btn cvitem-btn-3"
      role="button"
    >
      {loading ? (
        <MDBSpinner size="sm" />
      ) : (
        <>
          <MDBIcon fas icon="trash-alt" /> DELETE
        </>
      )}
    </MDBBtn>
  );
};

export default DeleteVideoModal;
