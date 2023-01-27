import Post from "./Post";

export default function PostFactory({ postList }) {
  return (
    <>
      {postList.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
      {postList.length === 0 && <div>There is no post yet!</div>}
    </>
  );
}
