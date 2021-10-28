import type { AppProps } from 'next/app'
import '../styles/global.scss';
import { Header } from '../componensts/Header';

function IgNews({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>              
      <Component {...pageProps} />
    </>
    )
}

export default IgNews
