import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
    };
  }


  async componentDidMount() {
    const { slug } = this.props.match.params;
    const response = await Api.get(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=${slug}`);
    this.setState({ postData: response.data });
  }

  render() {
    const { postData } = this.state;
    console.log(postData);
    if (postData['0']) {
      return (
        <div className="container">
          <h1 className="title" dangerouslySetInnerHTML={{ __html: postData['0'].title.rendered }} />
          <div className="detailsPage">
            <div className="detailsPage__brief" dangerouslySetInnerHTML={{ __html: postData['0'].excerpt.rendered }} />
            <div className="authorCard">
              <img alt="foto do autor" src={postData['0']._embedded.author['0'].avatar_urls['48']} />
              <div className="authorCard__info">
                <p>{postData['0']._embedded.author['0'].name}</p>
                <p className="authorCard__info__date">30 Set 2019</p>
              </div>
            </div>
            <picture className="detailsPage">
              <img alt={postData['0']._embedded['wp:featuredmedia']['0'].alt_text} src={postData['0']._embedded['wp:featuredmedia']['0'].source_url} />
            </picture>
            <div className="detailsPage__content" dangerouslySetInnerHTML={{ __html: postData['0'].content.rendered }} />
          </div>
        </div>
      );
    }
    return true;
  }
}
