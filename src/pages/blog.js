import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import styles from './blog.module.scss';

export default () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
                    edges {
                        node {
                            frontmatter {
                                title
                                date(fromNow: true)
                            }
                            fields {
                                slug
                            }
                            timeToRead
                            html
                            excerpt
                        }
                    }
                    group(field: frontmatter___tags) {
                        tag: fieldValue
                        totalCount
                    }
                }
            }
        `
    );

    const { edges } = data.allMarkdownRemark;
    const allTags = data.allMarkdownRemark.group;

    return (
        <Layout>
            <h1>Blog</h1>
            <h2>Find the blog posts by title:</h2>
            <ol className={styles.posts}>
                {edges.map((post) => {
                    return (
                        <li className={styles.post} key={post.node.fields.slug}>
                            <Link to={`/blog/${post.node.fields.slug}`}>
                                <h2>{post.node.frontmatter.title}</h2>
                                <p>{post.node.frontmatter.date}</p>
                            </Link>
                        </li>
                    );
                })}
            </ol>
            <h2>Tags:</h2>

            <ul>
                {allTags.map((tag) => (
                    <li key={`${tag.tag}`}>
                        <Link to={`/blog/tags/${tag.tag}`}>{tag.tag}</Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};
