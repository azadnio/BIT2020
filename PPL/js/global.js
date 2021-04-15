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

    constructor(name, captain, sponsor){
        this.name = name;
        this.captain = captain;
        this.sponsor = sponsor;
    }
}

class Player {

    constructor(name, role, team, img, basePrice = 1000) {
        this.name = name;
        this.role = role;
        this.team = team;
        this.img = img;
        this.basePrice = basePrice;
    }
}

let palyers = [new Player('aasfsf', 'batting', 'sdf'), new Player('aasfsf', 'batting', 'sdf'), new Player('aasfsf', 'batting', 'sdf'), new Player('aasfsf', 'batting', 'sdf')]