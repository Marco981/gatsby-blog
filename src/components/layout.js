import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import '../styles/index.scss';
import styles from './layout.module.scss';

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    author
                }
            }
        }
    `);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header siteTitle={data.site.siteMetadata.title} />
                <main>{children}</main>
            </div>

            <Footer siteAuthor={data.site.siteMetadata.author} />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
