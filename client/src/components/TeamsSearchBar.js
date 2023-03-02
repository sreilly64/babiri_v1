import React from "react";
import scraper from "../apis/scraper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class TeamsSearchBar extends React.Component {
  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  defaultFormat = "gen9vgc2023series2";
  state = { format: this.defaultFormat, pokemon: "", date: ""};
  availableFormats = []
  supportedFormatsMapping = [
    {value: "gen9vgc2023regulationc", text: "VGC 2023 Regulation C" },
    {value: "gen9paldeaprologue", text: "VGC 2023 Paldea Prologue" },
    {value: "gen9vgc2023series2", text: "VGC 2023 Series 2" },
    {value: "gen9vgc2023series1", text: "VGC 2023 Series 1" },
    {value: "gen9doubleslc", text: "Gen 9 Doubles LC" },
    {value: "gen9doublesuu", text: "Gen 9 Doubles UU" },
    {value: "gen9doublesou", text: "Gen 9 Doubles OU" },
    {value: "gen9doublesubers", text: "Gen 9 Doubles Ubers" },
    {value: "gen9lc", text: "Gen 9 Singles LC" },
    {value: "gen9uu", text: "Gen 9 Singles UU" },
    {value: "gen9ou", text: "Gen 9 Singles OU" },
    {value: "gen9ubers", text: "Gen 9 Singles Ubers" }
  ];

  getAvailableFormats = async () => {
    const res = await scraper.get("/teams/formats");
    console.debug("Formats api response: " + JSON.stringify(res))
    console.debug("Formats api res.data: " + JSON.stringify(res.data))
    return res.data;
  }

  componentDidMount() {
    this.getAvailableFormats().then((data) => {
      this.availableFormats = data;
    })
    var url = window.location.href;
    var params = url.substring(url.indexOf("?"));
    var urlParams = new URLSearchParams(params);
    var pokemonName = urlParams.get("pokemon");
    pokemonName = pokemonName ? pokemonName : "";
    var date = urlParams.get("date");
    date = date ? date : "";
    var format = urlParams.get("format");
    format = format ? format : this.defaultFormat;
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
            <label>
              <i>Select Format</i>
              <select 
                name="format" 
                className="form-control mt-1" 
                value={this.state.format}
                onChange={this.onInputChange}>
                {this.supportedFormatsMapping.map(item => {
                  if (this.availableFormats.includes(item.value)) {
                    return (<option key={item.value} value={item.value}>{item.text}</option>)
                  }
                })}
              </select>
            </label> 
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
