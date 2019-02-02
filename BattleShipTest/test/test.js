var expect = require('chai').expect;

describe('Pruebas sobre la colocacion de barcos:', function () {
    var Jugador = require('../app.js').Jugador;

    // Colocar barco en vertical
    it('Barco en vertical en posicon valida', function () {

        var jugadorPrueba = new Jugador('player');
        expect(jugadorPrueba.colocarBarco(1, 1, 2, "v")).to.be.true;

    });

    // Colocar barco en horizontal
    it('Barco en horizonta en posicion valida', function () {

        var jugadorPrueba = new Jugador('player');
        expect(jugadorPrueba.colocarBarco(1, 1, 5, "h")).to.be.true;

    });

    // Colocar barco en vertical en una posicion en la que se salga del tablero.
    it('Barco en vertical en posicion valida saliendose del tablero', function () {

        var jugadorPrueba = new Jugador('player');
        expect(jugadorPrueba.colocarBarco(7, 0, 5, "v")).to.be.false;

    });

    // Colocar barco en horizontal en una posicion en la que se salga del tablero.
    it('Barco en horizontal en posicion valida saliendose del tablero', function () {

        var jugadorPrueba = new Jugador('player');
        expect(jugadorPrueba.colocarBarco(0, 7, 4, "h")).to.be.false;

    });

    // Colocar barco en vertical en una posicion en la que secruza con otro barco.
    it('Barco en vertical en posicion valida chocandose con otro barco', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(6, 2, 4, "h")
        expect(jugadorPrueba.colocarBarco(4, 3, 4, "v")).to.be.false;

    });

    // Colocar barco en horizontal en una posicion en la que secruza con otro barco.
    it('Barco en horizontal en posicion valida chocandose con otro barco', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 5, 4, "v")
        expect(jugadorPrueba.colocarBarco(3, 2, 5, "h")).to.be.false;

    });

    // Colocar barcos aleatoriamente
    it('Comprobar que se colocan los barcos aleatoriamente', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarcosAleatorio();
        expect(jugadorPrueba.barcos.length).to.equal(5);

    });

    // Comprobar que no se pueden colocar mas de 5 barcos.
    it('Comprobar que no se pueden colocar mas de 5 barcos', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.colocarBarco(2, 4, 4, "v");
        jugadorPrueba.colocarBarco(2, 6, 3, "v");
        jugadorPrueba.colocarBarco(9, 2, 3, "h");
        jugadorPrueba.colocarBarco(7, 7, 2, "v");
        expect(jugadorPrueba.colocarBarco(0, 9, 5, "v")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco a al derecha de otro en vertical.
    it('Comprobar que no se puede colocar un barco a al derecha de otro en vertical', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        expect(jugadorPrueba.colocarBarco(0, 3, 5, "v")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco a al izquierda de otro en vertical.
    it('Comprobar que no se puede colocar un barco a al izquierda de otro en vertical', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        expect(jugadorPrueba.colocarBarco(0, 1, 5, "v")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco encima de otro en vertical.
    it('Comprobar que no se puede colocar un barco encima de otro en vertical', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        expect(jugadorPrueba.colocarBarco(1, 1, 5, "h")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco debajo de otro en vertical.
    it('Comprobar que no se puede colocar un barco debajo de otro en vertical', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        expect(jugadorPrueba.colocarBarco(7, 1, 5, "h")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco encima de otro en horizontal.
    it('Comprobar que no se puede colocar un barco encima de otro en horizontal', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(6, 2, 5, "h");
        expect(jugadorPrueba.colocarBarco(5, 3, 5, "h")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco debajo de otro en horizontal.
    it('Comprobar que no se puede colocar un barco debajo de otro en horizontal', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(6, 2, 5, "h");
        expect(jugadorPrueba.colocarBarco(7, 3, 5, "h")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco a la derecha de otro en horizontal.
    it('Comprobar que no se puede colocar un barco a la derecha de otro en horizontal', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(6, 2, 5, "h");
        expect(jugadorPrueba.colocarBarco(3, 7, 5, "v")).to.be.false;

    });

    // Comprobar que no se puede colocar un barco a la izquierda de otro en horizontal.
    it('Comprobar que no se puede colocar un barco a la izquierda de otro en horizontal', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(6, 2, 5, "h");
        expect(jugadorPrueba.colocarBarco(3, 1, 5, "v")).to.be.false;

    });

});

describe('Pruebas sobre disparos:', function () {
    var Jugador = require('../app.js').Jugador;

    // Comprobar que todos los barcos estan hundidos.
    it('Comprobar que todos los barcos estan hundidos', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.establecerContrincante(jugadorPrueba);
        jugadorPrueba.colocarBarcosAleatorio();
        for (let i = 0; i < jugadorPrueba.barcos.length; i++) {
            jugadorPrueba.barcos[i].setvidas(0);
        }
        expect(jugadorPrueba.comprobarVidaBarcos()).to.be.true;
    });

    // Disparo a una posicion valida
    it('Comprobar que se confirma si se ha podido disparar a una posicon valida', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.establecerContrincante(jugadorPrueba);
        expect(jugadorPrueba.disparar(2, 2)).to.be.true;

    });

    // Disparo a una posicion en la que ya se ha disparado
    it('Comprobar que se confirma que no se ha podido disparar a una posicon en la que ya se ha disparado', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.establecerContrincante(jugadorPrueba);
        jugadorPrueba.disparar(2, 2);
        expect(jugadorPrueba.disparar(2, 2)).to.be.false;

    });

    // Comprobar que si se dispara a un barco le restas vida.
    it('Comprobar que si se dispara a un barco le restas vida', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.establecerContrincante(jugadorPrueba);
        jugadorPrueba.disparar(2, 2);
        expect(jugadorPrueba.barcos[0].getvida()).to.equal(4);

    });

    // Comprobar que no se puede disparar fuera del tablero.
    it('Comprobar que no se puede disparar fuera del tablero', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.establecerContrincante(jugadorPrueba);
        expect(jugadorPrueba.disparar(10, 13)).to.be.false;

    });

});

describe('Pruebas sobre el control de barcos:', function () {
    var Jugador = require('../app.js').Jugador;

    // Comprobar que si puedes obtener la vida de un barco en determinada posicion.
    it('Comprobar que puedes obtener la vida de un barco en determinada posicion', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.establecerContrincante(jugadorPrueba);
        var posicion = jugadorPrueba.comprobarBarco(3, 2);
        expect(jugadorPrueba.barcos[posicion].getvida()).to.equal(5);

    });
    // Comprobar que puedes obtener la posicion de cualquier barco en el array.
    it('Comprobar que puedes obtener la posicion de cualquier barco en el array', function () {

        var jugadorPrueba = new Jugador('player');
        jugadorPrueba.colocarBarco(2, 2, 5, "v");
        jugadorPrueba.colocarBarco(2, 4, 4, "v");
        jugadorPrueba.colocarBarco(2, 6, 3, "v");
        jugadorPrueba.colocarBarco(9, 2, 3, "h");
        jugadorPrueba.colocarBarco(7, 7, 2, "v");
        expect(jugadorPrueba.comprobarBarco(7, 7)).to.equal(4);

    });

});

describe('Pruebas sobre los barcos:', function () {
    var Barco = require('../app.js').Barco;

    it('Restar vida a un barco', function () {

        var barcoPrueba = new Barco(2, 2, 5, "v");
        barcoPrueba.restarVida();
        expect(barcoPrueba.getvida()).to.equal(4);

    });

    it('Restar vida a un barco cuando su vida ya es 0', function () {

        var barcoPrueba = new Barco(2, 2, 0, "v");
        expect(barcoPrueba.restarVida()).to.be.false;

    });

    it('Comprobar la vida de un barco al principio es igual a su longitud', function () {

        var barcoPrueba = new Barco(2, 2, 5, "v");
        expect(barcoPrueba.getvida()).to.equal(5);

    });

    it('Comprobar que se puede asignar una cantidad de vidas positivas a un barco', function () {

        var barcoPrueba = new Barco(2, 2, 5, "v");
        expect(barcoPrueba.setvidas(10)).to.be.true;

    });

    it('Comprobar que no se puede asignar una cantidad de vidas negativas a un barco', function () {

        var barcoPrueba = new Barco(2, 2, 5, "v");
        expect(barcoPrueba.setvidas(-1)).to.be.false;

    });

});

