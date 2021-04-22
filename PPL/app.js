const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const path = require("path");
const fs = require('fs');
const { json } = require('express');
const e = require('express');

//Expect a JSON body
app.use(bodyParser.json({
    limit: '50mb'                   //Request size - 50MB
}));

const port = 3000;
const version = 1.0;



app.use('/', express.static('public'))

app.get('/ver', (req, res) => {
    res.send({ version });
});

app.get('/get', (req, res) => {

    try {

        let biddingPalyers = fs.readFileSync('./DB/players.json', 'utf8');
        let teams = fs.readFileSync('./DB/teams.json', 'utf8');

        res.json({ biddingPalyers: JSON.parse(biddingPalyers), teams: JSON.parse(teams) });

    } catch (err) {
        res.status(400).send(false);
    }
});

app.get('/delete/:idx', (req, res) => {

    try {

        let biddingPalyers = fs.readFileSync('./DB/players.json', 'utf8');
        let teams = fs.readFileSync('./DB/teams.json', 'utf8');

        biddingPalyers = JSON.parse(biddingPalyers);
        teams = JSON.parse(teams);

        let idx = +req.params.idx;
        
        let player = biddingPalyers[idx];
        if (player) {

            if (player.team){

                let team = teams.find(e => e.name == player.team);
                if (team) {
                    let teamPlayerIndex = team.palyers.findIndex(e => e.name == player.name);
                    if (teamPlayerIndex > -1) {
                        teams.palyers.splice(teamPlayerIndex, 1);                        
                        fs.writeFileSync('./DB/teams.json', JSON.stringify(teams, null, 2));
                    }
                }
            }

            biddingPalyers.splice(idx, 1);
            if (fs.existsSync('./public/photos/players/' + player.img))
                fs.unlinkSync('./public/photos/players/' + player.img);

            fs.writeFileSync('./DB/players.json', JSON.stringify(biddingPalyers, null, 2));
        }

        res.json({ biddingPalyers, teams });

    } catch (err) {
        res.status(400).send(false);
    }
})

app.post('/save', (req, res) => {

    try {

        if (req.body.teams)
            fs.writeFileSync('/Users/joe/test.txt', JSON.stringify(req.body.teams, null, 2));

        if (req.body.biddingPalyers)
            fs.writeFileSync('/Users/joe/test.txt', JSON.stringify(req.body.biddingPalyers, null, 2));

        res.send(true);
    }
    catch (e) {
        res.status(400).send(false);
    }
});

app.post('/saveplayer', (req, res) => {

    try {

        let biddingPalyers = fs.readFileSync('./DB/players.json', 'utf8');
        let teams = fs.readFileSync('./DB/teams.json', 'utf8');

        biddingPalyers = JSON.parse(biddingPalyers);

        let { name = '', role = '', team = '', img = '', imgName = '' } = req.body;

        let ext = '.jpg';
        if (imgName.indexOf('.') > -1) {
            imgName = imgName.split('.');
            ext = '.' + imgName[imgName.length - 1];
        }

        let imgSaveName = name.split(' ').join('_')  + ext;

        if (img){
            if (img.indexOf('photos/players') == -1)
                fs.writeFileSync('./public/photos/players/' + imgSaveName, img, 'base64');
            else {
                let d = img.split('/');
                imgSaveName = d[d.length - 1];
            }
        }            
        else
            imgSaveName = '';

        //push player
        let player = new Player(name, role, team, imgSaveName);

        //already exists
        let bidPlayers = biddingPalyers.map(e => e.name.replace(/ /g, '').toUpperCase());
        let found = bidPlayers.findIndex(e => e == name.replace(/ /g, '').toUpperCase());

        if (found > -1) 
            biddingPalyers[found] = player;        
        else 
            biddingPalyers.push(player);

        fs.writeFileSync('./DB/players.json', JSON.stringify(biddingPalyers, null, 2));

        res.json({ biddingPalyers: biddingPalyers, teams: JSON.parse(teams) });

    }
    catch (e) {
        res.status(400).send(false);
    }
});

app.post('/saveteam', (req, res) => {

    try {

        if (req.body.teams)
            fs.writeFileSync('/Users/joe/test.txt', JSON.stringify(req.body.teams, null, 2));

        if (req.body.biddingPalyers)
            fs.writeFileSync('/Users/joe/test.txt', JSON.stringify(req.body.biddingPalyers, null, 2));

        res.send(true);
    }
    catch (e) {
        res.status(400).send(false);
    }
});

app.listen(port, () => {
    console.log(`PPL app listening at http://localhost:${port}`)
});


class Team {

    palyers = [];
    totalPoints = 100000;

    constructor(name, captain, img) {
        this.name = name;
        this.captain = captain;
        this.img = img;
    }
}

class Player {

    bidPrice = 0;
    isCaptain = false;

    constructor(name, role, team, img) {
        this.name = name;
        this.role = role;
        this.team = team;
        this.img = img;
    }
}