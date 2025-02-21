import React from "react";
import FormatSelector from "./FormatSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class TeamsSearchBar extends React.Component {
  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  state = { format: "", pokemon: "", date: ""};

  componentDidMount() {
    var url = window.location.href;
    var params = url.substring(url.indexOf("?"));
    var urlParams = new URLSearchParams(params);

    var pokemonName = urlParams.get("pokemon");
    pokemonName = pokemonName ? pokemonName : "";

    var date = urlParams.get("date");
    date = date ? date : "";
    
    var format = urlParams.get("format");
    format = format ? format : this.formatSelector.defaultFormat;
    
    this.setState({
      format: format,
      pokemon: pokemonName,
      date: date
    });
  }

  onInputChange = event => {
    const value = event.target.value;
    const eventName = event.target.name;
    event.persist()
    this.setState({
      ...this.state,
      [eventName]: value
    }, () => {
      if (eventName === "format") {
        this.onFormSubmit(event)
      }
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.format, this.state.pokemon, this.state.date);
  };

  clearInputs = () => {
    this.setState({
      pokemon: "",
      date: ""
    });
  };

  render() {
    return (
      <div className="md-form active-pink active-pink-2 mb-3 mt-0">
        <form onSubmit={this.onFormSubmit}>
          <div className="field">
            <FormatSelector 
              ref={(formatSelector) => {this.formatSelector = formatSelector;}}
              onInputChange={this.onInputChange}
              />
            <br />
            <label>
              <i>
                By Pokémon (
                <a
                  href="https://dex.pokemonshowdown.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pokédex
                </a>
                )
              </i>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Ex. Pikachu"
                aria-label="Search"
                name="pokemon"
                value={this.state.pokemon}
                onChange={this.onInputChange}
              ></input>
            </label>
            <label className="ml-2">
              <i>By Date (YYYY-MM-DD)</i>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Ex. 2020-03-04"
                aria-label="Search"
                name="date"
                value={this.state.date}
                onChange={this.onInputChange}
              ></input>
            </label>
          </div>
          <div>
            <button
              className="btn btn-rounded btn-primary btn-sm"
              type="submit"
            >
              Search <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              className="btn btn-rounded btn-secondary btn-sm ml-2"
              onClick={this.clearInputs}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TeamsSearchBar;
