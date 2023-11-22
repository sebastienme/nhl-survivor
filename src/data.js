import { editDom } from './dom';

export const dataMethods = (() => {
  //Get logo png image
  const getLogo = (team) => {
    let img;
    switch (true) {
      case team.includes('anaheim'):
        img = 'ducks-logo.png';
        break;
      case team.includes('arizona'):
        img = 'arizona-logo.png';
        break;
      case team.includes('boston'):
        img = 'boston-bruins-logo.png';
        break;
      case team.includes('buffalo'):
        img = 'buffalo-logo.png';
        break;
      case team.includes('calgary'):
        img = 'calgary-logo.png';
        break;
      case team.includes('carolin'):
        img = 'carolina-logo.png';
        break;
      case team.includes('chicago'):
        img = 'chicago-blackhawks-logo.png';
        break;
      case team.includes('colorado'):
        img = 'colorado-logo.png';
        break;
      case team.includes('columbus'):
        img = 'columbus-logo.png';
        break;
      case team.includes('dallas'):
        img = 'dallas-logo.png';
        break;
      case team.includes('detroit'):
        img = 'detroit-logo.png';
        break;
      case team.includes('edmonton'):
        img = 'edmonton-logo.png';
        break;
      case team.includes('florid'):
        img = 'florida-logo.png';
        break;
      case team.includes('los angeles'):
        img = 'los-angeles-kings-logo.png';
        break;
      case team.includes('minnes'):
        img = 'minnesota-logo.png';
        break;
      case team.includes('montr'):
        img = 'montreal-logo.png';
        break;
      case team.includes('nash'):
        img = 'nashville-logo.png';
        break;
      case team.includes('jersey'):
        img = 'new-jersey-logo.png';
        break;
      case team.includes('islanders'):
        img = 'new-york-islanders-logo.png';
        break;
      case team.includes('rangers'):
        img = 'new-york-rangers-logo.png';
        break;
      case team.includes('ottawa'):
        img = 'ottawa-logo.png';
        break;
      case team.includes('phila'):
        img = 'philadelphia-logo.png';
        break;
      case team.includes('pitts'):
        img = 'pittsburgh-penguins-logo.png';
        break;
      case team.includes('san jose'):
        img = 'san-jose-logo.png';
        break;
      case team.includes('seat'):
        img = 'kraken-logo.png';
        break;
      case team.includes('louis'):
        img = 'st-louis-logo.png';
        break;
      case team.includes('tampa'):
        img = 'tampa-bay-logo.png';
        break;
      case team.includes('toronto'):
        img = 'toronto-logo.png';
        break;
      case team.includes('vancouv'):
        img = 'vancouver-logo.png';
        break;
      case team.includes('vegas'):
        img = 'vegas-logo.png';
        break;
      case team.includes('wash'):
        img = 'washington-capitals-logo.png';
        break;
      case team.includes('winnipeg'):
        img = 'winnipeg-logo.png';
        break;
      default:
    }

    return img;
  };

  // Private object to store counts for each team
  const counterObj = {};


  const incrementCount = (team) => {
    counterObj[team] = (counterObj[team] || 0) + 1;
  };

  const getMostCommonTeam = () => {
    console.log(counterObj)
    // Find the string with the maximum count
    const mostCommonTeam = Object.keys(counterObj).reduce((a, b) => counterObj[a] > counterObj[b] ? a : b, '');
  
    
    return mostCommonTeam;
  }


  return {
    getLogo,
    incrementCount,
    getMostCommonTeam
  };
})();