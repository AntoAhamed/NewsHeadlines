import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, desc, imageUrl, newsUrl, author, publishedAt } = this.props;

        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="" style={{ height: "12rem" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}...</p>
                        <p className="card-text"><small className="text-muted">{author} On {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsUrl} target="_new" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
