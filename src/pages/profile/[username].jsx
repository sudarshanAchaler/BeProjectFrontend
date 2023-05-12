import { useRouter } from "next/router";
import HomeLayout from "@/components/HomeLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import ProfilePost from "@/components/ProfilePost"; 
import OthersUserProfile from "@/components/OthersUserProfile";
import Link from "next/link";

const othersProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followingUser, setFollowingUser] = useState(false)
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
    const resp = await fetch(
      "http://127.0.0.1:8000/auth/profile/" + username + "/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + user.token,
        },
      }
    );

    const jsonData = await resp.json();
    if (!resp.ok) {
      setIsLoading(false);
      setError(jsonData.error);
    }
    if (resp.ok) {
      setIsLoading(false);
      setPosts(jsonData.posts);
      setProfile(jsonData.user);
      setFollowingUser(jsonData.followingUser);
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
      {!isLoading && <OthersUserProfile usr={profile} followingUser={followingUser} />}
      {error && <div className="error my-2">{error}</div>}

      <div className="border-bottom py-2">
        <h5 className="fw-bold text-center">Posts</h5>
      </div>
      {posts &&
        posts.map((post) => {
          return <ProfilePost post={post} key={post.id} profilePicture={profile.profilePictureUrl?profile.profilePictureUrl:"/avatar.jpg"} />;
        })}
    </>
  );
};

export default othersProfile;

othersProfile.getLayout = function getLayout(page) {
  return (
    <>
      <HomeLayout>{page}</HomeLayout>
    </>
  );
};
