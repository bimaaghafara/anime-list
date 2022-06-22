const itemsCount = (n) => `calc(100% / ${n})`;

const sx = {
  content: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '16px'
  },
  collectionsTitle: {
    display: 'inline-block',
    marginBottom: '16px'
  },
  collectionName: {
    maxWidth: 'calc(100% - 80px)',
    display: 'inline-block',
    padding: '0 12px',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
  },
  noCollection: {
    padding: '0 12px',
  },
  addNew: {
    float: 'right',
  },
  anime: {
    // border: '1px solid red',
    display: 'inline-block',
    width: {
      xs: itemsCount(2),
      sm: itemsCount(3),
      md: itemsCount(5),
      lg: itemsCount(6),
    },
    verticalAlign: 'top',
    padding: '12px',
  },
  animeIamge: (src) => ({
    background: `url("${src}") #eee no-repeat center center / cover`,
    backgroundSize: 'cover',
    width: '100%',
    paddingBottom: '100%',
    marginBottom: '8px'
  }),
  dialogContent: {
    width: '500px',
    maxWidth: '80vw'
  }
}

export default sx;