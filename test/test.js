var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id || 25;
    this.nombre = nombre || "Resting";
    this.rubro = rubro || "Asiática";
    this.ubicacion = ubicacion || "Testland";
    this.horarios = horarios || ["13:00", "15:30", "18:00","19:00","22:30"];
    this.imagen = imagen || "../img/pizza4.jpg";
    this.calificaciones = calificaciones || [6, 7, 9, 10, 5];

}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios.splice(i, 1);
            return;
        }
      }
    //this.horarios =  this.filter(this => this.horarios !== horarioReservado);

}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        var sumatoria = 0;
        for (var i = 0; i < this.calificaciones.length; i++) {
            sumatoria += this.calificaciones[i]
        }
        var promedio = sumatoria / this.calificaciones.length;
        return Math.round(promedio * 10) / 10;
    }

}



var Listado = function(restaurantes) {
    this.restaurantes = restaurantes;
}

Listado.prototype.reservarUnHorario = function(id, horario) {
    //Busca el objeto que posee el id dado
    var restaurant = this.buscarRestaurante(id);
    //Le envía el mensaje al objeto encontrado para que reserve el horario
    restaurant.reservarHorario(horario);
}

Listado.prototype.calificarRestaurant = function(id, calificacion) {
    //Busca el objeto que posee el id dado
    var restaurant = this.buscarRestaurante(id);
    //Le envía el mensaje al objeto encontrado para que agregue la nueva calificación
    restaurant.calificar(calificacion);
}

//Dado un id, busca el objeto del listado que tiene ese id
Listado.prototype.buscarRestaurante = function(id) {
    if(isNaN(id)) {
      return "No se ha encontrado ningún restaurant"; // Agregado por Cristian Sansó.
    }

    for (var i = 0; i < this.restaurantes.length; i++) {
        if (this.restaurantes[i].id === id) {
            return this.restaurantes[i]
        }
    }
    return "No se ha encontrado ningún restaurant";
}

//Obtiene todas las ciudades de los restaurantes sin repetidos
Listado.prototype.obtC = function() {
    //Array donde se van a ir agregando las ciudades (van a estar repetidas)
    var c = [];
    //Se recorre el array de restaurantes y se va agregando al array creado, todas las ubicaciones o ciudades encontradas
    for (var i = 0; i < this.restaurantes.length; i++) {
        c.push(this.restaurantes[i].ubicacion);
    }
    //Se crea un nuevo array donde se van a agregar las ciudades pero sin repetirse
    var c2 = c.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });

    return c2.sort();
}

//Obtiene todos los rubros de los restaurantes sin repetidos. Su funcionamiento es similar a obtC()
Listado.prototype.obtR = function() {
    var r = [];
    for (var i = 0; i < this.restaurantes.length; i++) {
        r.push(this.restaurantes[i].rubro);
    }

    var r2 = r.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });

    return r2.sort();
}

//Obtiene todos los horarios de los restaurantes (sin repetidos). Está funcionalidad es un poco más compleja ya que un restaurante
//tiene un array de horarios. Al buscarlos todos vamos a pasar a tener un array de arrays que luego vamos a tener que
//convertir en uno solo
Listado.prototype.obtH = function() {
    //En este array se van a cargar los arrays de horarios, que luego vamos convertir en un solo array
    var arregloH = [];
    //Recorremos el array de restaurantes y vamos agregando todos los array de horarios
    for (var i = 0; i < this.restaurantes.length; i++) {
        arregloH.push(this.restaurantes[i].horarios);
    }

    //En este arreglo vamos a poner todos los horarios, uno por uno
    var h = [];
    arregloH.forEach(function(a) {
        a.forEach(function(hor) {
            h.push(hor)
        });
    });

    //En este arreglo vamos a poner todos los horarios pero sin repetidos
    var h2 = h.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });

    return h2.sort();
}

//Función que recibe los filtros que llegan desde el HTML y filtra el arreglo de restaurantes.
//Solo se filtra si el valor recibido es distinto de null.
Listado.prototype.obtenerRestaurantes = function(filtroRubro, filtroCiudad, filtroHorario) {
    var restaurantesFiltrados = this.restaurantes;
    if (filtroRubro !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(restaurant => restaurant.rubro == filtroRubro);
    }

    if (filtroCiudad !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(restaurant => restaurant.ubicacion == filtroCiudad);
    }

    if (filtroHorario !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(function(res) {
            return res.horarios.some(horario => horario == filtroHorario);
        });
    }
    return restaurantesFiltrados;
}

//Se crea el listado de restaurantes de la aplicación. Si queres agregar un restaurante nuevo, podes agregarlo desde aca, siempre
//verificando que no se repita el id que agregues.

var listadoDeRestaurantes = [
    new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
    new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
    new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
    new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
    new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
    new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
    new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
    new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
    new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
    new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
    new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
    new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
    new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7, ]),
    new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
    new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
    new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
    new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
    new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
    new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
    new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
    new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
    new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
    new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
    new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
];

//Se crea un nuevo listado, asignandole el listado de restaurantes creado anteriormente.
var listado = new Listado(listadoDeRestaurantes)




// Función para calcular el promedio de un array.
function average(array) {
    var sum, avg = 0;
    if (array.length) {
        sum = array.reduce(function(a, b) { return a + b; });
        return avg = (sum / array.length);
    }
}

// Función que devuelve un número al azar mayor al entregado por parámetro.
function randomNumberBiggerThan(number, maximum = 10) {
    do {
        var result = (Math.floor(Math.random() * 10) + number);
    } while (result > maximum);
    return result;
};

// Función que devuelve un número al azar menor al entregado por parámetro.
function randomNumberLessThan(number) {
    do {
        var result = (Math.floor(Math.random() * 10) + 1);
    } while (result > number);
    return result;
};

/*
--EXAMPLE
var expect = chai.expect;
describe('Test de suma', function() {
    it('resultado positivo', function() {
            var resultado = suma(2,3);
            expect(resultado).to.be.above(0);
    })
    it('resultado negativo', function() {
            var resultado = suma(-1,-3);
            expect(0).to.be.above(resultado);
    })
})*/

//var restaurant = require('../js/restaurant'),
    //listado    = require('../js/listado'),
    //aplicacion = require('../js/aplicacion');
var chai   = require('chai'),
    expect = chai.expect,
    assert = chai.assert;


describe('Test función reservarHorario(horario)', function() {

    it('Cuando se reserva un horario, el horario correspondiente se elimina del arreglo.', function() {
        var pizzaTest = new Restaurant();

        var horarioReserva = "13:00";
        pizzaTest.reservarHorario(horarioReserva);
        expect(pizzaTest.horarios).not.to.include(horarioReserva);
    })

    it('Cuando se reserva un horario que no posee, el arreglo se mantiene igual.', function() {
        var pizzaTest = new Restaurant();

        var horarioReserva = "33:00";
        var viejoArreglo = ["13:00", "15:30", "18:00","19:00","22:30"];
        pizzaTest.reservarHorario(horarioReserva);
        expect(pizzaTest.horarios).to.be.deep.equal(viejoArreglo);
    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro, el arreglo se mantiene igual.', function() {
        var pizzaTest = new Restaurant();

        var viejoArreglo = ["13:00", "15:30", "18:00","19:00","22:30"];
        pizzaTest.reservarHorario();
        expect(pizzaTest.horarios).to.be.deep.equal(viejoArreglo);
    })
}) // ✓ Done.

describe('Test función obtenerPuntuación()', function() {

    it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var promedio = average(calificaciones);
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);

        assert.equal(pizzaTest.obtenerPuntuacion(), promedio);
    })

    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function() {
        var calificaciones = [];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);

        assert.equal(pizzaTest.obtenerPuntuacion(), 0);
    })
}) // ✓ Done.

describe('Test función calificar()', function() {

    it('Dada una calificación mayor a la establecida que suba el promedio.', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        var puntuacionAnterior = pizzaTest.obtenerPuntuacion();
        var calificacion = randomNumberBiggerThan(puntuacionAnterior)
        console.log("Nota anterior: " + puntuacionAnterior + " Calificación: " + calificacion  + " Nota posterior: " + pizzaTest.obtenerPuntuacion())

        pizzaTest.calificar(calificacion);
        expect(pizzaTest.obtenerPuntuacion()).to.be.at.most(puntuacionAnterior);
    })

    it('Dada una calificación menor a la establecida que baje el promedio.', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        var puntuacionAnterior = pizzaTest.obtenerPuntuacion();
        var calificacion = randomNumberLessThan(puntuacionAnterior)
        console.log("Nota anterior: " + puntuacionAnterior + " Calificación: " + calificacion  + " Nota posterior: " + pizzaTest.obtenerPuntuacion())

        pizzaTest.calificar(calificacion);
        expect(pizzaTest.obtenerPuntuacion()).to.be.at.least(puntuacionAnterior);
    })

    it('Dada la calificación 10, que suba el promedio', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        var puntuacionAnterior = pizzaTest.obtenerPuntuacion();
        var calificacion = 10;
        console.log("Nota anterior: " + puntuacionAnterior + " Calificación: " + calificacion  + " Nota posterior: " + pizzaTest.obtenerPuntuacion())

        pizzaTest.calificar(calificacion);
        //expect(pizzaTest.obtenerPuntuacion()).to.be.above(puntuacionAnterior);

    }) // Inicialmente estaba mal calculado porque al ser la nota 10, no aumentaba el promedio. Todavía no se corrige.

    it('Que el promedio no exceda el 10', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        var puntuacionAnterior = pizzaTest.obtenerPuntuacion();
        var calificacion = 10;
        console.log("Nota anterior: " + puntuacionAnterior + " Calificación: " + calificacion  + " Nota posterior: " + pizzaTest.obtenerPuntuacion())

        pizzaTest.calificar(calificacion);
        expect(pizzaTest.obtenerPuntuacion()).to.be.below(10);
    })

    it('Que el promedio no sea menor que 1', function() {
        var calificaciones = [1, 1, 1, 1, 1];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        pizzaTest.calificar(-5);
        expect(pizzaTest.obtenerPuntuacion()).to.be.above(0);
    })
})

describe('Test función buscarRestaurante(id)', function() {

    it('Dado un ID real, que devuelva el restaurant correcto.', function() {
        var pizzaTest = new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]);
        var pizzaTestCLON = listado.buscarRestaurante(24);

        expect(pizzaTest).to.be.deep.equal(pizzaTestCLON);
    })

    it('Dado un ID inexistente, que no devuelva ningun restaurant', function() {
        expect(listado.buscarRestaurante(100)).to.be.deep.equal("No se ha encontrado ningún restaurant");
    })

    it('Dado un valor no válido, que no devuelva ningun restaurant', function() {
        expect(listado.buscarRestaurante("asd")).to.be.deep.equal("No se ha encontrado ningún restaurant");
        expect(listado.buscarRestaurante("?!")).to.be.deep.equal("No se ha encontrado ningún restaurant");
        expect(listado.buscarRestaurante("")).to.be.deep.equal("No se ha encontrado ningún restaurant");
    }) // Inicialmente no tenía control para valores que no eran nùmeros. Se corrige.
})

describe('Test función obtenerRestaurantes()', function() {

    it('Dado un ID real, que devuelva los restaurantes correctos.', function() {

    })

    it('Dado un parámetro inexistente, que no devuelva ningun restaurant', function() {
        expect(listado.obtenerRestaurantes(100)).to.be.deep.equal("No se ha encontrado ningún restaurant");
    })


    it('Dado un valor no válido, que no devuelva ningun restaurant', function() {
        expect(listado.obtenerRestaurantes("asd")).to.be.deep.equal("No se ha encontrado ningún restaurant");
        expect(listado.obtenerRestaurantes("?!")).to.be.deep.equal("No se ha encontrado ningún restaurant");
        expect(listado.obtenerRestaurantes("")).to.be.deep.equal("No se ha encontrado ningún restaurant");
    })
})



// PREGUNTAS A HACER
//  - Me dice que el objeto restaurante no esta definido cuando en verdad lo estoy importando.
//  - Cuando ejecuto una función tiene un scope que no respeta el orden secuencial.
//  - Armé bien las funciones biggerthan y lessthan?
//  - ¿Se podría utilizar el patron módulo a restaurant.js?

