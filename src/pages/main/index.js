import React, { Component, history } from 'react';
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
        const response = await Api.get('/posts');
        this.setState({ postData: response.data });
    };

    handleSubmit(e) {
        e.preventDefault();
        //history.push("/details");
    };

    render() {
        const { postData } = this.state;
        console.log(postData);
        return (
            <div className="main-div">
                <ul>
                    {postData.map(post =>
                        <form onSubmit={this.handleSubmit}>
                            <li key={post.id}>
                                <h2 className="postTitle">{post.title.rendered}</h2>
                                <img alt="Capa do post" src="https://blog.apiki.com/wp-content/uploads/sites/2/2019/08/cropped-google-webp-650x435.jpg" />
                                <p className="postContent">{post.excerpt.rendered}</p>
                                <footer>
                                    <button>Carregar mais</button>
                                </footer>
                            </li>
                        </form>
                    )}
                </ul>
            </div>
        )
    };
}
export default Main;