import dynamic from 'next/dynamic';

const CollectionList = dynamic(() => import("src/pages-groups/collection/collection-list"), {
  ssr: false,
});

export default CollectionList;