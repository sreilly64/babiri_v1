import React from "react";
import scraper from "../../apis/scraper";

import TeamsSearchBar from "../TeamsSearchBar";
import UserList from "../UserList";
import UsageList from "../UsageList";

import LoadingSpinner from "../layout/LoadingSpinner";

// Functions to generate Chart colours
function getRandomColor() {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function generateColourArray() {
  var colors = [];
  while (colors.length < 100) {
    do {
      var color = getRandomColor();
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }
  return colors;
}

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      format: "",
      users: [],
      usage: [],
      chart: {},
      loading: false
    };
  }

  componentDidMount() {
    var url = window.location.href;
    var params = url.substring(url.indexOf("?"));
    var urlParams = new URLSearchParams(params);

    var pokemonName = urlParams.get("pokemon");
    pokemonName = pokemonName ? pokemonName : "";

    var date = urlParams.get("date");
    date = date ? date : "";

    var format = urlParams.get("format");
    format = format ? format : this.teamsSearchBar.formatSelector.defaultFormat;

    this.onTermSubmit(format, pokemonName, date);
  }

  onTermSubmit = async (format, pokemon, date) => {
    var setParams = { format: format };
    var chartData = {};
    var formatedMonName = pokemon.replace(" ", "")

    // Mon Parameter, No Date
    if (pokemon && !date) {
      setParams = {
        format: format,
        pokemon: formatedMonName
      };
    }

    // No Mon, Date Parameter
    if (!pokemon && date) {
      setParams = {
        format: format,
        date: date
      };
    }

    // Mon Parameter, Date Parameter
    if (pokemon && date) {
      setParams = {
        format: format,
        pokemon: formatedMonName,
        date: date
      };
    }

    this.setState({ loading: true });
    console.debug("Params for /teams: " + JSON.stringify(setParams))
    const res = await scraper.get("/teams", {
      params: setParams
    });
    this.setState({ loading: false });

    if (typeof res.data.usage !== "undefined") {
      const filteredMons = res.data.usage.filter(mon => mon.percent >= 10);

      chartData = {
        labels: filteredMons.map(usageMon => {
          return usageMon.mon;
        }),
        datasets: [
          {
            label: "Usage Stats",
            data: filteredMons.map(usageMon => {
              return usageMon.percent;
            }),
            backgroundColor: generateColourArray(),
            borderWidth: 1
          }
        ]
      };
    }

    this.setState({
      date: res.data.date,
      format: res.data.format,
      users: res.data.users,
      usage: res.data.usage,
      chartData: chartData
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <div className="container">
        <p>
          <i>
            Recording the 100 most successful public Showdown teams for VGC 2023 and other formats from each day. <br />
            Find teams by a specific Pokémon or from a specific date. <br />
          </i>
        </p>
        <TeamsSearchBar 
          ref={(teamsSearchBar) => {this.teamsSearchBar = teamsSearchBar;}}
          onFormSubmit={this.onTermSubmit} />
        <br />
        {loading ? (
          <LoadingSpinner
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        ) : (
          <div className="row">
            <div className="col-7">
              <h5>
                <b>
                  Teams from{" "}
                  {this.state.date
                    ? this.state.date.substring(0, 10)
                    : "Invalid Entry"}{" "}
                </b>
                (
                <i>
                  {this.state.date ? this.state.users.length : "0"} Teams found
                </i>
                )
              </h5>
              <br />
              <UserList users={this.state.users} className="column" />
            </div>
            <div className="col-5">
              <h5 className="text-center ml-5">
                <b>
                  Usage Stats from{" "}
                  {this.state.date
                    ? this.state.date.substring(0, 10)
                    : "Invalid Entry"}
                </b>
              </h5>
              <br />
              <UsageList
                usage={this.state.usage}
                chartData={this.state.chartData}
                format={this.state.format}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Teams;
