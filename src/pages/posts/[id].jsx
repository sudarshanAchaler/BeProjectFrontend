import { useRouter } from "next/router";

const postDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>postDetail {id}</div>;
};

export default postDetail;
