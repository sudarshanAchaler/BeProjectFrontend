import Feed from "@/components/Feed";
import HomeLayout from "@/components/HomeLayout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
import PostCreate from "@/components/PostCreate";

const home = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuthContext();
  const getFeed = async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://127.0.0.1:8000/posts/", {
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
      setPosts(obj.posts);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const NewPostAdded = () => {
    setNewPostTrigger(!newPostTrigger);
  };

  return (
    <>
      <div className="feed">
        <div className="sticky-top bg-light d-flex align-items-center px-2 mb-2 ">
          <h4 className="fw-bold">Home</h4>

          <form className="py-1 d-flex ms-auto d-lg-none">
            <input
              className="form-control form-control-sm w-75 me-2 "
              type="text"
              placeholder="Search WeShare"
              aria-label=".form-control-sm example"
            />
            <button
              className="btn butns btn-light rounded-circle "
              type="submit"
            >
              <i className="bi bi-search"></i>
            </button>
          </form>
          <button className="btn butns rounded-circle my-1 ms-lg-auto">
            {<BsStar />}
          </button>
        </div>

        <PostCreate user={user} posts={posts} setPosts={setPosts} />

        <div className="text-center mt-5">
          {isLoading && (
            <div
              className="spinner-border my-5"
              style={{ width: "7rem", height: "7rem" }}
              role="status"
            />
          )}
        </div>
        {!isLoading && (
          <Feed posts={posts} user={user} NewPostAdded={NewPostAdded} />
        )}
        {error && <div className="error my-2">{error}</div>}
      </div>
    </>
  );
};

export default home;

home.getLayout = function getLayout(page) {
  return (
    <>
      <HomeLayout>{page}</HomeLayout>
    </>
  );
};
