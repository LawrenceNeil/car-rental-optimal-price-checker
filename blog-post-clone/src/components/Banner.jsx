import PropTypes from "prop-types";
import ImageComponent from "./ImageComponent";
import ReplyOutlined from "@mui/icons-material/ReplyOutlined";
import { DateTime } from "luxon";

function Banner({ imageUrl, date }) {
  const selectedDate = DateTime.fromFormat(date, "yyyy-MM-dd HH:mm:ss");
  console.log(selectedDate);
  return (
    <div className="banner">
      <div className="image-wrapper">
        <ImageComponent
          filename={imageUrl}
          width="100%"
          className="banner-image"
        />
        <div className="date-container">
          <div className="day">{selectedDate.toFormat("dd")}</div>
          <div className="month">{selectedDate.toFormat("LLL")}</div>
        </div>
      </div>
      <a href="#" className="share-container">
        <ReplyOutlined />
        <span className="share">Share</span>
      </a>
    </div>
  );
}

Banner.propTypes = {
  imageUrl: PropTypes.string,
  date: PropTypes.string,
};

export default Banner;
