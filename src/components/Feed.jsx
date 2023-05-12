import FeedPost from "./FeedPost";

const Feed = ({posts}) => {

  return (
    <>
      {posts.map((post) => {
        return <FeedPost post={post} key={post.id} />;
      })}
    </>
  );
};

export default Feed;
