import { Link } from "gatsby"
import React from "react"
import styles from "./header.module.scss"

export default ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link className={styles.title} to="/">
          {siteTitle}
        </Link>
      </h1>
      <nav className={styles.navList}>
        <Link
          to="/"
          className={styles.navItem}
          activeClassName={styles.activeNavItem}
        >
          Home
        </Link>
        <Link
          to="/blog"
          className={styles.navItem}
          activeClassName={styles.activeNavItem}
        >
          Blog
        </Link>
        <Link
          to="/about"
          className={styles.navItem}
          activeClassName={styles.activeNavItem}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={styles.navItem}
          activeClassName={styles.activeNavItem}
        >
          Contact
        </Link>
      </nav>
    </div>
  </header>
)
