import HomeLayout from "@/components/HomeLayout";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import ProfilePost from "@/components/ProfilePost";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState, useEffect } from "react";

const myProfile = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({
    first_name: "FirstName",
    last_name: "LastName",
    coverPictureUrl:"/Clarence.png",
    profilePictureUrl:"/avatar.jpg",
    nFollowers:69,
    nFollowing:69
  });

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    const resp = await fetch("http://127.0.0.1:8000/auth/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
    });

    const jsonData = await resp.json();
    if (!resp.ok) {
      setIsLoading(false);
      setError(JSON.stringify(jsonData));
    }
    if (resp.ok) {
      setIsLoading(false);
      setPosts(jsonData.posts);
      setProfile(jsonData.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="sticky-top bg-light d-flex align-items-center px-2 mt-0 mb-2 ">
        <Link className="btn butns rounded-circle my-1  fw-bold " href="/home">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <div className="ms-3">
          <h5 className="fw-bold my-0">
            {profile.first_name} {profile.last_name}
          </h5>
          <p className="small my-0">{posts.length} Tweets</p>
        </div>
        <form className="py-1 d-flex ms-auto d-lg-none">
          <input
            className="form-control form-control-sm w-75 me-2 "
            type="text"
            placeholder="Search WeShare"
            aria-label=".form-control-sm example"
          />
          <button className="btn butns btn-light rounded-circle " type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
      <div className="text-center">{isLoading && <div className="spinner-border my-5" style={{"width": "7rem" ,"height": "7rem"}} role="status"/>}</div>

      {!isLoading && <UserProfile user={profile} />}

      <div className="border-bottom py-2">
        <h5 className="fw-bold text-center">Posts</h5>
      </div>
      {posts && posts.map((post) => {
        return <ProfilePost post={post} key={post.id} profilePicture={profile.profilePictureUrl? profile.profilePictureUrl:"/avatar.jpg"} />;
      })}
    </>
  );
};

export default myProfile;

myProfile.getLayout = function getLayout(page) {
  return (
    <>
      <HomeLayout>{page}</HomeLayout>
    </>
  );
};
