import Data from './files/team.csv';
import { week } from './table';

// Initialise the list of all the NHL teams
export var teamsList = [];
export var playersCount = 0;

// NHL team object
const Team = (team, count, properName) => {
  return { team, count, properName};
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
        img = 'TBL_dark.svg';
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

  // Count number of players left in the pool
  const incrementPlayersCount = (week) => {
    playersCount++;
  }
  
  // Initialise NHL teams list
  const initialiseTeamsList = () => {
    for (let i in Data) {
      teamsList.push(Team(Data[i][0], parseInt(Data[i][1]), Team(Data[i][2])));
    }
  }
  
  // Increment the count for each team passed as parameter
  const incrementCount = (team) => {
    let teamObject = teamsList.find(obj => obj.team === team);
    if (teamObject) {
        teamObject.count++;
    }
  };

  const getMostCommmonTeams = () => {
    const sortedTeams = [...teamsList];

    // Sort the teams in descending order based on count
    sortedTeams.sort((a, b) => b.count - a.count);

    // Take the top 3 teams
    const top3Teams = sortedTeams.slice(0, 3);

    return top3Teams.map(team => ({ team: team.team, count: team.count }));
  }

  return {
    getLogo,
    incrementPlayersCount,
    initialiseTeamsList,
    incrementCount,
    getMostCommmonTeams
  };
})();