const path = require('path');
const _ = require('lodash');

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md');

        createNodeField({
            node,
            name: 'slug',
            value: slug
        });
    }
};

module.exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    const blogTemplate = path.resolve('./src/templates/blog.js');
    const tagTemplate = path.resolve('./src/templates/tags.js');
    const res = await graphql(`
        query {
            postsRemark: allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                        }
                    }
                }
                
            }
            tagsGroup: allMarkdownRemark {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `);

    if (res.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    res.data.postsRemark.edges.forEach(({ node }) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${node.fields.slug}`,
            context: {
                slug: node.fields.slug
            }
        });
    });

    res.data.tagsGroup.group.forEach((tag) => {
        createPage({
            path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagTemplate,
            context: {
                tag: tag.fieldValue
            }
        });
    });
};
