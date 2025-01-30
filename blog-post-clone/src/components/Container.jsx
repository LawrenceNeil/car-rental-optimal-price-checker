import PropTypes from "prop-types";

function Container({ children }) {
  return <div className="container">{children}</div>;
}

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
export default Container;
