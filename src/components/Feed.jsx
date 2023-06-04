import FeedPost from "./FeedPost";

const Feed = ({posts, setPosts}) => {
  return (
    <>
      {posts.map((post) => {
        return <FeedPost post={post} key={post.id} setPosts={setPosts} posts={posts} />;
      })}
    </>
  );
};

export default Feed;
