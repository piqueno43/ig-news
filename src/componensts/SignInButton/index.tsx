import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button className={styles.sigInButton}>
      <FaGithub color="#04d361"/>
      Edivaldo Silva
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ): (
    <button className={styles.sigInButton}>
      <FaGithub color="#eba417"/>
      Sign In with Github
    </button>
  )
}