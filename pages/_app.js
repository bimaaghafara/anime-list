import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from 'src/components/navigation';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Navigation />
        <Component {...pageProps} />
      </>
    </QueryClientProvider>
  );
}

export default MyApp;
