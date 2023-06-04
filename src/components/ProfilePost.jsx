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
          <div className="mt-2 mb-3 d-flex justify-content-evenly align-items-center ">
            <span className="badge rounded-pill text-bg-danger fw-normal mx-2">Negative {post.negative.toFixed(3)}%</span>
            <span className="badge rounded-pill text-bg-warning fw-normal mx-2">Neutral {post.neutral.toFixed(3)}%</span>
            <span className="badge rounded-pill text-bg-success fw-normal mx-2">Positve {post.positve.toFixed(3)}%</span>
            <span className="badge rounded-pill text-bg-primary fw-normal mx-2">Compound {post.compound.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
