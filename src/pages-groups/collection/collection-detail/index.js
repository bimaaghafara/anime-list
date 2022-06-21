import { useRouter } from "next/router";

const CollectionDetail = () => {
  const { query } = useRouter();
  console.log(query);

  return (
    <>CollectionDetail</>
  )
}

export default CollectionDetail;