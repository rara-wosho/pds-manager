import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { FiHome } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import DatasheetForm from "../components/DatasheetForm";

function Home() {
  const { user, signOutUser } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: users, isLoading } = useUsers(); // all users already fetched

  const userProfile = users?.find((user) => user.user_id === id);

  if (isLoading)
    return (
      <div className="center p-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  return (
    <div
      style={{ maxWidth: 1100 }}
      className="profile-page d-flex w-100 flex-column min-h-100 p-0 p-md-4 mx-auto"
    >
      {/* header  */}
      <div className="profile-header w-100">
        <div className="d-flex justify-content-between p-3">
          <div
            onClick={() => navigate(-1)}
            className="p-2 cursor shadow center rounded-circle bg-light"
          >
            <FiHome size={20} />
          </div>
          <div
            style={{ zIndex: 10 }}
            onClick={signOutUser}
            className="btn shadow btn-danger fs-7 rounded-pill center px-4"
          >
            <FiLogOut /> logout
          </div>
        </div>
      </div>

      {/* body  */}
      <div className="w-100 position-relative d-flex flex-column align-items-center profile-body px-3">
        <div className="profile-pic-container mb-4 rounded-circle p-2 center position-relative">
          <img
            src={
              userProfile.image_path
                ? userProfile.image_path
                : "/images/default-img.jpg"
            }
            className="rounded-circle"
            width={180}
            height={180}
            alt=""
          />
          <div className="check-badge">
            <BsPatchCheckFill size={42} color="rgb(160, 64, 230)" />
          </div>
        </div>
        <p className="text-secondary mb-2 text-center">
          {userProfile.email ?? "email not set"}
        </p>
        <h1 className="text-muted text-center fw-bold">
          {userProfile?.first_name} {userProfile?.middle_name}{" "}
          {userProfile?.last_name}
        </h1>
        {userProfile.position && (
          <i className="fs-4 text-muted mb-2 text-center">
            {userProfile.position}
          </i>
        )}

        <p className="mb-0 text-secondary text-center">
          {userProfile.address && userProfile.address}
        </p>

        {/* <div className="border-bottom w-100 mt-3"></div> */}
      </div>

      <DatasheetForm />
    </div>
  );
}

export default Home;
