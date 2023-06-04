import { BsPatchCheckFill } from "react-icons/bs";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

const OthersUserProfile = ({usr,followingUser}) => {
  const [following, setFollowing] = useState(followingUser)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {user} = useAuthContext();
  const handleFollowToggle = async ()=>{
    setIsLoading(true)
    setError(null)
    const response = await fetch("http://13.126.201.102:8000/auth/profile/"+usr.username+"/follow/", {
      method: "GET",
      headers: {"Authorization":"Token "+user.token },
    });
    const obj =  await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(JSON.stringify(obj))
    }
    if (response.ok) {
      setIsLoading(false)
      setFollowing(!following)
    }
    
  }
  return (
    <>
      <div className="pb-3">
        <div
          className="container-fluid bg-warning px-0"
          style={{
            width: "100%",
            height: "200px",
            backgroundImage: "url(" + (usr.coverPictureUrl? usr.coverPictureUrl: "/Clarence.png") + ")",
            backgroundSize: "cover",
          }}
        ></div>

        <div
          className="d-flex"
          style={{ margin: "-4rem 0px", padding: "0px 0px 0.6rem 1rem" }}
        >
          <img
            src={usr.profilePictureUrl? usr.profilePictureUrl : "/avatar.jpg"}
            alt=""
            className="bd-placeholder-img img-thumbnail rounded-circle"
            style={{ width: "8rem", height: "8rem" }}
          />
          <button
            className={following ? "btn rounded-pill ms-auto btn-outline-danger fw-semibold" : "btn rounded-pill ms-auto btn-primary fw-semibold"}
            style={{ margin: "72px 1rem" }}
            onClick={handleFollowToggle}
          >
            {isLoading && <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"/>}
            {following ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="ps-3">
          <h5 className="fw-bold my-0">
            {usr.first_name} {usr.last_name}
            <span>
              <BsPatchCheckFill className="text-primary mx-2" />
            </span>
          </h5>
          <p className="text-secondary mb-2 small">@{usr.username}</p>
          <p className="text-secondary small">
            <i className="bi bi-calendar3"></i> Joined May 2017
          </p>
          <button className="btn m-0 ps-0  text-secondary py-1">
            <span className="fw-bold text-dark mx-1">{usr.nFollowing}</span>
            Following
          </button>
          <button className="btn m-0 ps-0  text-secondary py-1">
            <span className="fw-bold text-dark mx-1">{usr.nFollowers}</span>
            Followers
          </button>
        </div>
        {error && <div className="error my-2">{error}</div>}
      </div>
    </>
  );
};

export default OthersUserProfile;
