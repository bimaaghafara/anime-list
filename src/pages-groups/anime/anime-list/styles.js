const itemsCount = (n) => `calc(100% / ${n})`;

const sx = {
  content: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '16px'
  },
  titleContainer: {
    padding: '12px'
  },
  title: {
    marginBottom: '16px',
    display: 'inline-block'
  },
  addToCollection: {
    float: 'right'
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
    verticalAlign: 'top'
  },
  paginationContainer: {
    marginTop: '12px',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
}

export default sx;