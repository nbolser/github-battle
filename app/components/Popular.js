var React = require("react");
var PropTypes = require("prop-types");
var api = require("../utils/api");

function SelectLanguage(props) {
  var languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map(function(language) {
        return (
          <li
            style={
              language === props.selectedLanguage ? { color: "#d0021b" } : null
            }
            onClick={props.onSelect.bind(null, language)}
            key={language}
          >
            {language}
          </li>
        );
      }, this)}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(language) {
    this.setState(function() {
      return {
        selectedLanguage: language,
        repos: null
      };
    });

    api.fetchPopularRepos(language).then(
      function(repos) {
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {JSON.stringify(this.state.repos, null, 2)}
      </div>
    );
  }
}

module.exports = Popular;
