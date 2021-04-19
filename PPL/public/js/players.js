
function loadPlayers() {

    $('#palyers-table tbody').empty();
    //load payers
    $.each(BIDDING_PLAYERS, function (i, player) {
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

        BIDDING_PLAYERS.push(new Player($('#Name').val(), $('#role').val(), ''));
        loadPlayers();
        $("#palyer-form")[0].reset();
        $('#player-photo-img').attr('src', '');
        $('#player-photo').val("");
        return false;
    });

});