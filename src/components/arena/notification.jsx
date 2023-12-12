import { useState, useEffect } from "react";
import sgLogo from "../../assets/images/sidebar/logo.png";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import { selectAllNotificationData } from "../../redux/slices/notification";
import { useSelector } from "react-redux";
import "./index.css";
const ArenaNotification = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");

  const [allNotificationData, setAllNotificationData] = useState({});
  const playerNotificationData = useSelector(selectAllNotificationData);
  const [recievedNotification, setRecievedNotification] = useState();
  const [hideNotificationMark, setHideNotificationMark] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [exclamationMark, setExclamationMark] = useState(false);
  // console.log('player notificationdata', playerNotificationData)
  const [centredModal, setCentredModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const user = {};

  useEffect(() => {}, [playerNotificationData]);

  useEffect(() => {
    if (notificationCount !== 0) {
      setHideNotificationMark(false);
    } else {
      setHideNotificationMark(true);
    }

    console.log("notification bell state Changed");
    try {
      const fetchNotifications = async () => {
        // ${user.user.id}
        const response = await fetch(
          process.env.REACT_APP_SGLIVE_API_URL +
            `notifications/${arena_id}/${user?.user?.id}`,
          {
            // const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `notifications`, {
            headers: { Authorization: `Bearer ${user.jwt}` },
          }
        )
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // Handle successful data
            console.log("dataRecievedFrom fetch Api", data);
            const notificationSetter = data.filter(userNotification => {
              return userNotification.isRead === false;
            });

            if (notificationSetter.length !== 0) {
              setHideNotificationMark(false);
              setNotificationCount(notificationSetter.length);
            }
            console.log("for notifactions setter", notificationSetter);
            setRecievedNotification(data);
          })
          .catch(error => {
            // Handle error
            console.error("Fetch error:", error);
          });
      };

      fetchNotifications();
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    setAllNotificationData(playerNotificationData);
    console.log("notificationData", playerNotificationData);
  }, [playerNotificationData]);

  const openModal = () => {
    //   setIsModalOpen(true);
    // setHideNotificationMark(false)
    toggleShow();

    const promise = Promise.resolve(recievedNotification).then(
      filteredNotification => {
        const filteredResult =
          filteredNotification &&
          filteredNotification.filter(data => {
            if (data.isRead === false) {
              const updateReadStatus = async () => {
                try {
                  const response = await fetch(
                    process.env.REACT_APP_SGLIVE_API_URL +
                      `notifications/${data.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`,
                      },
                      body: JSON.stringify({ isRead: true }),
                    }
                  );

                  const json = await response.json();
                  if (response.ok) {
                    console.log("notificationUpdated", json);
                  }
                  // Handle response
                  console.log(response);
                } catch (error) {
                  console.log(error);
                }
              };

              updateReadStatus();
            }
          });
        // Perform actions with the filteredResult here
        // console.log("Filtered array:", filteredResult);
        setNotificationCount(0);
      }
    );

    promise.then(() => {
      console.log("Notification updated.");
    });
  };

  const closeModal = () => {
    // setIsModalOpen(false);
    setHideNotificationMark(true);
    toggleShow();
  };

  // console.log('notificationComponent this is the notification data to be mapped', allNotificationData)
  return (
    <MDBContainer className="my-2 mx-2">
      {/* zIndex:'5', position:'sticky', top:'1px', */}
      {/* <div className='bg-light text-center ms-4 py-3'
             style={{ width:"100px", borderRadius:"50px"}}>
                    
                          </div> */}
      {/* <MDBBtn style={{borderRadius:"50px"}} >
  
                           

                         </MDBBtn> */}

      <div style={{ position: "relative", display: "inline-block" }}>
        <MDBIcon onClick={() => openModal()} fas icon="bell" size="2x" />
        <span
          hidden={hideNotificationMark ? true : false}
          className="py-0"
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            padding: "5px 10px",
            borderRadius: "50%",
            backgroundColor: "red",
            height: "27px",
          }}
        >
          {notificationCount}
        </span>
      </div>

      {/*---------------- admin notification modal----------------------- */}
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="coreq-modal-body">
            <MDBModalHeader>
              <img
                src={sgLogo}
                alt="some logo"
                style={{ height: "70px" }}
                className="me-5 ms-3"
              />

              <MDBModalTitle
                className="notificationModalTitle"
                style={{ display: "flex" }}
              >
                <h4 className="py-3">Admin Notification</h4>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => closeModal()}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              className="justify-contents-center"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <MDBTable fluid className="tlt-table">
                <MDBTableHead fluid>
                  <tr>
                    <th scope="col" className="text-center">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Sender
                    </th>
                    <th scope="col" className="text-center">
                      Message
                    </th>
                    <th scope="col" className="text-center">
                      Round#
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ maxHeight: "100px", color: "white" }}>
                  {recievedNotification &&
                    recievedNotification.map(notifications => (
                      <tr key={notifications.id}>
                        <th scope="row" className="text-center">
                          {new Date(notifications.createdAt).toLocaleString()}
                        </th>
                        <td className="text-center">{notifications.sender}</td>
                        <td
                          className="text-center "
                          style={{ maxWidth: "200px" }}
                        >
                          Congratulations You Won{" "}
                          <strong>{notifications.points}</strong>
                        </td>
                        <td className="text-center">
                          {notifications.roundNumber}
                        </td>
                      </tr>
                    ))}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default ArenaNotification;
