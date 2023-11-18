import Data from './files/Pool_Survivor_2023-2024.csv';
import { editDom } from './dom';

export const dataMethods = (() => {
  //--Get data from csv file
  const getPickData = () => {

    for (let i in Data) {
      let name = Data[i][0];
      let week1 = Data[i][1];

      if (week1.includes("Boston")) {
        editDom.addLines(name, week1, "/src/images/boston-bruins-logo.png");
      } else if (week1.includes("Los Angeles")) {
        editDom.addLines(name, week1, "/src/images/los-angeles-kings-logo.png");
      } else {
        editDom.addLines(name, week1)
      }
    }
  }

  return {
    getPickData
  };
})();