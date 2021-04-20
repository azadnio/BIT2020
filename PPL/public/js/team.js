function loadTeams() {

    $('#teams-wrap').empty();

    //TO DO LOAD TEAMS PLAYERS FROM PLAYERS LIST

    $.each(TEAMS, function (i, team) {

        let playersTotalPoints = team.palyers.reduce((c, a) => {
            let val = a.bidPrice;
            if (!val || !isNaN(val))
                val = 0;
            return c + val;
        }, 0);

        let nextPlayersMinReqValues = (REQ_NO_OF_PLAYERS - team.palyers.length) * MIN_BID_VALUE;
        let balacePoints = team.totalPoints - playersTotalPoints;

        //team tab
        let $team = $(`<div class="teams-wrap">
            <div><img src="${team.img}" alt=""></div>
            <div class="team-name">${team.name}</div>
            <div>Captain : ${team.captain}</div>
            <table>
                <tr> <td>Total points</td> <td>${team.totalPoints}</td> </tr>
                <tr> <td>No of Players</td> <td>${team.palyers.length} of ${REQ_NO_OF_PLAYERS}</td> </tr>
                <tr> <td>Balance points</td> <td>${balacePoints}</td> </tr>
                <tr> <td>Nxt plyr's max bid</td> <td>${balacePoints - nextPlayersMinReqValues}</td> </tr>
            </table>              
        </div>`).appendTo('#teams-wrap');

        let table = $(`<table>
                <tr>
                    <th></th>
                    <th>Players</th>
                    <th>Points</th>
                </tr>                    
            </table>`).appendTo($team);


        $.each(team.palyers, function (i, player) {

            var $tr = $('<tr>').append(
                $('<td>').text(i + 1),
                $('<td>').text(player.name),
                $('<td>').text(player.bidPrice)
            ).appendTo(table);
        });

        //auction team
        let $team2 = $(`<div class="teams-wrap">
            <div class="team-name">${team.name}</div>
            <div>Captain : ${team.captain}</div>
            <table>
                <tr> <td>Total points</td> <td>${team.totalPoints}</td> </tr>
                <tr> <td>No of Players</td> <td>${team.palyers.length} of ${REQ_NO_OF_PLAYERS}</td> </tr>
                <tr> <td>Balance points</td> <td>${balacePoints}</td> </tr>
                <tr> <td>Nxt plyr's max bid</td> <td>${balacePoints - nextPlayersMinReqValues}</td> </tr>
            </table>               
        </div>`).appendTo('#auction-teams-wrap');

        let table2 = $(`<table>
                <tr>
                    <th></th>
                    <th>Players</th>
                    <th>Points</th>
                </tr>                    
            </table>`).appendTo($team2);


        $.each(team.palyers, function (i, player) {

            var $tr = $('<tr>').append(
                $('<td>').text(i + 1),
                $('<td>').text(player.name),
                $('<td>').text(player.bidPrice)
            ).appendTo(table2);
        });
    });
}


$(function () {

    // $("#team-photo").on("change", function (e) {

    //     let input = this;
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();

    //         reader.onload = function (e) {
    //             $('#team-photo-img').attr('src', e.target.result);
    //         }

    //         reader.readAsDataURL(input.files[0]);
    //     }
    // });

    // $('#team-photo-choose').click(function () { $('#team-photo').trigger('click'); });

    // $("#team-form").submit(function () {

    //     TEAMS.push(new Team($('#team-name').val(), $('#team-captain').val(), '', ''));
    //     loadTeams();
    //     $("#team-form")[0].reset();
    //     $('#team-photo-img').attr('src', '');
    //     $('#team-photo').val("");
    //     return false;
    // });
});