import Data from './files/team.csv';

// Initialise the list of all the NHL teams
export var teamsList = [];

// NHL team object
const Team = (team, count) => {
  return { team, count};
};


export const dataMethods = (() => {
  // Get logo png image
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
  
  // Initialise NHL teams list
  const initialiseTeamsList = () => {
    for (let i in Data) {
      teamsList.push(Team(Data[i][0], parseInt(Data[i][1])));
    }
  }
  
  // Increment the count for each team passed as parameter
  const incrementCount = (team) => {
    let teamObject = teamsList.find(obj => obj.team === team);
    if (teamObject) {
        teamObject.count++;
    }
  };

  const getMostCommmonTeam = () => {
    let maxTeam = { team: "", count: 0 };

    for (let i = 0; i < teamsList.length; i++) {
      let teamObject = teamsList[i];
      if (teamObject.count > maxTeam.count) {
          maxTeam = teamObject;
      }
    }
    return maxTeam.team;   
  }

  return {
    getLogo,
    initialiseTeamsList,
    incrementCount,
    getMostCommmonTeam
  };
})();