// ** Third Party Components
import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";

// ** React
import { useEffect } from "react";

// ** Components
import EmbedVideoList from "./item";

// ** Style
import "./index.css";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  allArenaVideos,
  allArenaVideosCount,
  setCurrentPage,
} from "../../../../../redux/slices/arenaVideos";

const CreateVideoList = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeArenaVideos = useSelector((state) => state.arenaVideos);

  useEffect(() => {
    dispatch(allArenaVideosCount());
    dispatch(
      allArenaVideos(
        `?_start=${
          (storeArenaVideos.currentPage - 1) * storeArenaVideos.itemsPerPage
        }&_limit=${storeArenaVideos.itemsPerPage}`
      )
    );
  }, [storeArenaVideos.currentPage, storeArenaVideos.itemsPerPage]);

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(storeArenaVideos.currentPage - 1));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(storeArenaVideos.currentPage + 1));
  };

  return (
    <MDBContainer fluid className="p-3 mt-3 cvlist-container">
      <Toaster />
      <MDBContainer
        fluid
        className="px-0 mb-3 d-flex align-items-center justify-content-center"
      >
        <button
          className="tp-pager"
          role="button"
          onClick={handlePreviousPage}
          disabled={
            storeArenaVideos.currentPage === 1 || storeArenaVideos.tableLoader
          }
        >
          <MDBIcon fas icon="angle-double-left" />
        </button>
        <div className="tp-page">{storeArenaVideos.currentPage}</div>
        <button
          className="tp-pager"
          role="button"
          onClick={handleNextPage}
          disabled={
            storeArenaVideos?.allArenaVideos.length <
              storeArenaVideos.itemsPerPage ||
            storeArenaVideos.tableLoader ||
            storeArenaVideos?.allArenaVideos.length >=
              storeArenaVideos.allArenaVideosCount
          }
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      {storeArenaVideos.tableLoader ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : storeArenaVideos?.allArenaVideos?.length ? (
        storeArenaVideos?.allArenaVideos?.map((_, i) => (
          <EmbedVideoList data={_} key={`tr-${i}`} />
        ))
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <span className="text-white">No Result Found.</span>
        </div>
      )}
    </MDBContainer>
  );
};

export default CreateVideoList;
