import { fstoreService } from "fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StmNow() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fstoreService
      .collection("posts")
      .get()
      .then((snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => {
          const postTitle = doc.get("title");
          temp.push({ id: doc.id, postTitle });
        });
        setPostList(temp);
      });
  }, []);

  return (
    <ul>
      {postList.length !== 0 ? (
        postList.map((post) => {
          console.log(post);
          return (
            <li>
              <Link key={post.id} to={`/post/${post.id}`}>
                {post.postTitle}
              </Link>
            </li>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </ul>
  );
}
