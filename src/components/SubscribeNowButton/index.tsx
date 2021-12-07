import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeNowButtonProps {
  priceId: string;
}

export function SubscribeNowButton({ priceId }: SubscribeNowButtonProps) {
  const [ session ] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if(!session) {      
      signIn('github');

      return;
    }

    if(session.activeSuscription) {
      router.push('/posts');

      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({sessionId});

    } catch (error) {
      console.log(error);
      alert(error);
    }          
  }

  return ( 
    <button      
      type="button"
      className={styles.subscribeNowButton}
      onClick={handleSubscribe}
    >Subscribe now</button>
  );
}