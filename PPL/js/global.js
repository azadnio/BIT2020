const TEAMS_NAMES = [
    'THENNA LIONS',
    'MALGAMANDENIYA ',
    'HEEPITIYA',
    'ALIYATENNA',
    'THAAPPA',
    'HENTHENNA',
    'J M KINGS',
    'PANGOLLAMADA'
];


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

let biddingPalyers = [new Player('palyer 1', 'batting', 'sdf'), new Player('palyer 2', 'bowling', 'sdf'), new Player('palyer 3', 'All rounder', 'sdf'), new Player('aasfsf', 'batting', 'sdf')];

let teams = TEAMS_NAMES.map(e => new Team(e, 'cpt' + e, '', './images/photo.jpg'));
teams.forEach(e => e.palyers = biddingPalyers);