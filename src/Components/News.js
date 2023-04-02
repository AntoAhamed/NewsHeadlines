import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        category: "general"
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsHeadlines - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=4d567079a1cb496c88f4b7221987541f&page=${this.state.page}&pageSize=6`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=4d567079a1cb496c88f4b7221987541f&page=${this.state.page + 1}&pageSize=6`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };

    render() {
        return (
            <div className='container' style={{ marginTop: "70px" }}>
                <h1 className='text-center mx-4 my-4'>NewsHeadlines - Top News Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((e) => {
                                return <div className="col-md-4 my-2" key={e.url}>
                                    <NewsItems title={e.title ? e.title.slice(0, 30) : " "} desc={e.description ? e.description.slice(0, 80) : " "} imageUrl={e.urlToImage ? e.urlToImage : "https://source.unsplash.com/3tYZjGSBwbk"} newsUrl={e.url} author={e.author ? e.author : "Unknown"} publishedAt={e.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/*<div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePrevClick}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 18)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next</button>
                </div>*/}

            </div>
        )
    }
}

export default News
