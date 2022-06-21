const itemsCount = (n) => `calc(100% / ${n})`;

const sx = {
  root: {
    padding: '12px',
  },
  title: {
    fontSize: {
      xs: '18px',
      md: '24px',
      lg: '32px',
    },
    padding: '12px 12px 0px'
  },
  animeCard: {
    width: {
      xs: itemsCount(1),
      sm: itemsCount(2),
      md: itemsCount(3),
      lg: itemsCount(4),
      xl: itemsCount(5)
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