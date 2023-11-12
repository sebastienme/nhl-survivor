import Data from './files/Pool_Survivor_2023-2024.csv'

function component() {
  
    for (let i in Data) {
      const element = document.createElement('div');
      element.innerHTML = `${Data[i][0]}`
      document.body.appendChild(element);
    }
  }
    
  component();