// libs
import { useRouter } from 'next/router';

// components
import { Box, Stack } from '@mui/material';

// styles
import sx from './styles';

const Navigation = () => {
  const router = useRouter();
  return (
    <Stack sx={sx.appBar} direction="row" spacing={2}>
      <Box
        sx={sx.link}
        onClick={() => router.push('/anime')}
      >
        Anime
      </Box>
      <Box
        sx={sx.link}
        onClick={() => router.push('/collection')}
      >
        Collection
      </Box>
    </Stack>
  )
}

export default Navigation;