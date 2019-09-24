import React from 'react';
import './styles.css';
import Api from '../../services/api';

export default function Details({ match }) {
    
    const { slug } = match.params;
    const loadContent = async () => {
        const response = await Api.get(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=como-desabilitar-editor-gutenberg-wordpress`);
        console.log(response.data);
    }

    return <p>hi, {match.params.slug}</p>
};
