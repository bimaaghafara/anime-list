
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
  }
}

export default sx;