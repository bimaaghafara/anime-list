import dynamic from 'next/dynamic';

const CollectionDetail = dynamic(() => import("src/pages-groups/collection/collection-detail"), {
  ssr: false,
});

export default CollectionDetail;