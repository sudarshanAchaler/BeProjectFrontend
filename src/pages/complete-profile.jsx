import NavbarLogout from "@/components/NavbarLogout";
import UserProfile from "@/components/UserProfile";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { BsPatchCheckFill } from "react-icons/bs";
import Router from 'next/router'

const completeProfile = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("/Clarence.png");
  const [profileImagePreview, setProfileImagePreview] = useState("/avatar.jpg");
  const [coverImage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();

  const coverPreviewImage = (e) => {
    const reader = new FileReader();
    const image = e.target.files[0];
    setCoverImage(image);
    reader.onloadend = () => {
      setCoverImagePreview(reader.result);
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };
  const profilePreviewImage = (e) => {
    const reader = new FileReader();
    const image = e.target.files[0];
    setProfileImage(image);
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage || !profileImage){
      setError("Upload both profile and cover images")
      return
    }
    setIsLoading(true);
    setError(null);
    const data = new FormData();
    data.append("cover", coverImage);
    data.append("profile", profileImage);
    const resp = await fetch("http://127.0.0.1:8000/auth/addUserImages/", {
      method: "PATCH",
      headers: { Authorization: "Token " + user.token },
      body: data,
    });

    const jsondata = await resp.json();

    if (!resp.ok) {
      setIsLoading(false);
      setError(JSON.stringify(jsondata));
    }
    if (resp.ok) {
      setIsLoading(false);
      Router.replace("/profile/me");
    }
  };

  return (
    <div className="box shadow">
      {user && (
        <>
          <h2 className="text-center fw-bold mb-4">Complete Profile</h2>
          <div className="pb-3">
            <div
              className="container-fluid bg-warning px-0"
              style={{
                width: "100%",
                height: "200px",
                backgroundImage: "url(" + coverImagePreview + ")",
                backgroundSize: "cover",
              }}
            ></div>

            <div
              className="d-flex"
              style={{ margin: "-4rem 0px", padding: "0px 0px 0.6rem 1rem" }}
            >
              <img
                src={profileImagePreview}
                alt=""
                className="bd-placeholder-img img-thumbnail rounded-circle"
                style={{ width: "8rem", height: "8rem" }}
              />
              <button
                className="btn butns rounded-pill border ms-auto"
                style={{ margin: "72px 1rem" }}
                disabled={true}
              >
                Edit Profile
              </button>
            </div>
            <div className="ps-3">
              <h5 className="fw-bold my-0">
                {user.user.first_name} {user.user.last_name}
                <span>
                  <BsPatchCheckFill className="text-primary mx-2" />
                </span>
              </h5>
              <p className="text-secondary mb-2 small">
                @{user.user.first_name}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <button
              className="btn btn-outline-dark fw-semibold mx-2 my-2"
              onClick={() => {
                document.getElementById("ProfileImageFile").click();
              }}
            >
              Upload Profile Picture
            </button>
            <button
              className="btn btn-outline-dark fw-semibold mx-2 my-2"
              onClick={() => {
                document.getElementById("CoverImageFile").click();
              }}
            >
              Upload Cover Picture
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              id="CoverImageFile"
              accept=".jpg, .png"
              hidden
              onChange={coverPreviewImage}
            />
            <input
              type="file"
              id="ProfileImageFile"
              accept=".jpg, .png"
              hidden
              onChange={profilePreviewImage}
            />
            <div className="row mt-5">
              <button className="btn btn-dark fw-semibold" disabled={isLoading}>Save</button>
            </div>
            {isLoading && <div className="text-center">
              <div className="spinner-border mt-3 text-center" role="status" />
            </div>}
            {error && <div className="error my-2">{error}</div>}
          </form>
            <div className="row mt-2">
              <button className="btn btn-outline-light fw-semibold text-dark" disabled={isLoading} onClick={()=>{Router.replace("/profile/me")}}>Skip</button>
            </div>
        </>
      )}
    </div>
  );
};

export default completeProfile;

completeProfile.getLayout = function getLayout(page) {
  return (
    <>
      <NavbarLogout />
      {page}
    </>
  );
};
