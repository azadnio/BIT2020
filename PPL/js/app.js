$(function(){

    $("#tabs").tabs();

    function initApp(){

        //load teams

        //load payers
        $.each(palyers, function (i, player) {
            var $tr = $('<tr>').append(
                $('<td>').text(player.name),
                $('<td>').text(player.role),
                $('<td>').text(player.team)
            ).appendTo('#palyers-table');

        });

        //setup auction view
    }

    

    initApp();
});