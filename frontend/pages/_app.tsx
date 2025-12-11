import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [qc, setQc] = useState<QueryClient | null>(null);

  useEffect(() => {
    setQc(new QueryClient());
  }, []);

  if (!qc) return null;

  return (
    <QueryClientProvider client={qc}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
