var bidingPlayerIndex = 0;

$(function () {

    function initApp() {

        //load teams combo
        $.each(TEAMS_NAMES, function (i, team) {
            $('<option>').attr('value', team).text(team).appendTo('#palyer-team');
            $('<option>').attr('value', team).text(team).appendTo('#auction-palyer-team');
        });
        
        loadPlayers();
        loadTeams();
        setAuctionPlayer();
        //setup auction view
    }

    $.get("/get", function (e) {
       
        BIDDING_PLAYERS = e.biddingPalyers.filter(e => e.team);
        TEAMS = e.teams;
        TEAMS_NAMES = TEAMS.map(e => e.name);
        
        initApp();

    }).fail(function () {
        alert("error in initial loading");
    });

});