function setAuctionPlayer() {

    $('#auction-player-name').text(BIDDING_PLAYERS[bidingPlayerIndex].name);
    $('#auction-player-role').text(BIDDING_PLAYERS[bidingPlayerIndex].role);
}

$(function () {

    let tim = -1;
    $('.prev-player').click(function () {

        $('#myCarousel').carousel('prev');
        clearTimeout(tim);

        tim = setTimeout(function () {
            bidingPlayerIndex--;
            if (bidingPlayerIndex < 0)
                bidingPlayerIndex = BIDDING_PLAYERS.length - 1;

            setAuctionPlayer();
        }, 200);
    });

    $('.next-player').click(function () {

        $('#myCarousel').carousel('next');
        clearTimeout(tim);

        tim = setTimeout(function () {
            bidingPlayerIndex++;
            if (bidingPlayerIndex >= BIDDING_PLAYERS.length)
                bidingPlayerIndex = 0;

            setAuctionPlayer();
        }, 200);
    });


    $("#auction-form").submit(function () {

        $("#auction-form")[0].reset();
        return false;
    });
});