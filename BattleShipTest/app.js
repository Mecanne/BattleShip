/*jshint esversion: 6 */

class Jugador {
    constructor(id) {
        this.id = id;
        this.barcos = []; // Array que contenda las instancias de los barcos.
        this.ataques = []; // Array que cotendrá los ataques realizados.
        this.arrayDisparos = []; // Array que contendra la posicion de los disparos
        this.arrayBarcos = []; // Array que contendrá la posicion de los barcos
        this.inicializarTableros();
        this.direccionBarco = ''; // Direccion en la que se insertarán los bacos en el tablero.
        this.barcosNoColocados = [5, 4, 3, 3, 2]; // Array que contiene la longitud de los barcos que no hemos introducido.
    }

    inicializarTableros() {
        // Creamos el array que contiene las casillas del tablero.
        this.arrayBarcos = new Array(10);
        // A cada posicion del array creamos un nuevo array, para asi crear el array bidimensional.
        for (let i = 0; i < this.arrayBarcos.length; i++) {
            this.arrayBarcos[i] = new Array(10);
        }
        // Establecemos todas las posiciones a 0.
        for (let f = 0; f < this.arrayBarcos.length; f++) {
            for (let c = 0; c < this.arrayBarcos.length; c++) {
                this.arrayBarcos[f][c] = 0;
            }
        }

        // Array que contendra los disparos que nos han hecho.
        this.arrayDisparos = new Array(10);
        // A cada posicion del array creamos un nuevo array, para asi crear el array bidimensional.
        for (let i = 0; i < this.arrayDisparos.length; i++) {
            this.arrayDisparos[i] = new Array(10);
        }
        // Establecemos todas las posiciones a 0.
        for (let f = 0; f < this.arrayDisparos.length; f++) {
            for (let c = 0; c < this.arrayDisparos.length; c++) {
                this.arrayDisparos[f][c] = 0;
            }
        }
    }

    establecerContrincante(contrincante) {
        this.contrincante = contrincante;
    }

    // Funcion para establecer el tablero al jugador
    establecerTablero(tablero) {
        this.tablero = tablero;
    }

    disparar(fila, columna) {
        if (fila >= 0 && fila < 10 && columna >= 0 && columna < 10) {
            if (!this.comprobarDisparo(fila, columna)) {
                this.contrincante.arrayDisparos[fila][columna] = 'X';
                this.añadirDisparo(fila, columna);
                if(this.contrincante.arrayBarcos[fila][columna] !== 0){
                    this.contrincante.barcos[this.contrincante.comprobarBarco(fila,columna)].restarVida();
                }
                return true;
            }
            else {
                return false;
            }
        } else {
            return false;
        }
    }

    añadirDisparo(fila, columna) {
        this.ataques.push([fila, columna]);
    }

    comprobarDisparo(fila, columna) {
        var ataques = this.ataques; // Array que contiene los disparos ya realizados.
        if (fila >= 0 && fila < 10 && columna >= 0 && columna < 10) {
            for (let i = 0; i < ataques.length; i++) {
                // Si la primera y segunda posicion del ataque a comrpobar coincide con un ataque ya realizado, deolvera tru
                if ((ataques[i][0] === fila) && (ataques[i][1] === columna)) return true;
            }
            return false;
        } else {
            return false;
        }
    }

    colocarBarco(fila, columna, longitud, direccion) {
        //console.log("Intentando colocar un barco de longitud: " + longitud + " en la posicion (" + fila + "," + columna + "), en la direccion: " + direccion);
        var arrayBarcos = this.arrayBarcos;
        // Si ya hay 5 barcos, no dejara meter mas
        if(this.barcos.length < 5){
            // Comprobamos que los datos son postivos, para poder introducir correctamente los barcos.
            if (fila >= 0 && columna >= 0 && longitud > 0) {
                // Si los valores introducidos son validos.
                switch (direccion) {
                    // Comprobamos en que posicion se va a insertar el barco.
                    case 'v':
                        // Comprobamos que el barco cabe.
                        if (fila + longitud <= 10) {
                            // Comprobamos que no hay ninguna barco en la posicon en la que lo vamos a meter ni alrededor.
                            for (let i = 0; i < longitud; i++) {
                                // En el caso de que sea vertical, tenemos las siguiente posiciones posibles a insertar.
                                // Pegado a la pared derecha, por lo que solo se tendra en cuenta la parte de la izquierda.
                                if (columna === 0) {
                                    // Si esta tocando el borde izquierdo del tablero.
                                    if (fila === 0) {
                                        // Si esta tocando el 'techo'.
                                        if (i !== longitud - 1) {
                                            // Si no es la ultima posicion, comprobamos que no hay ningun barco a al derecha.
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false;
                                        } else {
                                            // Si es la ultima posicion, comprobamos que ni abajo a la derecha ni debajo haya un barco.
                                            if (arrayBarcos[fila + i + 1][columna] !== 0) return false;
                                            if (arrayBarcos[fila + i + 1][columna + 1] !== 0) return false;
                                        }
                                    } else if (fila + longitud === 10) {
                                        // Comprobamos si el barco acabará en el borde del tablero.
                                        if (i === 0) {
                                            // Si está en la primera posicion, no puede haber ningun barco encima ni alrededor.
                                            if (arrayBarcos[fila + i - 1][columna + 1] !== 0) return false; // Arriba derecha
                                            if (arrayBarcos[fila + i - 1][columna] !== 0) return false; // Arriba
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si está en cualquier otra posicon y hay algun barco a al drecha.
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false;
                                        }
                                    } else {
                                        // Si el barco ni empieza en el 'techo' ni acaba en el 'suelo' del tablero.
                                        if (i === 0) {
                                            // Si es la primera posicion, que compruebe que ninguno esta pro encima
                                            if (arrayBarcos[fila + i - 1][columna] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + i - 1][columna + 1] !== 0) return false; // Arriba derecha
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        } else if (i === longitud - 1) {
                                            // Si es la ultima posicion comprobara que no haya ningun barco al lado.
                                            if (arrayBarcos[fila + i + 1][columna] !== 0) return false; // Abajo
                                            if (arrayBarcos[fila + i + 1][columna + 1] !== 0) return false; // Abajo derecha
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        } else {
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Comprobamos solo a la derecha.
                                        }
                                    }
                                } else if (columna === 9) {
                                    // Si esta tocando el borde derecho del tablero.
                                    if (fila === 0) {
                                        // Si esta tocando el 'techo'.
                                        if (i !== longitud - 1) {
                                            // Si no es la ultima posicion, comprobamos que no hay ningun barco a al izquierda.
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false;
                                        } else {
                                            // Si es la ultima posicion, comprobamos que ni abajo a la derecha ni debajo haya un barco.
                                            if (arrayBarcos[fila + i + 1][columna] !== 0) return false;
                                            if (arrayBarcos[fila + i + 1][columna - 1] !== 0) return false;
                                        }
                                    } else if (fila + longitud === 10) {
                                        // Comprobamos si el barco acabará en el borde del tablero.
                                        if (i === 0) {
                                            // Si está en la primera posicion, no puede haber ningun barco encima ni alrededor.
                                            if (arrayBarcos[fila + i - 1][columna - 1] !== 0) return false; // Arriba izquierda
                                            if (arrayBarcos[fila + i - 1][columna] !== 0) return false; // Arriba
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                        } else {
                                            // Si está en cualquier otra posicon y hay algun barco a al izquierda.
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false;
                                        }
                                    } else {
                                        // Si el barco ni empieza en el 'techo' ni acaba en el 'suelo' del tablero.
                                        if (i === 0) {
                                            // Si es la primera posicion, que compruebe que ninguno esta por encima
                                            if (arrayBarcos[fila + i - 1][columna] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + i - 1][columna - 1] !== 0) return false; // Arriba izquierda
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                        } else if (i === longitud - 1) {
                                            // Si es la ultima posicion comprobara que no haya ningun barco al lado.
                                            if (arrayBarcos[fila + i + 1][columna] !== 0) return false; // Debajo
                                            if (arrayBarcos[fila + i + 1][columna - 1] !== 0) return false; // Abajo izquierda
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                        } else {
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Comprobamos solo a la izquerda.
                                        }
                                    }
                                } else {
                                    // Si esta en cualquier otra posicon habra que comprobar tanto para la derecha como para izquierda.
                                    if (fila === 0) {
                                        // Si esta tocando el 'techo'.
                                        if (i !== longitud - 1) {
                                            // Si no es la ultima posicion, comprobamos que no hay ningun barco a al izquierda o derecha.
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                        } else {
                                            // Si es la ultima posicion, comprobamos que ni abajo a la derecha o izquierda haya un barco.
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                            if (arrayBarcos[fila + i + 1][columna - 1] !== 0) return false; // Abajo izquierda
                                            if (arrayBarcos[fila + i + 1][columna] !== 0) return false; // Abajo
                                            if (arrayBarcos[fila + i + 1][columna + 1] !== 0) return false; // Abajo derecha
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        }
                                    } else if (fila + longitud === 10) {
                                        // Comprobamos si el barco acabará en el borde del tablero.
                                        if (i === 0) {
                                            // Si está en la primera posicion, no puede haber ningun barco encima ni alrededor.
                                            if (arrayBarcos[fila + i - 1][columna - 1] !== 0) return false; // Arriba izquierda
                                            if (arrayBarcos[fila + i - 1][columna] !== 0) return false; // Arriba
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                            if (arrayBarcos[fila + i + 1][columna + 1] !== 0) return false; // Arriba derecha
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si está en cualquier otra posicon y hay algun barco a al izquierda o derecha.
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        }
                                    } else {
                                        // Si el barco ni empieza en el 'techo' ni acaba en el 'suelo' del tablero.
                                        if (i === 0) {
                                            // Si está en la primera posicion, no puede haber ningun barco encima ni alrededor.
                                            if (arrayBarcos[fila + i - 1][columna - 1] !== 0) return false; // Arriba izquierda
                                            if (arrayBarcos[fila + i - 1][columna] !== 0) return false; // Arriba
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                            if (arrayBarcos[fila + i + 1][columna + 1] !== 0) return false; // Arriba derecha
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        } else if (i === longitud - 1) {
                                            // Si es la ultima posicion, comprobamos que ni abajo a la derecha o izquierda haya un barco.
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                            if (arrayBarcos[fila + i + 1][columna - 1] !== 0) return false; // Abajo izquierda
                                            if (arrayBarcos[fila + i + 1][columna] !== 0) return false; // Abajo
                                            if (arrayBarcos[fila + i + 1][columna + 1] !== 0) return false; // Abajo derecha
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si no es el inicio ni el final comprobamos tanto a la izquierda como a la derecha.
                                            if (arrayBarcos[fila + i][columna + 1] !== 0) return false; // Derecha.
                                            if (arrayBarcos[fila + i][columna - 1] !== 0) return false; // Izquierda
                                        }
                                    }
                                }
                                if (arrayBarcos[fila + i][columna] !== 0) return false;
                            }

                            //Establecemos los valores a cada posicion.
                            for (let i = 0; i < longitud; i++) {
                                arrayBarcos[fila + i][columna] = longitud;
                            }
                            this.barcos.push(new Barco(fila, columna, longitud, direccion));
                            return true;
                        }
                        return false;
                    case 'h':
                        if (columna + longitud <= 10) {
                            // Comprobamos que no hay ninguna barco en la posicon en la que lo vamos a meter.
                            for (let i = 0; i < longitud; i++) {
                                if (fila === 0) {
                                    // Si la fila es la primera, solo habra que comprobar por debajo del barco.
                                    if (columna === 0) {
                                        // Si la columna es 0 solo debemos comprobar por debajo y por la derecha.
                                        if (i === longitud - 1) {
                                            // Si estamos en la ultima posicion habra que comprobar que no hay barco ni abajo, ni delante ni abajo-adelantes.
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Abajo
                                            if (arrayBarcos[fila + 1][columna + i + 1] !== 0) return false; // Abajo derecha
                                            if (arrayBarcos[fila][columna + i + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si no solo habrá que comprobar abajo.
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false;
                                        }
                                    } else if (columna + longitud === 10) {
                                        // Si la columna es la ultima solo comprobara a la izquierda y abajo.
                                        if (i === 0) {
                                            // Si estamos en la primera posicion, comprobará detras y abajo.
                                            if (arrayBarcos[fila][columna + i - 1] !== 0) return false; // Detras
                                            if (arrayBarcos[fila + 1][columna + i - 1] !== 0) return false; // Detras abajo
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Abajo
                                        } else {
                                            // Si no comprobará solo abajo.
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false;
                                        }
                                    } else {
                                        // Si no comprobara a la izquierda, abajo y derecha.
                                        if (i === 0) {
                                            // Si estamos en el principio, tendremos que comprobar tanto abajo como a al izquierda.
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Abajo
                                            if (arrayBarcos[fila + 1][columna + i - 1] !== 0) return false; // Abajo izquierda
                                            if (arrayBarcos[fila][columna + i - 1] !== 0) return false; // Izquierda
                                        } else if (i === longitud - 1) {
                                            // Si estamos en la ultima posicion habra que comprbar tanto abajo, como a la derecha.
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Abajo
                                            if (arrayBarcos[fila + 1][columna + i + 1] !== 0) return false; // Abajo derecha
                                            if (arrayBarcos[fila][columna + i + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si no, habra solo abajo.
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false;
                                        }
                                    }
                                } else if (fila === 9) {
                                    // Si es la ultima fila, solo habra que comprobar por encima.
                                    if (columna === 0) {
                                        // Si la columna es 0 solo debemos comprobar por encima y por la derecha.
                                        if (i === longitud - 1) {
                                            // Si estamos en la ultima posicion habra que comprobar que no hay barco ni encima, ni delante.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila - 1][columna + i + 1] !== 0) return false; // Encima derecha
                                            if (arrayBarcos[fila][columna + i + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si no solo habrá que comprobar encima.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false;
                                        }
                                    } else if (columna + longitud === 10) {
                                        // Si la columna es la ultima solo comprobara a la izquierda y encima.
                                        if (i === 0) {
                                            // Si estamos en la primera posicion, comprobará detras y encima.
                                            if (arrayBarcos[fila][columna + i - 1] !== 0) return false; // Detras
                                            if (arrayBarcos[fila - 1][columna + i - 1] !== 0) return false; // Detras encima
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                        } else {
                                            // Si no comprobará solo encima.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false;
                                        }
                                    } else {
                                        // Si no comprobara a la izquierda, encima y derecha.
                                        if (i === 0) {
                                            // Si estamos en el principio, tendremos que comprobar tanto Encima como a al izquierda.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila - 1][columna + i - 1] !== 0) return false; // Encima izquierda
                                            if (arrayBarcos[fila][columna + i - 1] !== 0) return false; // Izquierda
                                        } else if (i === longitud - 1) {
                                            // Si estamos en la ultima posicion habra que comprbar tanto encima, como a la derecha.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila - 1][columna + i + 1] !== 0) return false; // Encima derecha
                                            if (arrayBarcos[fila][columna + i + 1] !== 0) return false; // Derecha
                                        } else {
                                            // Si no, habra solo encima.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false;
                                        }
                                    }
                                } else {
                                    // Si no habara que comprobar tanto encima como debajo.
                                    if (columna === 0) {
                                        // Si la columna es 0 solo debemos comprobar por encima y debajo y por la derecha.
                                        if (i === longitud - 1) {
                                            // Si estamos en la ultima posicion habra que comprobar que no hay barco ni encima, ni delante, ni abajo.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila - 1][columna + i + 1] !== 0) return false; // Encima derecha
                                            if (arrayBarcos[fila][columna + i + 1] !== 0) return false; // Derecha
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Debajo
                                            if (arrayBarcos[fila + 1][columna + i + 1] !== 0) return false; // Debajo derecha.
                                        } else {
                                            // Si no solo habrá que comprobar encima y debajo.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Debajo
                                        }
                                    } else if (columna + longitud === 10) {
                                        // Si la columna es la ultima solo comprobara a la izquierda, encima y abajo.
                                        if (i === 0) {
                                            // Si estamos en la primera posicion, comprobará detras y encima.
                                            if (arrayBarcos[fila][columna + i - 1] !== 0) return false; // Detras
                                            if (arrayBarcos[fila - 1][columna + i - 1] !== 0) return false; // Detras encima
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + 1][columna + i - 1] !== 0) return false; // Detras abajo
                                            if (arrayBarcos[fila + 1][columna + i - 1] !== 0) return false; // Abajo
                                        } else {
                                            // Si no comprobará solo encima y debajo.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Debajo
                                        }
                                    } else {
                                        // Si no comprobara a la izquierda, encima y derecha.
                                        if (i === 0) {
                                            // Si estamos en la primera posicion, comprobará detras y encima.
                                            if (arrayBarcos[fila][columna + i - 1] !== 0) return false; // Detras
                                            if (arrayBarcos[fila - 1][columna + i - 1] !== 0) return false; // Detras encima
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + 1][columna + i - 1] !== 0) return false; // Detras abajo
                                            if (arrayBarcos[fila + 1][columna + i - 1] !== 0) return false; // Abajo
                                        } else if (i === longitud - 1) {
                                            // Si estamos en la ultima posicion habra que comprobar que no hay barco ni encima, ni delante, ni abajo.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila - 1][columna + i + 1] !== 0) return false; // Encima derecha
                                            if (arrayBarcos[fila][columna + i + 1] !== 0) return false; // Derecha
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Debajo
                                            if (arrayBarcos[fila + 1][columna + i + 1] !== 0) return false; // Debajo derecha.
                                        } else {
                                            // Si no solo habrá que comprobar encima y debajo.
                                            if (arrayBarcos[fila - 1][columna + i] !== 0) return false; // Encima
                                            if (arrayBarcos[fila + 1][columna + i] !== 0) return false; // Debajo
                                        }
                                    }
                                }
                            }

                            // Si aprueba el test, colocamos el barco.
                            for (let i = 0; i < longitud; i++) {
                                arrayBarcos[fila][columna + i] = longitud;
                            }
                            this.barcos.push(new Barco(fila, columna, longitud, direccion));
                            return true;
                        }
                        return false;
                    default:
                        return false;
                }
            } else {
                return false;
            }
        }
        return false;
    }

    colocarBarcosAleatorio() {
        var longitudBarcos = this.barcosNoColocados; // Array que contiene las longitudes de los barcos que podemos introducir.
        while (longitudBarcos.length !== 0) {
            let posX = parseInt(Math.random() * 10);
            let posY = parseInt(Math.random() * 10);
            let direccion = parseInt(Math.ceil(Math.random() * 2));
            if (direccion === 1) {
                direccion = 'v';
            } else {
                direccion = 'h';
            }
            if (this.colocarBarco(posX, posY, longitudBarcos[0], direccion)) longitudBarcos.shift();
        }
    }

    comprobarVidaBarcos() {
        var barcos = this.barcos;
        var barcosHundidos = 0;
        for (let i = 0; i < barcos.length; i++) {
            if (barcos[i].getvida() === 0) barcosHundidos++;
        }
        return (barcosHundidos === 5);
    }

    comprobarBarco(fila, columna) {
        var barcos = this.barcos;
        for (let i = 0; i < barcos.length; i++) {
            // Por cada barco, debemos comprobar en que direccion va.
            switch (barcos[i].getdireccion()) {
                case 'v':
                    // Si es vertical, debemos comprobar que si esta en la misma columna en la que queremso buscar.
                    if (barcos[i].getcolumna() === columna) {
                        // Si esta en la misma columna, comprobamos que la fila a buscar esta entre las filas del barco.
                        if (fila >= barcos[i].getfila() && fila <= (barcos[i].getfila() + barcos[i].getlongitud() - 1)) {
                            return i;
                        }
                    } else {
                        break;
                    }
                    break;
                case 'h':
                    // Si es horizontal, debemos comprobar que esta en la misma fila
                    if (barcos[i].getfila() === fila) {
                        // Si esta en la misma fila debemos comprobar que la columna en la que queremos comprobar esta comprendida entre las posiciones que ocupa el barco.
                        if (columna >= barcos[i].getcolumna() && columna <= (barcos[i].getcolumna() + barcos[i].getlongitud() - 1)) {
                            return i;
                        }
                    } else {
                        break;
                    }
            }
        }
        return -1;
    }

    restarVidaBarco(fila, columna) {
        var posicionBarco = this.comprobarBarco(fila, columna);
        var vidaBarco = this.getVidaBarco(fila, columna);
        this.barcos[posicionBarco].setvidas(vidaBarco - 1);
        return;
    }

    getVidaBarco(fila, columna) {
        var posicionBarco = this.comprobarBarco(fila, columna);
        return this.barcos[posicionBarco].getvida();
    }
}

class Barco {
    constructor(fila, columna, longitud, direccion) {
        this.fila = fila;
        this.columna = columna;
        this.longitud = longitud;
        this.direccion = direccion;
        this.vidas = longitud;
    }

    restarVida() {
        if (this.vidas > 0) {
            this.vidas--;
            return true;
        }
        return false;
    }

    getvida() {
        return this.vidas;
    }

    getfila() {
        return this.fila;
    }

    getcolumna() {
        return this.columna;
    }

    getlongitud() {
        return this.longitud;
    }

    getdireccion() {
        return this.direccion;
    }

    setvidas(cantidad) {
        if (cantidad >= 0) {
            this.vidas = cantidad;
            return true;
        }
        return false;
    }

}

module.exports.Barco = Barco;
module.exports.Jugador = Jugador;
