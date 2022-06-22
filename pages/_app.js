import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Stack sx={{ p: '16px 28px', borderBottom: '1px solid #ccc' }} direction="row" spacing={2}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/anime')}
          >
            Anime
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/collection')}
          >
            Collection
          </Box>
        </Stack>
        <Component {...pageProps} />
      </>
    </QueryClientProvider>
  );
}

export default MyApp
