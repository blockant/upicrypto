import styles from "@/styles/Header.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a href="#" className={styles.navlogo}>
          Wallet
        </a>
        <ul className={styles.navmenu}>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlinkk}>
              Accouunt Address
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlinkk}>
              QR code
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlinkk} onClick={() => signOut()}>
              Public Address
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlinkk}>
              Upload Doxuments(KYC)
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlinkk}>
              Alerts
            </a>
          </li>
          <li className={styles.navitem}>
            <button onClick={() => signOut()} className={styles.navlinkk}>
              SignOut
            </button>
          </li>
        </ul>
        <div className={styles.hamburger}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
}
