"use strict";
const Observable = (function () {
    let observers = [];
    /* let nb;
   console.log(nb++);  */
    return {
        hookObserver: function (observer) {
            observers.push(observer);
        },
        unHookObserver: function (observer) {
            let index = observers.indexOf(observer);
            if (index > -1) {
                observers.splice(index, 1);
            }
        },
        notify: function (observer, cellIndx) {
            let index = observers.indexOf(observer);
            if (index > -1) {
                observers[index].notify(cellIndx);
            }
        },
        notifyAll: function (cellIndx) {
            for (let observer of observers) observer.notify(cellIndx);
            console.log(cellIndx);
        },
    };
})();

const Observer = function () {
    return {
        notify: function (index) {
            if (myGame.cells[index].openC && myGame.cells[index].gretBomb > 0) {
                $('.cell').eq(index).html(myGame.cells[index].gretBomb).css('background-color','#dfd');
                //$('.cell').eq(index).css('background-color','#dfd');
            }
            else if (myGame.cells[index].openC && myGame.cells[index].gretBomb === 0) {
                $('.cell').eq(index).css('background-color','#ddf');
            }
            else if (myGame.cells[index].flagM) {
                $('.cell').eq(index).addClass('fa fa-flag');
            } if (myGame.cells[index].bomb && !myGame.cells[index].flagM){
                $('.cell').eq(index).addClass('fa fa-bomb fa-pulse').css('background-color','red');
            }
        }
    }
};

/**singleton myGame klase*/
const myGame = {
    cells: [],
    observable: Observable,
    /** sudeda bombas į laukelius */
    bombsPlac: function (fieldLength, bombCount) {
        var j = 0;
        let bombs = [];
        while (j < bombCount) {
            let i = Math.trunc(Math.random() * fieldLength);
            if (!bombs.includes(i)) {
                bombs.push(i);
                this.cells[i].bomb = true;
                j++;
            }
            //console.log('j: ' + j + '  i: ' + i);
        }
        return;
    },
    /** generuoja cells, suranda ju kaimynus */
    letGame: function (fieldLength, lineLength) {
        for (let i = 0; i < fieldLength; i++) {
            let celC = new celContent(false, i, 0, false, false);
            celC.kaimynuNr = this.getNeibas(i, fieldLength, lineLength);
            this.cells.push(celC);
        }
        //let observable =new Observable();
    },
    /** surašo greta esančias bombas */
    countBombsAround: function () {
        for (let cell of this.cells) {
            for (let kaimynas of cell.kaimynuNr) {
                if (this.cells[kaimynas].bomb) cell.gretBomb++;
            }
        }
    },
    /** sudeda į myGame.cells[i].kaimynuNr[]  reiksmes */
    getNeibas: function (i, fieldL, lineL) {
        let celKaim = [];
        let virsus = i < lineL;
        let kaire = (i % lineL === 0);
        let desine = (i + 1) % lineL === 0;
        let apacia = i >= (fieldL - lineL);
        if (!virsus) { celKaim.push(i - lineL) };
        if (!desine) { celKaim.push(i + 1) };
        if (!apacia) { celKaim.push(i + lineL) };
        if (!kaire) { celKaim.push(i - 1) };
        if (!virsus && !kaire) { celKaim.push(i - 1 - lineL) };
        if (!virsus && !desine) { celKaim.push(i + 1 - lineL) };
        if (!apacia && !desine) { celKaim.push(i + 1 + lineL) };
        if (!apacia && !kaire) { celKaim.push(i - 1 + lineL) };
        /*   console.log(i + ' cell padetis: ', 'v: ' + virsus, 'k: ' + kaire, 'd: ' + desine, 'a: ' + apacia);
           console.log(i + ' turiu kaimynus: ' + celKaim);*/
        return (celKaim);
    },
    /** nustato žymę 'rodyti turinį' */
    setOpenC: function (i) {
        if (this.cells[i].openC) {
            return;
        } else if (this.cells[i].gretBomb > 0) {
            this.cells[i].setOpen();
            return;
        } else if (this.cells[i].gretBomb === 0) {
            this.cells[i].setOpen();
            for (let j of this.cells[i].kaimynuNr) {
                this.setOpenC(j);
            }
            return;
        } else return;
    },
    showCells: function () {
        for (var cell of this.cells) {
            $('.cell').eq(cell.eilNr).append(cell.bomb.toString().charAt(0) + ' ' + cell.gretBomb);
        }
    }
};

/** konstruktorius vienam langeliui */
function celContent(bomb, eilNr, gretBomb, openC, flagM) {
    this.bomb = bomb;//pazym. kad turi bomba
    this.eilNr = eilNr; //lang.eil.nr.
    this.gretBomb = gretBomb; //kiek bomb salia
    this.openC = openC;//pazym. kad atverti
    this.flagM = flagM;//pazymeti d.klav. kad yra bomb
    let kaimynuNr = [];

    this.setOpen = function () {
        this.openC = true;
        //$('.cell').eq(this.eilNr).text(myGame.cells[this.eilNr].gretBomb + '  ' + myGame.cells[this.eilNr].bomb.toString().charAt(0));
        myGame.observable.notifyAll(this.eilNr);
    };//TODO pakeisti observeriu

    this.setFlagM = function () {
        this.flagM = true;
        myGame.observable.notifyAll(this.eilNr);
    };

    this.pranesk = function () {
        let pranT = 'as, nr: ' + this.eilNr + ' turiu bomb: ' + this.bomb;
        return pranT;
    };
    /** šitas seteris nereikalingas,bet galima naudoti. Jis išgelbėjo, kai buvo prastas kodas */
    this.setKaimynNr = function (ar) {
        this.kaimynuNr = ar;
        return;
    };
};