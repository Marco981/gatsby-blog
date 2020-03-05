import React from 'react';
import Layout from '../components/layout';
import { graphql, useStaticQuery } from 'gatsby';

export default () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark {
                    edges {
                        node {
                            frontmatter {
                                title
                                date(fromNow: true)
                            }
                            timeToRead
                            html
                            excerpt
                        }
                    }
                }
            }
        `
    );
    return (
        <Layout>
            <h1>Blog</h1>
            <ol>
                {data.allMarkdownRemark.edges.map((post) => (
                    <li>
                        {post.node.frontmatter.title} - {post.node.frontmatter.date}
                    </li>
                ))}
            </ol>
        </Layout>
    );
};
