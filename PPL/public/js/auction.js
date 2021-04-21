function loadNextPlayers() {

    let noOfNextPlayers = 8;
    $('#next-players').empty();
    let nextpalyerStart = bidingPlayerIndex + 1;
    let indexes = [bidingPlayerIndex];
    for(let i = 0; i < noOfNextPlayers; i++) {

        if (nextpalyerStart >= BIDDING_PLAYERS.length)
            nextpalyerStart = 0;
        
        if (!indexes.includes(nextpalyerStart) && BIDDING_PLAYERS[nextpalyerStart]) {
            indexes.push(nextpalyerStart);
            let palyer = BIDDING_PLAYERS[nextpalyerStart];
            $(`<div class="next-palyer">
                <span class="next-palyer-name">${palyer.name}</span>
                <img src="./images/${palyer.img}" onerror="this.src='./images/photo.jpg'">
                <span class="next-palyer-role">${palyer.role}</span>
            </div>`).appendTo($('#next-players'));
        }

        nextpalyerStart++;
    }
}

function setAuctionPlayer() {

    $('#bid-player-index').text(`${bidingPlayerIndex + 1} of ${BIDDING_PLAYERS.length}`);
    $('#auction-player-name').text(BIDDING_PLAYERS[bidingPlayerIndex].name);
    $('#auction-player-role').text(BIDDING_PLAYERS[bidingPlayerIndex].role);

    loadNextPlayers();
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