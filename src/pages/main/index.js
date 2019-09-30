import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';

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

    disableButton(elementId) {
        const id = document.getElementById(elementId);
        id.className = 'button--disabled';
        id.disabled = true;
        id.innerHTML = "Isso é tudo por hoje.";
    }

    loadContent = async (pageNumber = this.state.page) => {
        const response = await Api.get(`/posts?_embed&categories=518&page=${pageNumber}`);
        const { headers, data } = response;
        const totalPages = headers['x-wp-totalpages'];

        if (pageNumber < totalPages) {
            this.setState({
                postData: [...this.state.postData, ...data],
                page: pageNumber + 1
            });
        }
        else if (pageNumber === parseInt(totalPages)) {
            this.setState({
                postData: [...this.state.postData, ...data],
            });
            this.disableButton("loadMore");
        }
    };

    render() {
        const { postData } = this.state;
        return (
            <div className="mainPage">
                <h1 className="mainPage__title">Apiki para Devs</h1>
                <div className="postingArea">
                    {postData.map(post =>
                        <div className="card" key={post.id}>
                            <Link to={`/details/${post.slug}`}>
                                <img alt={post._embedded['wp:featuredmedia']['0'].alt_text} src={post._embedded['wp:featuredmedia']['0'].source_url} />
                                <h3 className="card__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                <div className="card__text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                            </Link>
                        </div>
                    )}
                </div>
                <button id="loadMore" type="button" onClick={() => this.loadContent()}> Carregar mais...</button>
            </div>
        )
    };
}
export default Main;