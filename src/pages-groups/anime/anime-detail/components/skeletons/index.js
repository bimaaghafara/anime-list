import { Box, Button, Chip, Skeleton, Grid, Paper } from '@mui/material';

import contentSx from "../../styles";

const Skeletons = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        sx={{ pb: "21%", ...contentSx.bannerImage }}
      />
      <Box sx={contentSx.content}>
        <Box sx={contentSx.headerContainer}>
          <Skeleton
            variant="rectangular"
            sx={{ pb: "300px", ...contentSx.headerImage }}
          />
          <Box sx={{ ...contentSx.headerRight, '&>*>*': { mb: 1}}}>
            <Box sx={contentSx.titleContainer}>
              <Skeleton variant="rectangular" width="180px" height="18px" />
              <Skeleton variant="rectangular" width="250px" height="18px" />
            </Box>
            <Box sx={contentSx.description}>
              <Skeleton variant="rectangular" width="100%" height="14px" />
              <Skeleton variant="rectangular" width="100%" height="14px" />
              <Skeleton variant="rectangular" width="100%" height="14px" />
              <Skeleton variant="rectangular" width="40%" height="14px" />
              <Skeleton variant="rectangular" width="100%" height="14px" />
              <Skeleton variant="rectangular" width="100%" height="14px" />
              <Skeleton variant="rectangular" width="60%" height="14px" />
            </Box>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper sx={{ p: 2 }}>
              {Array(10).fill().map((e, i) => (
                <Box sx={{ ...contentSx.leftDetail, '&>*': { mb: 1 }}} key={i}>
                  <Skeleton variant="rectangular" width="80%" height="14px" />
                  <Skeleton variant="rectangular" width="60%" height="14px" />
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Paper sx={{ p: 2, mb: '16px' }}>
              <Skeleton sx={contentSx.charactersTitle} variant="rectangular" width="175px" height="24px" />
              <Button
                size="small"
                variant="contained"
                sx={contentSx.addNew}
                disabled
              >
                Add New
              </Button>
              <Box>
                {Array(3).fill().map((e, i) => (
                  <Skeleton
                    key={i}
                    sx={{ ...contentSx.collectionChip, borderRadius: '99px' }}
                    variant="rectangular"
                    width="50px"
                    height="36px"
                  />
                ))}
              </Box>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Box>
                <Skeleton sx={contentSx.charactersTitle} variant="rectangular" width="150px" height="22px" />
              </Box>
              {Array(18).fill().map((e, i) => (
                <Box key={i} sx={contentSx.characterContainer}>
                  <Skeleton
                    sx={contentSx.characterIamge()}
                    variant="rectangular"
                    width="100px"
                    height="150px"
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ m: 'auto', mb: '4px' }}
                    width="45px"
                    height="12px"
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ m: 'auto', mb: '4px' }}
                    width="35px"
                    height="10px"
                  />
                </Box>  
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Skeletons;