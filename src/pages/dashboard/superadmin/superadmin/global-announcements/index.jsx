import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBTypography,
  MDBInput,
  MDBFile,
  MDBTextArea,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

import "./index.css";

import AnnouncementRow from "./row";
import CreateModal from "./createModal";
import useAnnouncementStore from "../../../../../stores/announcementStore";
import { Toaster } from "react-hot-toast";

const GlobalAnnouncements = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getAnnouncements = useAnnouncementStore(
    state => state.getAnnouncements
  );
  const loading = useAnnouncementStore(state => state.loading.announcements);
  const announcements = useAnnouncementStore(
    state => state.announcement.announcements
  );
  const totalPages = useAnnouncementStore(
    state => state.announcement.totalPages
  );
  const prevPage = useAnnouncementStore(state => state.announcement.prevPage);
  const nextPage = useAnnouncementStore(state => state.announcement.nextPage);

  const success = useAnnouncementStore(state => state.success.remove);

  useEffect(() => {
    if (success) {
      getAnnouncements(limit, page);
    }
  }, [success]);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getAnnouncements(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getAnnouncements(limit, prevPage);
    }
  };

  useEffect(() => {
    getAnnouncements(limit, page);
  }, []);

  return (
    <>
      <Toaster />
      <MDBContainer fluid className="px-0 dashboard-bg">
        <DashboardTopNavigation title="SUPER ADMIN / Global Announcements" />

        <CreateModal />

        <MDBContainer fluid className="px-0 mt-2">
          <div className="table-responsive">
            <table className="asl-table h-100">
              <thead>
                <tr className="asl-line">
                  <th scope="col" className="text-truncate">
                    ID
                  </th>

                  <th scope="col" className="text-truncate">
                    TITLE
                  </th>

                  <th scope="col" className="text-truncate">
                    IMAGE
                  </th>

                  <th scope="col" className="text-truncate">
                    DESCRIPTION
                  </th>

                  <th scope="col" className="text-truncate">
                    DATE POSTED
                  </th>

                  <th scope="col" className="text-truncate">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <MDBSpinner size="sm" />
                    </td>
                  </tr>
                ) : announcements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No Announcement Found
                    </td>
                  </tr>
                ) : (
                  announcements.map(annc => (
                    <AnnouncementRow key={annc._id} annc={annc} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </MDBContainer>

        <MDBContainer
          fluid
          className="px-0 mb-3 d-flex align-items-center justify-content-center mt-3"
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
      </MDBContainer>
    </>
  );
};

export default GlobalAnnouncements;
