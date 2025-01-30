import PropTypes from "prop-types";
import { useMemo } from "react";
import authors from "../data/authors.json";

function Author({ id }) {
  const author = useMemo(() => {
    return authors.find(({ id: authorId }) => authorId === id);
  }, [id]);

  if (!author) {
    return <h3 className="author">Author Not Found</h3>;
  }

  return <h3 className="author">{author.name}</h3>;
}

Author.propTypes = {
  id: PropTypes.number,
};

export default Author;
