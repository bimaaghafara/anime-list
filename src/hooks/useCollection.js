const useCollection = () => {
  const COLLECTIONS = 'collections';
  const getItem = (key) => JSON.parse(window.localStorage.getItem(key));
  const setItem = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

  // collections
  const getCollections = () => getItem(COLLECTIONS) || [];
  const addCollections = (value) => setItem(COLLECTIONS, value);

  // collection
  // const getCollectionByName = (value) => getCollections().find(e => e.name === value);
  // const addCollection = (value) => addCollections([...getCollections(), value]);
  // const removeCollectionByName = (value) => addCollections(getCollections().filter(e => e.name != value));
  // const addAnimeToCollection = (collectionName, value) => {
  //   const currentCollection = getCollectionByName(collectionName);
  //   const newCollection = {
  //     ...currentCollection,
  //     anime: (currentCollection?.anime || []).push(value)
  //   }
  // }

  // check if collection name is unique
  // const isValidName = (value) => !getCollections().find(e => e.name === value);

  return {
    getCollections,
    addCollections,
    // getCollectionByName,
    // addCollection,
    // removeCollectionByName,
    // addAnimeToCollection,
    // isValidName
  }
}

export default useCollection;