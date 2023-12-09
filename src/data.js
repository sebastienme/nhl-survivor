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
  const getTeam = (team) => {
    let teamAssets = { teamName: '', img: '' };
    let img;
    let title;
    switch (true) {
      case team.includes('anah'):
          title = 'Anaheim Ducks';
          img = 'ducks-logo.png';
        break;
      case team.includes('coyote'):
        title = 'Arizona Coyotes';
        img = 'arizona-logo.png';
        break;
      case team.includes('boston'):
        title = 'Boston Bruins';
        img = 'boston-bruins-logo.png';
        break;
      case team.includes('buffalo'):
        title = 'Buffalo Sabres';
        img = 'buffalo-logo.png';
        break;
      case team.includes('calgary'):
        title = 'Calgary Flames';
        img = 'calgary-logo.png';
        break;
      case team.includes('carolin'):
        title = 'Carolina Hurricanes';
        img = 'carolina-logo.png';
        break;
      case team.includes('chicago'):
        title = 'Chicago Blackhawks';
        img = 'chicago-blackhawks-logo.png';
        break;
      case team.includes('avala'):
        title = 'Colorado Avalanche';
        img = 'colorado-logo.png';
        break;
      case team.includes('columbus'):
        title = 'Columbus Blue Jackets';
        img = 'columbus-logo.png';
        break;
      case team.includes('dallas'):
        title = 'Dallas Stars';
        img = 'dallas-logo.png';
        break;
      case team.includes('detroit'):
        title = 'Detroit Red Wings';
        img = 'detroit-logo.png';
        break;
      case team.includes('edmonton'):
        title = 'Edmonton Oilers';
        img = 'edmonton-logo.png';
        break;
      case team.includes('florid'):
        title = 'Florida Panthers';
        img = 'florida-logo.png';
        break;
      case team.includes('kings'):
        title = 'Los Angeles Kings';
        img = 'los-angeles-kings-logo.png';
        break;
      case team.includes('wild'):
        title = 'Minnesota Wild';
        img = 'minnesota-logo.png';
        break;
      case team.includes('montr'):
        title = 'Montreal Canadiens';
        img = 'montreal-logo.png';
        break;
      case team.includes('nash'):
        title = 'Nashville Predators';
        img = 'nashville-logo.png';
        break;
      case team.includes('jersey'):
        title = 'New Jersey Devils';
        img = 'new-jersey-logo.png';
        break;
      case team.includes('isla'):
        title = 'New York Islanders';
        img = 'new-york-islanders-logo.png';
        break;
      case team.includes('ranger'):
        title = 'New York Rangers';
        img = 'new-york-rangers-logo.png';
        break;
      case team.includes('ottawa'):
        title = 'Ottawa Senators';
        img = 'ottawa-logo.png';
        break;
      case team.includes('phila'):
        title = 'Philadelphia Flyers';
        img = 'philadelphia-logo.png';
        break;
      case team.includes('pitt'):
        title = 'Pittsburgh Penguins';
        img = 'pittsburgh-penguins-logo.png';
        break;
      case team.includes('shark'):
        title = 'San Jose Sharks';
        img = 'san-jose-logo.png';
        break;
      case team.includes('krak'):
        title = 'Seattle Kraken';
        img = 'kraken-logo.png';
        break;
      case team.includes('louis'):
        title = 'St-Louis Blues';
        img = 'st-louis-logo.png';
        break;
      case team.includes('tampa'):
        title = 'Tampa Bay Lightning';
        img = 'TBL_dark.svg';
        break;
      case team.includes('toronto'):
        title = 'Toronto Maple Leafs';
        img = 'toronto-logo.png';
        break;
      case team.includes('vancouv'):
        title = 'Vancouver Canucks';
        img = 'vancouver-logo.png';
        break;
      case team.includes('vegas'):
        title = 'Vegas Golden Knights';
        img = 'vegas-logo.png';
        break;
      case team.includes('wash'):
        title = 'Washington Capitals';
        img = 'washington-capitals-logo.png';
        break;
      case team.includes('jets'):
        title = 'Winnipeg Jets';
        img = 'winnipeg-logo.png';
        break;
      default:
    }
    teamAssets.teamName = title;
    teamAssets.img = img;

    return teamAssets;
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
    getTeam,
    incrementPlayersCount,
    initialiseTeamsList,
    incrementCount,
    getMostCommmonTeams
  };
})();