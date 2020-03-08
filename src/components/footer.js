import React from 'react';
import styles from './footer.module.scss';

export default ({ siteAuthor }) => (
    <footer className={styles.footer}>
        <p>{`© ${new Date().getFullYear()} ${siteAuthor}`}</p>
    </footer>
);
