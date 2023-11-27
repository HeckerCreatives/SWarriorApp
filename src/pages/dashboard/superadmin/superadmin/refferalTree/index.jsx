import React, { useState, useEffect } from "react";
import "./index.css";

const RefferalTree = () => {
  const [allUsers, setAllUsers] = useState([]);

  const auth = "";

  useEffect(() => {
    const fetchAllUsers = async user => {
      const response = await fetch(
        process.env.REACT_APP_SGLIVE_API_URL + `users`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log("allUsersRefferalTree", json);

        setAllUsers(json);
      }
    };

    fetchAllUsers(auth);
  }, []);

  // ----------------------------------------------testing-----------------------------------------------------

  //   const [loopBreak, setLoopBreak] = useState('start')

  let reffererArray = [];
  if (allUsers.length != 0) {
    let i = 0;
    do {
      if (reffererArray.length == 0) {
        allUsers.filter(data => {
          if (data.username === "subagentTester") {
            reffererArray.push(data);
          }
        });
      } else {
        i++;
        allUsers.map(filterData => {
          if (
            filterData.referrer &&
            reffererArray[reffererArray.length - 1].referrer.username ==
              filterData.username
          ) {
            reffererArray.push(filterData);
          }
        });
      }
    } while (i < reffererArray.length);
  }

  console.log("refferal array", reffererArray);

  return (
    <div className="parentComponent">
      {allUsers.map((users, index) => (
        <div className="wrapper ms-5 mt-4 text-center" key={users.id}>
          {users.id}, {users.username}
        </div>
      ))}
    </div>

    //    <div className='wrapper ms-5 mt-4 text-center'>Refferal Tree Component</div>
    //    <div className='wrapper ms-5 mt-4 text-center'>Refferal Tree Component</div>
  );
};

export default RefferalTree;
