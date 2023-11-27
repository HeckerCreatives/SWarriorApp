import { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import "./index.css";
import TopPointsTableRow from "./row";
import useWalletStore from "../../../../../stores/walletStore";

const TopPointsTable = () => {
  const limit = 15;
  const [page, setPage] = useState(1);

  const getWallets = useWalletStore(state => state.getTopCreditors);
  const loading = useWalletStore(state => state.loading.top);
  const wallets = useWalletStore(state => state.topCredit.wallets);
  const totalPages = useWalletStore(state => state.topCredit.totalPages);
  const prevPage = useWalletStore(state => state.topCredit.prevPage);
  const nextPage = useWalletStore(state => state.topCredit.nextPage);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getWallets(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getWallets(limit, prevPage);
    }
  };

  useEffect(() => {
    getWallets(limit, page);
  }, []);

  return (
    <MDBCol className="px-3">
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
      <MDBContainer fluid className="px-0 tp-table-container h-100">
        <div className="table-responsive">
          <table className="tp-table h-100">
            <thead>
              <tr className="tp-line">
                <th scope="col" className="text-truncate">
                  USER ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  WALLET BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  REGISTRATION DATE
                </th>
                <th scope="col" className="text-truncate">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : wallets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No User Found
                  </td>
                </tr>
              ) : (
                wallets.map(wallet => (
                  <TopPointsTableRow data={wallet} key={wallet._id} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default TopPointsTable;
