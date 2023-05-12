import { useState } from "react";
import { BsXCircleFill, BsImage } from "react-icons/bs";

const PostCreate = ({ user, posts, setPosts }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [postBody, setPostBody] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  function getExtension(filename) {
    return filename.split('.').pop()
  }

  const HandlePostSubmit = async (e) => {
    setIsLoading(true);
    setError(null);
    e.preventDefault();
    const data = new FormData();
    if (postBody === "") {
      setError("Post body cannot be empty");
      setIsLoading(false);
      return;
    }
    if (file) {
      data.append("image", file);
    }
    data.append("body", postBody);
    const resp = await fetch("http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: { Authorization: "Token " + user.token },
      body: data,
    });
    const jsonData = await resp.json();
    if (!resp.ok) {
      setIsLoading(false);
      setError(JSON.stringify(jsonData));
    }
    if (resp.ok) {
      setPostBody("");
      setFile(null);
      setImagePreview(null);
      setPosts([jsonData.post, ...posts]);
      setIsLoading(false);
    }
  };
  const previewImage = (e) => {
    const reader = new FileReader();
    const image = e.target.files[0];
    if (image) {
      const fileExtension = getExtension(image.name).toLowerCase()
      if (!["jpg","png"].includes(fileExtension)){
        setError("Unsupported file type");
        return
      }
      if (image.size > 5242880) {
        setError("Upload image up to 5MB");
        return;
      }
      setFile(image);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };
  return (
    <>
      <form
        className="d-flex mt-1 pt-3 px-1 shadow-sm"
        onSubmit={HandlePostSubmit}
      >
        <div className="profilepic">
          <img
            src={
              user && user.user.profilePictureUrl != ""
                ? user.user.profilePictureUrl
                : "/avatar.jpg"
            }
            className="bd-placeholder-img rounded-circle mx-2"
            height="45"
            width="45"
            alt=""
          />
        </div>
        <div className="w-100 pe-2">
          <textarea
            className="form-control "
            rows="2"
            placeholder="What's Happening?"
            value={postBody}
            onChange={(e) => {
              setPostBody(e.target.value);
            }}
          ></textarea>
          <input
            type="file"
            id="imageFile"
            accept=".jpg, .png"
            hidden
            onChange={previewImage}
          />
          {imagePreview && (
            <div className="d-flex align-items-start my-3">
              <img
                src={imagePreview}
                alt=""
                style={{ borderRadius: "15px", width: "90%" }}
              />
              <button className="butns small text-danger ms-2">
                <BsXCircleFill
                  className="bi bi-x-circle-fill"
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                  }}
                />
              </button>
            </div>
          )}
          <div className="d-flex">
            <button
              className="butns rounded-circle p-2 my-2"
              type="button"
              onClick={() => {
                document.getElementById("imageFile").click();
              }}
            >
              <BsImage className="bi bi-image text-primary fs-5" />
            </button>

            <button
              className="btn btn-primary btn fw-bold my-2 py-0 rounded-pill ms-auto"
              type="submit"
              style={{ width: "90px" }}
            >
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Post
            </button>
          </div>
          {error && <div className="error my-2">{error}</div>}
        </div>
      </form>
    </>
  );
};

export default PostCreate;
