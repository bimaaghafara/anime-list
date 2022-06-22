const itemsCount = (n) => `calc(100% / ${n})`;

const sx = {
  root: {
    padding: '12px'
  },
  content: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '16px'
  },
  collectionsTitle: {
    display: 'inline-block',
    marginBottom: '16px'
  },
  addNew: {
    float: 'right',
  },
  animeCard: {
    width: {
      xs: itemsCount(1),
      sm: itemsCount(2),
      md: itemsCount(3),
      lg: itemsCount(4),
    },
    display: 'inline-block',
    padding: '12px',
    verticalAlign: 'top',
    position: 'relative'
  },
  delete: {
    position: 'absolute',
    right: '32px',
    top: '32px',
    zIndex: '1',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#333'
    }
  }
}

export default sx;