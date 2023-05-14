import PostFactory from "components/post/PostFactory";

export default function Academics() {
  // const [postList, setPostList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const boardName = "stmnow";

  // useEffect(() => {
  //   fstoreService
  //     .collection("posts")
  //     .get()
  //     .then((snapshot) => {
  //       let temp = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         if (data.board === boardName && data.isPublished) {
  //           const postTitle = doc.get("title");
  //           temp.push({ id: doc.id, postTitle });
  //         }
  //       });
  //       setPostList(temp);
  //       setIsLoading(false);
  //     });
  // }, []);

  // return (
  //   <>
  //     {!isLoading ? (
  //       postList.length !== 0 ? (
  //         <ul>
  //           {postList.map((post) => (
  //             <li key={post.id}>
  //               <Link to={`/post/${post.id}`}>{post.postTitle}</Link>
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <div>No posts yet</div>
  //       )
  //     ) : (
  //       <div>Loading...</div>
  //     )}
  //   </>
  // );
  return <PostFactory boardName="stmnow" />;
}
