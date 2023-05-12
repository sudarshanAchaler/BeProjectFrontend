import Link from "next/link";
import { BsArrowRepeat, BsChat, BsHeart, BsPatchCheckFill, BsUpload } from "react-icons/bs";


const ProfilePost = ({post,profilePicture}) => {
  return (
    <>
      <div className="post d-flex my-1 pt-2 px-2 border-bottom" key={post.id}>
        <div className="profilepic">
          <Link href="/">
            <img
              src={profilePicture}
              alt=""
              className="bd-placeholder-img  rounded-circle mx-2"
              width="45"
              height="45"
            />
          </Link>
        </div>

        <div className="">
          <div className="d-flex flex-wrap">
            <p className="fw-bold my-0">
              {post.author_name}
              <span>
                <BsPatchCheckFill className="text-primary mx-1" />
              </span>
            </p>
            <p className="text-secondary my-0 mx-1">. {post.humanizedTime}</p>
          </div>
          <div className="content small">{post.body}</div>
          <div className="images pe-2 my-2 ">
            <img
              src={post.media}
              alt=""
              className="img-fluid"
              style={{ borderRadius: "15px", width: "90%" }}
            />
          </div>
          <div className="my-2 d-flex justify-content-evenly ">
            <button className="btn  small text-secondary">
              <BsChat className="mx-2" />
              <span className="fs-6">3</span>
            </button>
            <button className="btn  small text-secondary">
              <BsArrowRepeat className="mx-2" />
              <span className="fs-6">3</span>
            </button>
            <button className="btn  small text-secondary">
              <BsHeart className="mx-2" />
              <span className="fs-6">{post.likes_count}</span>
            </button>
            <button className="btn  small text-secondary">
              <BsUpload className="mx-2" />
              <span className="fs-6">3</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
