import { MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import useVideoStore from "../../../../../stores/videoStore";
import { useEffect, useState } from "react";
import EmbedVideoList from "./item";

const CreateVideoList = () => {
  const [page, setPage] = useState(1);
  const limit = 8;

  const getVideos = useVideoStore(state => state.getVideos);
  const videos = useVideoStore(state => state.video.videos);
  const nextPage = useVideoStore(state => state.video.nextPage);
  const prevPage = useVideoStore(state => state.video.prevPage);
  const totalPages = useVideoStore(state => state.video.totalPages);
  const loading = useVideoStore(state => state.loading.videos);
  const success = useVideoStore(state => state.success.create);
  const delSuccess = useVideoStore(state => state.success.delete);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getVideos(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getVideos(limit, prevPage);
    }
  };

  useEffect(() => {
    delSuccess && getVideos(limit, page);
  }, [delSuccess]);

  useEffect(() => {
    success && getVideos(limit, page);
  }, [success]);

  useEffect(() => {
    getVideos(limit, page);
  }, []);

  return (
    <MDBContainer fluid className="p-3 mt-3 cvlist-container">
      <Toaster />
      <MDBContainer
        fluid
        className="px-0 mb-3 d-flex align-items-center justify-content-center"
      >
        <button
          onClick={handlePrevPage}
          disabled={prevPage === null || loading}
          className="tp-pager"
          role="button"
        >
          <MDBIcon fas icon="angle-double-left" />
        </button>
        <div className="tp-page">
          {page} / {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={nextPage === null || loading}
          className="tp-pager"
          role="button"
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      {loading ? (
        <MDBContainer className="text-center">
          <MDBSpinner size="sm" color="light" />
        </MDBContainer>
      ) : videos.length === 0 ? (
        <MDBContainer className="text-center text-white">
          No Videos Found.
        </MDBContainer>
      ) : (
        videos.map(video => <EmbedVideoList key={video._id} video={video} />)
      )}
    </MDBContainer>
  );
};

export default CreateVideoList;
