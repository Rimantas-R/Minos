"use strict";
/** generuoja lauką HTML lange */
function renderBoard(length, height, standart, bombs) {
    var HTML = '';
    if (length > 0 && height > 0 && length * height > 1) {
        var count = length * height;
        for (var i = 0; i < count; i++) {
            HTML += '<div class="cell"></div>';
        }
        $('.board').css('width', length * 25 + 'px');
        myGame.letGame(count,length);
        myGame.bombsPlac(count,bombs);
        myGame.countBombsAround();
        //let observer = new Observer();
        myGame.observable.hookObserver(new Observer());
        return HTML;
    } else {
        $('.content').html(renderBoard(standart[0], standart[1], standart, standart[2]));
    }
    return;
};




/** vietoj šito naudojama myGame.bombsPlac() */
function generateBombs(startingPoint, boardSize, bombCount) {
    // var bombList = [];
    // for (  ) {
    // }
    console.log('bombing');
};