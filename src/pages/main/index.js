import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';

export default class Main extends Component {
    state = {
        postData: [],
    };

    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const response = await Api.get('/posts');
        this.setState({ postData: response.data });
    };
    render() {
        const { postData } = this.state;
        console.log(postData);
        return (
            postData.map(post =>
                <article className="postArticle" key={post.id}>
                    <h2 className="postTitle">{post.title.rendered}</h2>
                    <p className="postContent">{post.content.rendered}</p>
                </article>
            )
        )
    };
}