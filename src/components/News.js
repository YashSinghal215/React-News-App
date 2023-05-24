import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: `in`,
        pageSize: 8,
        category: `general`,
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18c702cedc1c42d89fa39de8e1ddc6dd&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        // console.log(parseData); 
        this.props.setProgress(70); 
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    };

    // handlePrevpage = async () => {
    //     this.setState({ page: this.state.page - 1 })

    //     this.updateNews()
    // }

    // handleNextpage = async () => {
    //     // if(this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize))
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()
    // }

    fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18c702cedc1c42d89fa39de8e1ddc6dd&page=${this.state.page +1 }&pagesize=${this.props.pageSize}`;
        this.setState({page : this.state.page + 1});
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading : false,
        })
    }


    render() {
        return (
            <div className="container" style={{marginTop:'95px'}}>
                <h2>Top Headlines are</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                                    newsurl={element.url} author={element.author} date={element.publishedAt}
                                    source = {element.source.name} />
                            </div>
                        })}
                    </div>

                </InfiniteScroll>
            </div>
        )
    }
}

export default News
