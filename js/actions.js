"use strict";
$(document).ready(function () {
     document.getElementsByClassName('content')[0].addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false); 

    var standartSize = [20, 14, 44],/*[boardLength = 20,    boardHeight = 14, bombCount = 44]*/
        boardLength = 6,
        boardHeight = 6,
        bombCount = 6;

    $('.content').html(renderBoard(boardLength, boardHeight, standartSize, bombCount));

    $('.content').on('mousedown', '.cell', function (event) {
        var cellNo = $(this).index();
        //console.log(cellNo);
        switch (event.which){
            case 1:
            //console.log('L');
            if (myGame.cells[cellNo].flagM === true){
                console.log('flagged');
                break;
            }
            myGame.setOpenC(cellNo);
            //$(this).text(myGame.cells[cellNo].gretBomb +'  ' + myGame.cells[cellNo].bomb.toString().charAt(0));
            break;
            case 2:
            console.log('middle finger, no action');
            break;
            case 3:
            myGame.cells[cellNo].setFlagM();
            console.log('R');
            break;
            default: console.log('this type of click has no action');
        }
    });

    /*console.log($('.content').children().size());
    $('.content').children().eq(1).text('vau');*/
});