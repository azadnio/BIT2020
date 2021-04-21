
function loadPlayers() {

    $('#palyers-table tbody').empty();
    //load payers
    $.each(BIDDING_PLAYERS, function (i, player) {

        let delButton = $('<button>Del</button>').click(function (e) {

            if (confirm(`Are you sure DELETE ${player.name}?`)) {

                $.get("/delete/" + i, function (e) {

                    initApp(e.biddingPalyers, e.teams);
                    resetPlayerForm();

                }).fail(function () {
                    alert("error in initial loading");
                });
            }
        });

        var $tr = $('<tr>').append(
            $('<td>').text(i + 1),
            $(`<td class="player-photo"> <img src="./photos/players/${player.img}"> </td>`),
            $('<td>').text(player.name),
            $('<td>').text(player.role),
            $('<td>').text(player.team),
            $('<td>').text(player.bidPrice),
            $('<td>').append(delButton)
        ).appendTo('#palyers-table tbody');

        //selected player from list
        $tr.click(e => {

            $('#Name').val(player.name);
            $('#role').val(player.role);
        })
    });
}

function addPlayer(name = '', role = '', team = '', img = '', imgName = '') {

    //check already exist by name

    let bidPlayers = BIDDING_PLAYERS.map(e => e.name.replace(/ /g, '').toUpperCase());
    let found = bidPlayers.includes(name.replace(/ /g, '').toUpperCase());

    if (!found) {
        teamPlayers = TEAMS.reduce((a, e) => {
            a = [...a, e.palyers.map(p => p.name.replace(/ /g, '').toUpperCase())]
            return a;
        }, []);
        found = teamPlayers.includes(name.replace(/ /g, '').toUpperCase());
    }

    if (found && !confirm(`${name} . already exists in the players list do you want replace?`))
        return;

    $.ajax({
        url: '/saveplayer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name, role, team, img, imgName })
    }).done(function (data) {

        initApp(data.biddingPalyers, data.teams);
        resetPlayerForm();

    }).fail(function (jqXHR, textStatus) {
        console.error('saving failed')
    });
}

function resetPlayerForm() {
    $("#palyer-form")[0].reset();
    $('#player-photo-img').attr('src', '');
    $('#player-photo').val("");
}

$(function () {



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

        var raw_image_data = $('#player-photo-img').attr('src').replace(/^data\:image\/\w+\;base64\,/, '');
        var imgName = $('#player-photo').val().split('\\').pop();

        addPlayer($('#Name').val(), $('#role').val(), '', raw_image_data, imgName);
        
        return false;
    });


});