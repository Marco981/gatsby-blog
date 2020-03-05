import React from 'react';

export default ({ siteAuthor }) => (
    <footer>
        <p>{`© ${new Date().getFullYear()} ${siteAuthor}`}</p>
    </footer>
);
