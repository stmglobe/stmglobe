import { fstoreService } from "fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostFactory({ boardName }) {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fstoreService
      .collection("posts")
      .get()
      .then((snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.board === boardName && data.isPublished) {
            const postTitle = doc.get("title");
            temp.push({ id: doc.id, postTitle });
          }
        });
        setPostList(temp);
        setIsLoading(false);
      });
  }, [boardName]);

  return (
    <>
      {!isLoading ? (
        postList.length !== 0 ? (
          <ul>
            {postList.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.postTitle}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No posts yet</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
