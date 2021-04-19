


class Team {

    palyers = [];
    totalPoints = 100000;

    constructor(name, captain, sponsor, img){
        this.name = name;
        this.captain = captain;
        this.sponsor = sponsor;
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

var BIDDING_PLAYERS = [];

var TEAMS    = [];

var TEAMS_NAMES = [];