import Link from "next/link";
import {
  BsThreeDotsVertical,
  BsPatchCheckFill,
  BsTrashFill,
} from "react-icons/bs";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";

const FeedPost = ({ post,posts,setPosts }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleDelete = async(postId) => {
    setIsLoading(true);
    setError(null);
    const resp = await fetch("http://13.126.201.102:8000/posts/"+ postId, {
      method: "DELETE",
      headers: { Authorization: "Token " + user.token }
    });
    if (!resp.ok) {
      console.log("err")
      setIsLoading(false);
      setError("Got an error while deleting a post");
    }
    if (resp.ok) {
      console.log("no err")
      setIsLoading(false);
      setPosts(posts.filter(item => item.id !== postId));
    }
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
                {user && post.author == user.user.id && (
                  <>
                    <li>
                      <button className="dropdown-item" onClick={() =>handleDelete(post.id)}>
                        <BsTrashFill className="mx-1" /> Delete
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="content small">{post.body}</div>

          {post.media != "" && (
            <div className="images pe-2 my-2 mb-5 ">
              <img
                src={post.media}
                alt=""
                className="img-fluid"
                style={{ borderRadius: "15px", width: "80%" }}
              />
            </div>
          )}

          <div className="mt-2 mb-3 d-flex justify-content-evenly align-items-center ">
            <span className="badge rounded-pill text-bg-danger fw-normal">Negative {post.negative.toFixed(3)}%</span>
            <span className="badge rounded-pill text-bg-warning fw-normal">Neutral {post.neutral.toFixed(3)}%</span>
            <span className="badge rounded-pill text-bg-success fw-normal">Positve {post.positve.toFixed(3)}%</span>
            <span className="badge rounded-pill text-bg-primary fw-normal">Compound {post.compound.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPost;
