import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import { useState } from "react";

const CommentCreate = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState("");

  const HandleCommentSubmit = () => {
    console.log("comment create");
  };
  return (
    <div className="border-top pt-3">
      <div className="d-flex rounded py-3 px-0 align-items-center">
        <div className="profilepic">
          <img
            src={
              user && user.user.profilePictureUrl != ""
                ? user.user.profilePictureUrl
                : "/avatar.jpg"
            }
            className="bd-placeholder-img rounded-circle mx-2"
            height="32"
            width="32"
            alt=""
          />
        </div>
        <form className="w-75">
          <input
            type="text"
            className="form-control my-1"
            placeholder="add comment"
          />
        </form>
      </div>
      <Link href="/posts" className="small">
        View all comments
      </Link>
    </div>
  );
};

export default CommentCreate;
