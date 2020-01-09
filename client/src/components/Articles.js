import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled("div")`
    display: flex;
    justify-content: space-around;
`;

const ArticleBox = styled("div")`
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 20px;
`;

class Article extends React.Component {
    render() {
        return (
            <ArticleBox>
                <h1>{this.props.article.title}</h1>
                <p>{this.props.article.body}</p>
            </ArticleBox>
        )
    }
};

export default class Articles extends React.Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/article/get", {
            headers: { "auth-token": this.props.token }
        }).then(articles => {
            console.log(articles);
            if (!articles.data.success) {
                console.log(`Couldn't article: ${articles.data.data}`);
                return;
            }
            this.setState({ articles: articles.data.data });
        }).catch(err => {
            console.log(`Couldn't article: ${err}`);
        });
    }

    render() {
        const articles = this.state.articles.map((article, i) => {
            return <Article key={i} article={article} />
        });

        return (
            <Container>
                {articles}
            </Container>
        );
    }
};