import { GetStaticProps, GetServerSideProps } from 'next';
import Head  from 'next/head';
import { SubscribeNowButton } from '../components/SubscribeNowButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home ({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignews</title>
      </Head>      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>form {product.amount} month.</span>
          </p>
        <SubscribeNowButton/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {  
  const price = await stripe.prices.retrieve("price_1KCqQ4EBX2rZTHVjGPp5UNLb");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}