import { useState } from "react";
import Container from "./components/Container";
import Banner from "./components/Banner";
import Header from "./components/Header";
import news from "./data/news.json";
import "./css/index.css";

function App() {
  const [selectedNews, setSelectedNews] = useState(news[0]);

  return (
    <Container>
      <div>
        <Banner
          imageUrl={selectedNews.image_url}
          date={selectedNews.created_at}
        />
        <div className="divider"></div>
        <Header news={selectedNews} />
        <div className="pagination-container">
          {news.slice(0, 10).map((news) => (
            <button
              key={news.id}
              className={`pagination ${
                selectedNews.id === news.id ? "selected" : ""
              }`}
              onClick={() => setSelectedNews(news)}
            >
              {news.id}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
