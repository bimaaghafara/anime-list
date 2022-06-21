const sx = {
  title: {
    fontSize: {
      xs: '16px',
      md: '18px',
      lg: '24px',
      xl: '27px',
    },
  },
  bannerIamge: (src) => ({
    background: `url("${src}") #eee no-repeat center center / cover`,
    backgroundSize: "cover",
    height: "160px",
    margin: "16px 16px 0"
  }),
  description: {
    textAlign: 'justify',
    fontSize: {
      xs: '12px',
      md: '14px',
      lg: '18px',
      xl: '22px',
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
      textUnderlinePosition: 'under'
    },
    marginTop: '8px',
    color: 'blue',
    fontSize: {
      xs: '12px',
      md: '14px',
      lg: '18px',
      xl: '22px',
    },
  }
}

export default sx;