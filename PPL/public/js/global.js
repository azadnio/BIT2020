


class Team {

    palyers = [];
    totalPoints = 100000;

    constructor(name, captain, img){
        this.name = name;
        this.captain = captain;
        this.img = img;
    }
}

class Player {

    bidPrice = 0;

    constructor(name, role, team, img) {
        this.name = name;
        this.role = role;
        this.team = team;
        this.img = img;
    }
}

const REQ_NO_OF_PLAYERS = 12;
const MIN_BID_VALUE = 1000;

var BIDDING_PLAYERS = [];

var TEAMS    = [];

var TEAMS_NAMES = [];