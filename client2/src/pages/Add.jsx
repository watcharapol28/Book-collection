import React, { useEffect } from "react";
import UserDataAPI from "../api/UserData";
import { useNavigate } from "react-router-dom";
import { getAcessToken } from "../helper/getToken";

function parseJwt(token) {
  if (token !== "") {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}

const Add = () => {
  const navigate = useNavigate();
  const token = getAcessToken();
  const UserID = token === "" ? "" : parseJwt(getAcessToken()).userId;

  useEffect(() => {
    if (token === "") {
      navigate("/sign");
    } else {
      async function check() {
        const res = await UserDataAPI(UserID);
        if (res.role !== "admin") {
          navigate("/");
        }
      }
      check();
    }
  });

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Add;
