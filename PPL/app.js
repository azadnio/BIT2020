const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const path = require("path");
const fs = require('fs');
const { json } = require('express');

//Expect a JSON body
app.use(bodyParser.json({
    limit: '50mb'                   //Request size - 50MB
}));

const port = 3000;
const version = 1.0;

app.use('/',express.static('public'))

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

app.listen(port, () => {
    console.log(`PPL app listening at http://localhost:${port}`)
});
