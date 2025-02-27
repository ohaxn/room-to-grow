import React, {useEffect, useState} from 'react';
import { Button } from '@material-ui/core';


const PlantList = props => {
  const [plantList, setPlantList] = useState(null);

  const { family } = props;
  const { gState } = props;
  const { setPlant } = props;
  // const { plantDetails } = props;
  const { setPlantDetails } = props;
  // const { plant } = props;
  // const { setPlant } = props;

  useEffect(
    () => {
      if (gState.name === null || family === null) return;
      // console.log('fetching plant list', gState.name);
      fetch(`/location/${gState.slug}/${family}`)
        .then(response => response.json())
        .then(data => {
          console.log('fetched list of plants:', data);
          // console.log(typeof data)
          //const list = data.plants.map((plant) => plant.common_name);
          setPlantList(data.plants); // an array of plants -> plant.scientific_name
          /*
            plant = { common_name : ...,
                      image_url: ...,
                      scientfic_name : ...
                    favorites: Integer}

          */
          setPlantDetails(null);
        })
        .catch((err) => console.log('oops', err))
    },
    [family]

    // FOR TESTING W/O BACKEND ONLY
    // () => setPlantList(['rose', 'grass', 'amarillys']),
    // [family]
  )
  
  if (family === null || plantList === null) return (<div></div>);

  else return (
    <div>
    <h2>Plant List in {family}:</h2>
    <ul id="plantList">
      {plantList.map((plant, index) => {
        return (
         
          <li key={index}>
            <img src={plant.image_url} width = "40px" height = "40px"></img>
            <button className = "plantlist-buttons" onClick={() => setPlant(plant)}>
              {plant.common_name + `(${plant.favorites})`}
            </button>
          </li>
        )
      })}
    </ul>
    </div>
  );
}

export default PlantList;
