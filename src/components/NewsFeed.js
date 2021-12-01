import { useEffect, useState } from "react"
import axios from "axios";

const NewsFeed = () => {

    const [articles, setArticles] = useState(null)

    useEffect(() => {

        const options = {
            method: 'GET',
            url: 'https://crypto-news-live.p.rapidapi.com/news/coindesk',
            headers: {
                'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }
        };

        axios.request(options).then((response) => {
            setArticles(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    console.log(articles)

    const firstSevenArticles = articles?.slice(0, 7)

    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            {firstSevenArticles?.map((article, _index) => (<div key={_index}><a href={article.url}><p>{article.title}</p></a></div>))}
        </div>
    )
}

export default NewsFeed