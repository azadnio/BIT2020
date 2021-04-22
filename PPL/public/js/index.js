var bidingPlayerIndex = 0;

function reInitData() {
    loadPlayers();
    loadTeams();
    setAuctionPlayer();
}

function initApp(biddingPalyers, teams) {


    ALL_PLAYERS = biddingPalyers;
    BIDDING_PLAYERS = biddingPalyers.filter(e => !e.team);
    TEAMS = teams;
    TEAMS_NAMES = TEAMS.map(e => e.name);

    $('#palyer-team').empty();
    $('#auction-palyer-team').empty();

    //initial empty
    $('<option>').attr('value', '').text('').appendTo('#palyer-team');
    $('<option>').attr('value', '').text('').appendTo('#auction-palyer-team');

    //load teams combo
    $.each(TEAMS_NAMES, function (i, team) {
        $('<option>').attr('value', team).text(team).appendTo('#palyer-team');
        $('<option>').attr('value', team).text(team).appendTo('#auction-palyer-team');
    });

    reInitData();
}

$(function () {


    $.get("/get", function (e) {

        initApp(e.biddingPalyers, e.teams);

    }).fail(function () {
        alert("error in initial loading");
    });

});