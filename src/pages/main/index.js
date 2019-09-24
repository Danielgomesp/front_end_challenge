import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';

class Main extends Component {
    state = {
        postData: [],
    };

    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const response = await Api.get('/posts?_embed&categories=518');
        this.setState({ postData: response.data });
    };

    handleSubmit(slug) { 
        const {history} = this.props;     
        history.push(`/details/${slug}`)
    };

    render() {
        const { postData } = this.state;
        console.log(postData);
        return (
            <div className="main-div">
                {postData.map(post =>
                        <div className="postContent" key={post.id}>
                            <img alt={post._embedded['wp:featuredmedia']['0'].alt_text} src={post._embedded['wp:featuredmedia']['0'].source_url} />
                            <h2 className="postTitle">{post.title.rendered}</h2>
                            <p className="postText">{post.excerpt.rendered}</p>
                            <button type="button" onClick={()=> this.handleSubmit(post.slug)}>Ler notícia completa.</button>
                        </div>
                )}
            </div>
        )
    };
}
export default Main;