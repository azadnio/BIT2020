var bidingPlayerIndex = 0;

$(function () {


    // init tabs

    function loadPlayers() {

        $('#palyers-table tbody').empty();
        //load payers
        $.each(biddingPalyers, function (i, player) {
            var $tr = $('<tr>').append(
                $('<td>').text(player.name),
                $('<td>').text(player.role),
                $('<td>').text(player.team)
            ).appendTo('#palyers-table tbody');

            //selected player from list
            $tr.click(e => {

                $('#Name').val(player.name);
                $('#role').val(player.role);
            })
        });
    }

    function loadTeams() {

        $('#teams-wrap').empty();

        //TO DO LOAD TEAMS PLAYERS FROM PLAYERS LIST

        $.each(teams, function (i, team) {

            //team tab
            let $team = $(`<div class="teams-wrap">
                <div><img src="${team.img}" alt=""></div>
                <div>${team.name}</div>
                <div>Captain : ${team.captain}</div>
                <div>Total points: </div>
                <div>Available bit points: </div>
                <div>Next player max bit points: </div>                
            </div>`).appendTo('#teams-wrap');

            let table = $(`<table>
                    <tr>
                        <th>Players</th>
                        <th>Points</th>
                    </tr>                    
                </table>`).appendTo($team);


            $.each(team.palyers, function (i, player) {

                var $tr = $('<tr>').append(
                    $('<td>').text(player.name),
                    $('<td>').text(player.bidPrice)
                ).appendTo(table);
            });

            //auction team
            let $team2 = $(`<div class="teams-wrap">
                <div>${team.name}</div>
                <div>Captain : ${team.captain}</div>
                <div>Total points: </div>
                <div>Available bit points: </div>
                <div>Next player max bit points: </div>                
            </div>`).appendTo('#auction-teams-wrap');

            let table2 = $(`<table>
                    <tr>
                        <th>Players</th>
                        <th>Points</th>
                    </tr>                    
                </table>`).appendTo($team2);


            $.each(team.palyers, function (i, player) {

                var $tr = $('<tr>').append(
                    $('<td>').text(player.name),
                    $('<td>').text(player.bidPrice)
                ).appendTo(table2);
            });
        });
    }

    function setAuctionPlayer() {

        $('#auction-player-name').text(biddingPalyers[bidingPlayerIndex].name);
        $('#auction-player-role').text(biddingPalyers[bidingPlayerIndex].role);
    }

    function initApp() {

        //load teams
        $.each(TEAMS_NAMES, function (i, team) {
            $('<option>').attr('value', team).text(team).appendTo('#palyer-team');
            $('<option>').attr('value', team).text(team).appendTo('#auction-palyer-team');
        });

        loadPlayers();
        loadTeams();
        setAuctionPlayer();
        //setup auction view
    }

    //-------------save player info
    $("#player-photo").on("change", function (e) {

        let input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#player-photo-img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    });

    $('#player-photo-choose').click(function () { $('#player-photo').trigger('click'); });

    $("#palyer-form").submit(function () {

        biddingPalyers.push(new Player($('#Name').val(), $('#role').val(), ''));
        loadPlayers();
        $("#palyer-form")[0].reset();
        $('#player-photo-img').attr('src', '');
        $('#player-photo').val("");
        return false;
    });

    // -----------------save team info ---------
    $("#team-photo").on("change", function (e) {

        let input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#team-photo-img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    });

    $('#team-photo-choose').click(function () { $('#team-photo').trigger('click'); });

    $("#team-form").submit(function () {

        teams.push(new Team($('#team-name').val(), $('#team-captain').val(), '', ''));
        loadTeams();
        $("#team-form")[0].reset();
        $('#team-photo-img').attr('src', '');
        $('#team-photo').val("");
        return false;
    });

    $("#auction-form").submit(function () {

        $("#auction-form")[0].reset();
        return false;
    });


    //-------------save player info


    // ---------------auction ---------
    let tim = -1;
    $('.prev-player').click(function(){
        
        $('#myCarousel').carousel('prev');
        clearTimeout(tim);

        tim = setTimeout(function(){
            bidingPlayerIndex--;
            if (bidingPlayerIndex < 0)
                bidingPlayerIndex = biddingPalyers.length - 1;

            setAuctionPlayer();
        }, 200);
    });

    $('.next-player').click(function () {
        
        $('#myCarousel').carousel('next');
        clearTimeout(tim);

        tim = setTimeout(function () {
            bidingPlayerIndex++;
            if (bidingPlayerIndex >= biddingPalyers.length)
                bidingPlayerIndex = 0;

            setAuctionPlayer();
        }, 200);
    });

    initApp();
});