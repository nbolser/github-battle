var React = require("react");
var PropTypes = require("prop-types");

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.text = props.text;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
};

module.exports = Loading;
