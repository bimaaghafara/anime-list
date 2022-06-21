const useCollection = () => {
  const COLLECTIONS = 'collections';
  const getItem = (key) => {
    // if (typeof window === 'undefined') return null;
    return JSON.parse(window.localStorage.getItem(key));
  };
  const setItem = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

  // collections
  const getCollections = () => getItem(COLLECTIONS) || [];
  const setCollections = (value) => setItem(COLLECTIONS, value);

  // collection
  const getCollectionBy = (key, value) => getCollections().find(e => e[key] === value);
  const setCollection = (value) => setCollections([...getCollections(), value])

  // check if collection name is unique
  const isValidName = (value) => !getCollections().find(e => e.name === value);

  return {
    getCollections,
    setCollections,
    getCollectionBy,
    setCollection,
    isValidName
  }
}

export default useCollection;