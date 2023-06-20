import type React from 'react';
import styles from './Layout.module.css';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.app__container}>
      <Header />
      <main className={styles.main__content}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
