import { fstoreService } from "fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StmNow() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const boardName = "stmnow";

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
      });
    setIsLoading(false);
  }, []);

  return (
    <ul>
      {!isLoading ? (
        postList.length !== 0 ? (
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
          <div>No posts yet</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </ul>
  );
}
