import { BsPatchCheckFill } from "react-icons/bs";

const UserProfile = ({user}) => {
  return (
    <>
      <div className="pb-3">
        <div
          className="container-fluid bg-warning px-0"
          style={{
            width: "100%",
            height: "200px",
            backgroundImage: "url(" + (user.coverPictureUrl!=""? user.coverPictureUrl: "/Clarence.png")  + ")",
            backgroundSize: "cover",
          }}
        ></div>
        
        <div
          className="d-flex"
          style={{ margin: "-4rem 0px", padding: "0px 0px 0.6rem 1rem" }}
        >
          <img
            src={user.profilePictureUrl!=""? user.profilePictureUrl: "/avatar.jpg" }
            alt=""
            className="bd-placeholder-img img-thumbnail rounded-circle"
            style={{ width: "8rem", height: "8rem" }}
          />
          <button
            className="btn butns rounded-pill border ms-auto"
            style={{ margin: "72px 1rem" }}
          >
            Edit Profile
          </button>
        </div>
        <div className="ps-3">
          <h5 className="fw-bold my-0">
            {user.first_name} {user.last_name}
            <span>
              <BsPatchCheckFill className="text-primary mx-2" />
            </span>
          </h5>
          <p className="text-secondary mb-2 small">@{user.username}</p>
          <p className="text-secondary small">
            <i className="bi bi-calendar3"></i> Joined May 2017
          </p>
          <button className="btn m-0 ps-0  text-secondary py-1">
            <span className="fw-bold text-dark mx-1">{user.nFollowing}</span>
            Following
          </button>
          <button className="btn m-0 ps-0  text-secondary py-1">
            <span className="fw-bold text-dark mx-1">{user.nFollowers}</span>
            Followers
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
