import "@/styles/app.css";
import "@/styles/globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import React from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])


  if (Component.getLayout) {
    return (
      <AuthContextProvider>
        {Component.getLayout(loading ? <Loader/> :(<Component {...pageProps} />))}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" />
      </AuthContextProvider>
    );
  }
  return (
    <AuthContextProvider>
      <Navbar />
      {loading ? <Loader/> :(<Component {...pageProps} />)}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" />
    </AuthContextProvider>
  );
}
