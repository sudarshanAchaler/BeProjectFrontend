import Link from "next/link";
import {
  BsChatDotsFill,
  BsArrowRepeat,
  BsHeart,
  BsUpload,
  BsThreeDotsVertical,
  BsPatchCheckFill,
  BsPencilFill,
  BsTrashFill,
  BsAppIndicator,
} from "react-icons/bs";
import { useAuthContext } from "@/hooks/useAuthContext";
import CommentCreate from "./CommentCreate";

const FeedPost = ({ post }) => {
  const { user } = useAuthContext();
  const handleDelete = () => {
    console.log("deleted");
  };
  return (
    <>
      <div className="post d-flex my-1 p-3 shadow-sm" key={post.id}>
        <div className="profilepic">
          <Link href={"/profile/" + post.author_username}>
            <img
              src={
                post.author_profile_picture_url
                  ? post.author_profile_picture_url
                  : "/avatar.jpg"
              }
              className="bd-placeholder-img rounded-circle mx-2"
              height="45"
              width="45"
              alt=""
            />
          </Link>
        </div>

        <div className="w-100">
          <div className="d-flex">
            <div className="d-flex flex-wrap align-items-center">
              <p className="fw-bold my-0">{post.author_name}</p>
              <BsPatchCheckFill className=" text-primary mx-2" />
              <p className="text-secondary my-0 mx-1 small">
                . {post.humanizedTime}
              </p>
            </div>
            <div className="d-flex ms-auto me-2 dropup-center dropup">
              <button
                className="btn text-dark btn-outline-light rounded-circle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BsThreeDotsVertical className="fw-bold" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {(user && post.author == user.user.id) && (
                  <>
                    <li>
                      <Link
                        className="dropdown-item"
                        href={"/posts/" + post.id}
                      >
                        <BsPencilFill className="mx-1" /> Edit
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleDelete}>
                        <BsTrashFill className="mx-1" /> Delete
                      </button>
                    </li>
                  </>
                )}

                <li>
                  <a className="dropdown-item" href={"/posts/" + post.id}>
                    <BsAppIndicator className="mx-1" /> View
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="content small">{post.body}</div>

          {post.media != "" && (
            <div className="images pe-2 my-2 ">
              <img
                src={post.media}
                alt=""
                className="img-fluid"
                style={{ borderRadius: "15px", width: "80%" }}
              />
            </div>
          )}

          <div className="mt-2 mb-3 d-flex justify-content-evenly ">
            <button
              className="btn  small text-secondary"
              // type="button"
              // data-bs-toggle="collapse"
              // data-bs-target="#commentCollapse"
              // aria-expanded="false"
              // aria-controls="commentCollapse"
            >
              <BsChatDotsFill className="mx-1" />
              <span className="fs-6">3</span>
            </button>
            <button className="btn  small text-secondary">
              <BsArrowRepeat className="mx-1" />
              <span className="fs-6">3</span>
            </button>
            <button className="btn  small text-secondary">
              <BsHeart className="mx-1" />
              <span className="fs-6">10</span>
            </button>
            <button className="btn  small text-secondary">
              <BsUpload className="mx-1" />
              <span className="fs-6">3</span>
            </button>
          </div>

          <div className="collapse" id="commentCollapse">
            <CommentCreate />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPost;
