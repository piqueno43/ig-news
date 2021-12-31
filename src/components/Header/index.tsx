import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo ig.news" />

        <nav>
          <ActiveLink activeClassName={styles.activeLink} href="/">
            <a>Home</a>
          </ActiveLink>          
          <ActiveLink activeClassName={styles.activeLink} href="/posts" passHref prefetch as="/posts">
            <a>Posts</a>
          </ActiveLink>          
        </nav>

        <SignInButton/>
      </div>
    </header>
  );
}