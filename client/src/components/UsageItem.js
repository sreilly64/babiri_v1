import React from "react";

var paradoxPokemon = {
  greattusk: "Great Tusk",
  screamtail: "Scream Tail",
  brutebonnet: "Brute Bonnet",
  fluttermane: "Flutter Mane",
  slitherwing: "Slither Wing",
  sandyshocks: "Sandy Shocks",
  roaringmoon: "Roaring Moon",
  walkingwake: "Walking Wake",
  irontreads: "Iron Treads",
  ironbundle: "Iron Bundle",
  ironhands: "Iron Hands",
  ironjugulis: "Iron Jugulis",
  ironmoth: "Iron Moth",
  ironthorns: "Iron Thorns",
  ironvaliant: "Iron Valiant",
  ironleaves: "Iron Leaves"
}

const UsageItem = ({ usage, rank, format }) => {
  var name = usage.mon;
  if (Object.keys(paradoxPokemon).includes(name)){
    name = paradoxPokemon[name];
  } else {
    name = name.substring(0, 1).toUpperCase() + name.substring(1);
  }  

  var cap_name = name.replace(/(^|[\s-])\S/g, function(match) {
    return match.toUpperCase();
  });

  var underscore_name = cap_name.replace(" ", "_").replace("-", "_")

  var pikalyticsFormat = format;
  if (format == "gen9vgc2023regulationc") {
    pikalyticsFormat = "gen9vgc2023regc"
  }
  return (
    <div
      className="text-center"
      style={{ display: "inline-block", width: "16.5em" }}
    >
      <div className="card rounded mt-4 text-center">
        <div className="card-header">
          <h6
            style={{
              textAlign: "left",
              float: "left"
            }}
          >
            #{rank + 1}.{" "}
            <a
              href={`${window.location.href.includes("?") ? window.location.href.substring(0, window.location.href.indexOf("?")) : window.location.href }?pokemon=${cap_name}&format=${format}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              {cap_name}
            </a>
          </h6>

          <h6
            className="card-subtitle text-muted mt-1"
            style={{
              textAlign: "right",
              float: "right"
            }}
          >
            <i>Usage: {usage.percent}%</i>
          </h6>
        </div>
        <div
          className="card-body"
          style={{ display: "inline-block", height: "7.7em" }}
        >
          <img
            src={require(`../img/sprites/${usage.mon}.png`)}
            alt={usage.mon}
            key={usage.mon}
            style={{
              textAlign: "left",
              float: "left"
            }}
          />
          <p
            className="card-subtitle mt-2 mr-2"
            style={{
              textAlign: "right",
              float: "right"
            }}
          >
            <a
              href={`https://pikalytics.com/pokedex/${pikalyticsFormat}/${cap_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require(`../img/pikalytics.png`)}
                alt={usage.mon}
                key={usage.mon}
                style={{
                  textAlign: "left",
                  float: "left",
                  height: "1.3em"
                }}
                className="mr-1"
              />
              <i>Pikalytics</i>
            </a>
          </p>
          <p
            className="card-subtitle mt-2 mr-2"
            style={{
              textAlign: "right",
              float: "right"
            }}
          >
            <a
              href={`http://pucko.info/pokeStats/pokemon?format=${format}&pokemon=${underscore_name}&time=month`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require(`../img/pokeStatsIcon.ico`)}
                alt={usage.mon}
                key={usage.mon}
                style={{
                  textAlign: "left",
                  float: "left",
                  height: "1.3em"
                }}
                className="mr-1"
              />
              <i>PokeStats</i>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsageItem;
