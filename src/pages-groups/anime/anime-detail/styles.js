
const sx = {
  bannerImage: {
    width: '100%',
    marginBottom: '16px'
  },
  content: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '16px'
  },
  headerContainer: {
    marginBottom: '16px',
  },
  headerImage: {
    display: {
      xs: 'block',
      sm: 'inline-block'
    },
    width: '200px',
    margin: {
      xs: 'auto',
      sm: 'unset'
    }
  },
  headerRight: {
    display: {
      xs: 'block',
      sm: 'inline-block'
    },
    width: {
      xs: '100%',
      sm: 'calc(100% - 200px)',
    },
    paddingLeft: {
      xs: 'unset',
      sm: '16px',
      md: '24px',
    },
    verticalAlign: 'top',
  },
  titleContainer: {
    marginTop: {
      xs: '18px',
      sm: 'unset'
    },
    marginBottom: '16px',
    '& .MuiTypography-root': {
      fontSize: {
        xs: '18px',
        md: '20px',
        lg: '27px',
        xl: '32px',
      },
    }
  },
  description: {
    marginBottom: '16px',
    textAlign: 'justify',
    lineHeight: '1.5',
    fontSize: {
      xs: '12px',
      md: '14px',
      lg: '18px',
      xl: '22px',
    },
  },
  leftDetail: {
    display: {
      xs: 'inline-block',
      sm: 'block'
    },
    width: {
      xs: '50%',
      sm: '100%',
    },
    lineHeight: '1.5',
    margin: '12px 0',
  },
  leftDetailsText: {
    color: '#777',
    fontSize: '14px'
  },
  charactersTitle: {
    fontSize: '24px'
  },
  characterContainer: {
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'top',
    padding: '12px',
    maxWidth: '124px'
  },
  characterIamge: (src) => ({
    background: `url("${src}") #eee no-repeat center center / cover`,
    backgroundSize: 'cover',
    height: '150px',
    width: '100px',
    marginBottom: '8px'
  }),
  characterName: {
    fontSize: '12px'
  },
  characterRole: {
    fontSize: '12px',
    color: '#777'
  }
}

export default sx;