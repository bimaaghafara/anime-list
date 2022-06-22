const useCollection = () => {
  const COLLECTIONS = 'collections';
  const getItem = (key) => JSON.parse(window.localStorage.getItem(key));
  const setItem = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

  // collections
  const getCollections = () => getItem(COLLECTIONS) || [];
  const addCollections = (value) => setItem(COLLECTIONS, value);

  // collection
  const getCollection = (name) => getCollections().find(e => e.name === name);
  const addCollection = (value) => addCollections([...getCollections(), value]);
  const editCollection = (currentName, collection) => addCollections(
    getCollections().map(e => ({
      ...e,
      ...(e.name === currentName && collection)
    })));
  const deleteCollection = (name) => addCollections(getCollections().filter(e => e.name != name));
  const addAnimesToCollection = (collectionName, animes) => {
    const currentCollection = getCollection(collectionName);
    const newCollection = {
      ...currentCollection,
      animes: [...(currentCollection?.animes || []), ...animes]
        .filter((v,i,a) => a.findIndex(v2 => v2.id === v.id ) === i )
    }
    editCollection(collectionName, newCollection);
  }

  // check if collection name is unique
  const isUniqueName = (value) => !getCollections().find(e => e.name === value);

  return {
    getCollections,
    addCollections,
    getCollection,
    addCollection,
    editCollection,
    deleteCollection,
    addAnimesToCollection,
    isUniqueName
  }
}

export default useCollection;