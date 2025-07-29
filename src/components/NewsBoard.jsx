import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, searchQuery }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setArticles(data.articles));
    }, [category]);

    const filteredArticles = articles.filter((article) => {
        if (!searchQuery) return true; // თუ საძიებო სიტყვა ცარიელია, ყველა დააბრუნე
        const lowerQuery = searchQuery.toLowerCase();
        return (
            (article.title && article.title.toLowerCase().includes(lowerQuery)) ||
            (article.description && article.description.toLowerCase().includes(lowerQuery))
        );
    });

    return (
        <div>
            <h2 className="text-center">
                Latest <span className="badge bg-danger">News</span>
            </h2>
            {Array.isArray(filteredArticles) && filteredArticles.map((news, index) => (
                <NewsItem
                    key={index}
                    title={news.title}
                    description={news.description}
                    src={news.urlToImage}
                    url={news.url}
                />
            ))}
        </div>
    );
};

export default NewsBoard;
