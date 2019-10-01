import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';
import Loader from '../../components/loader/index';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: [],
            headers: {},
            page: 1,
            pageLoaded: false,
        };
    }
    componentDidMount() {
        const { page } = this.props.match.params;
        this.loadContent(page);
    };

    componentDidUpdate() {
        this.contentLoading('loading');
    }

    disableButton(elementId) {
        const id = document.getElementById(elementId);
        id.className = 'button--disabled';
        id.disabled = true;
        id.innerHTML = "Isso é tudo por hoje.";
    }

    loadContent = async (pageNumber = this.state.page) => {
        this.setState({ pageLoaded: false });
        const response = await Api.get(`/posts?_embed&categories=518&page=${pageNumber}`);
        const { headers, data } = response;
        const totalPages = headers['x-wp-totalpages'];

        if (pageNumber < totalPages) {
            this.setState({
                postData: [...this.state.postData, ...data],
                page: pageNumber + 1,
                pageLoaded: true,
            });
        }
        else if (pageNumber === parseInt(totalPages)) {
            this.setState({
                postData: [...this.state.postData, ...data],
                pageLoaded: true,
            });
            this.disableButton("loadMore");
        }
    };

    contentLoading(id) {
        const { pageLoaded } = this.state;
        if (pageLoaded) {
            document.getElementById(id).style.display = "none";
        } else {
            document.getElementById(id).style.display = "block";
        }
    };

    render() {
        const { postData } = this.state;

        return (
            <div className="mainPage">
                <h1 className="mainPage__title">Apiki para Devs</h1>
                <div className="postingArea">
                    {postData.map(post => {
                        let img = 'https://blog.apiki.com/wp-content/uploads/sites/2/2019/09/cropped-business-first-650x435.png'; 
                          if (post._embedded['wp:featuredmedia']) {
                            img = post._embedded['wp:featuredmedia']['0'].source_url;
                          } 

                      return(
                        <div className="card" key={post.id}>
                            <Link to={`/details/${post.slug}`}>
                                <img alt="Imagem" src={img} />
                                <h3 className="card__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                <div className="card__text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                            </Link>
                        </div>
                      )
                    })}
                </div>
                <Loader />
                <button id="loadMore" type="button" onClick={() => this.loadContent()}> Carregar mais...</button>
            </div>
        )
    };
}
export default Main;