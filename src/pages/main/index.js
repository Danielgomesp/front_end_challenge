import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';
import Header from '../../components/header/index';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postData: [],
            headers: {},
            page: 1,
        };
    }
    componentDidMount() {
        const { page } = this.props.match.params;
        this.loadContent(page);
    };

    loadContent = async (pageNumber = this.state.page) => {
        const response = await Api.get(`/posts?_embed&categories=518&page=${pageNumber}`);

        const { headers, data } = response;

        this.setState({
            // postData: data
            postData: [...postData, data]
        });

        this.setState({
            page: pageNumber + 1
        });
    };

    handleSubmit(slug) {
        const { history } = this.props;
        history.push(`/details/${slug}`)
    };

    render() {
        const { postData } = this.state;
        return (
            <div className="main-div">
                <Header />
                <div className="postingArea">

                    {postData.map(post =>
                        <div className="postContent" key={post.id}>
                            <img alt={post._embedded['wp:featuredmedia']['0'].alt_text} src={post._embedded['wp:featuredmedia']['0'].source_url} />
                            <h2 className="postTitle">{post.title.rendered}</h2>
                            <p className="postText">{post.excerpt.rendered}</p>
                            <div className="loadMore" onClick={() => this.handleSubmit(post.slug)}>Ler notícia completa</div>
                        </div>
                    )}
                </div>
                <button type="button" onClick={() => this.loadContent()}> Carregar mais...</button>
            </div>
        )
    };
}
export default Main;