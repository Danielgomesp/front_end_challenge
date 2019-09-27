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

    if (postData['0']) {
      return (
        <div className="detailsPage">
          <h1 className="detailsPage__title" dangerouslySetInnerHTML={{ __html: postData['0'].title.rendered }} />
          <h3 className="detailsPage__brief" dangerouslySetInnerHTML={{ __html: postData['0'].excerpt.rendered }} />
          <div className="detailsPage__date">{postData['0'].date}</div>
          <div className="detailsPage__image">
            <img alt={postData['0']._embedded['wp:featuredmedia']['0'].alt_text} src={postData['0']._embedded['wp:featuredmedia']['0'].source_url} />
          </div>
          <div className="detailsPage__content" dangerouslySetInnerHTML={{ __html: postData['0'].content.rendered }} />
        </div>
      );
    }
    return true;
  }
}
