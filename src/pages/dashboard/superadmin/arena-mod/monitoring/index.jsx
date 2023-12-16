// ** React
import { useEffect } from "react";

// ** Third Party Components
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** Components
import VideoMonitoringCard from "../../../../../components/dashboard/cards/video-monitoring";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { allArenaVideos } from "../../../../../redux/slices/arenaVideos";

const VideoMonitoring = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** Store
  const storeArenaVideos = useSelector(state => state.arenaVideos);

  useEffect(() => {
    dispatch(allArenaVideos());
  }, []);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="ARENA MODERATOR / Video Monitoring" />
      <MDBContainer fluid className="py-2">
        <MDBRow className="mx-0">
          {storeArenaVideos.tableLoader ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : storeArenaVideos?.allArenaVideos?.length ? (
            storeArenaVideos?.allArenaVideos?.map((_, i) => (
              <VideoMonitoringCard data={_} key={`tr-${i}`} />
            ))
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <span className="text-white">No Result Found.</span>
            </div>
          )}
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default VideoMonitoring;
