import React from "react";
import FormatSelector from "./FormatSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class UsageSearchBar extends React.Component {
  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  state = { format: "", pokemon: "" };

  componentDidMount() {
    var url = window.location.href;
    var params = url.substring(url.indexOf("?"));
    var urlParams = new URLSearchParams(params);

    var pokemonName = urlParams.get("pokemon");
    pokemonName = pokemonName ? pokemonName : "";
    
    var format = urlParams.get("format");
    format = format ? format : this.formatSelector.defaultFormat;
    
    this.setState({
      format: format,
      pokemon: pokemonName
    });
  }

  onInputChange = event => {
    const value = event.target.value;
    const eventName = event.target.name;
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
    this.props.onFormSubmit(this.state.format, this.state.pokemon);
  };

  clearInputs = () => {
    this.setState({
      pokemon: ""
    });
  };

  render() {
    return (
      <div className="md-form mb-3 mt-0">
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

export default UsageSearchBar;
