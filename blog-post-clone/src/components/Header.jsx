import PropTypes from "prop-types";
import Author from "./Author";

function Header({ news }) {
  return (
    <div className="flex-col">
      <Author id={news.author_id} />
      <span className="title">{news.title}</span>
      <span className="body">{news.body}</span>
      <a href="#" className="article">
        Read Article
      </a>
    </div>
  );
}

Header.propTypes = {
  news: PropTypes.object,
};

export default Header;
