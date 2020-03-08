import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';

import styles from './blog.module.scss';

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            frontmatter {
                title
                date
                tags
            }
            html
        }
    }
`;

const Blog = ({ data }) => {
    return (
        <Layout>
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <p>{data.markdownRemark.frontmatter.date}</p>
            <strong>Tags:</strong>
            <ul className={styles.tags}>
                {data.markdownRemark.frontmatter.tags.map((tag) => (
                    <li className={styles.tag}>
                        <Link to={`/blog/tags/${tag}`}>{tag}</Link>
                    </li>
                ))}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </Layout>
    );
};

export default Blog;
