import { useEffect, useState } from "react";
import { dbService, fstoreService } from "fbase";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

export default function Post() {
  const [content, setContent] = useState(null);
  const [documentData, setDocumentData] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [createdAtStr, setCreatedAtStr] = useState();
  const [createdByUserName, setCreatedByUserName] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [postTitle, setPostTitle] = useState();
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;
    const fetchData = async () => {
      const data = await fstoreService.collection("posts").doc(postId).get();
      setDocumentData(data);
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    if (documentData && documentData.data()) {
      const { content, createdAt, createdBy, title } = documentData.data();
      setContent(DOMPurify.sanitize(content));
      setCreatedAt(createdAt);
      setCreatedBy(createdBy);
      setPostTitle(title);
    }
  }, [documentData]);

  const fetchUserName = async (createdBy) => {
    const snapshot = await dbService.ref(`users/${createdBy}`).once("value");
    const value = snapshot.val();
    return value.preferredName
      ? value.preferredName + " " + value.lastName
      : value.firstName + " " + value.lastName;
  };
  useEffect(() => {
    if (!createdBy) return;
    fetchUserName(createdBy).then((username) => setCreatedByUserName(username));
  }, [createdBy]);
  useEffect(() => {
    if (!createdAt) return;
    setCreatedAtStr(createdAt.toDate().toDateString());
  }, [createdAt]);

  return (
    documentData &&
    documentData.data() && (
      <>
        <div>{postTitle}</div>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
        <div>Created At: {createdAtStr}</div>
        <div>Created By: {createdByUserName}</div>
      </>
    )
  );
}
