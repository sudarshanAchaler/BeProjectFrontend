import React from "react";
import HomeLayout from "@/components/HomeLayout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import { BsPatchCheckFill } from "react-icons/bs";

const explore = () => {
  const [searchPrompt, setsearchPrompt] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const getUsers = async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://13.126.201.102:8000/auth/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
    });
    const obj = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(JSON.stringify(obj));
    }
    if (response.ok) {
      setIsLoading(false);
      setUsers(obj.body);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = () => {
    if (searchPrompt === ""){
        getUsers();
    }
    setUsers(users.filter(obj=> obj.username.toLowerCase().includes(searchPrompt.toLowerCase())))
  };
  return (
    <>
      <div className="col-7 mt-3">
        <h3 className="fw-bold mb-4">Explore</h3>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Username"
          onChange={(e) => setsearchPrompt(e.target.value)}
        />
        <a className="btn btn-primary" onClick={handleSearch}>Search</a>
      </div>
      <div className="text-center">
      {isLoading && (
            <div
              className="spinner-border my-5"
              style={{ width: "7rem", height: "7rem" }}
              role="status"
            />
          )}
      </div>
      {!isLoading && users &&
        users.map((user) => {
          return (
            <div className="card p-1 py-2 my-1 px-lg-2 py-lg-4  border-0  shadow-sm">
              <div className="flexbox d-flex align-items-start">
                <div className="profile_picture">
                  <img
                    src={user.profilePictureUrl}
                    alt=""
                    className="bd-placeholder-img rounded-circle border-primary mx-2"
                    height="60"
                    width="60"
                  />
                </div>
                <div className="profile_information">
                  <p className="my-0 fw-bold ">
                    {user.first_name} {user.last_name}
                    <span>
                      <BsPatchCheckFill className="text-primary mx-2" />
                    </span>
                  </p>
                  <p className="my-0 fw-bold text-secondary">
                    @{user.username}
                  </p>
                  <p className="my-0 small">{user.bio}</p>
                </div>
                <div className="button px-2 ms-auto">
                  <Link
                    className="btn btn-sm btn-primary fw-bold"
                    href={"/profile/" + user.username}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default explore;

explore.getLayout = function getLayout(page) {
  return (
    <>
      <HomeLayout>{page}</HomeLayout>
    </>
  );
};
