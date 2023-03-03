import React from "react";
import scraper from "../apis/scraper";

class FormatSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { format: this.defaultFormat };
  defaultFormat = "gen9vgc2023series2";
  availableFormats = []
  supportedFormatsMapping = [
    {value: "gen9vgc2023regulationc", text: "VGC 2023 Regulation C" },
    {value: "gen9paldeaprologue", text: "Paldea Prologue" },
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
    var format = urlParams.get("format") ? urlParams.get("format") : this.defaultFormat;
    this.setState({
      format: format
    });
  }

  onInputChange = event => {
    const value = event.target.value;
    const eventName = event.target.name;
    event.persist()
    this.setState({
      ...this.state,
      [eventName]: value
    });
    this.props.onInputChange(event)
  };


  render() {
    return (
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
    );
  }
}

export default FormatSelector;
