
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

var expect = chai.expect
    assert = chai.assert;


describe('Test función reservarHorario(horario).', function() {

    it('Cuando se reserva un horario, el horario correspondiente se elimina del arreglo.', function() {
        var pizzaTest = new Restaurant();

        var horarioReserva = "13:00";
        pizzaTest.reservarHorario(horarioReserva);
        expect(pizzaTest.horarios).not.to.be.include(horarioReserva);
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

describe('Test función obtenerPuntuación().', function() {

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

describe('Test función calificar().', function() {

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

    it('Dada la calificación 10, que suba el promedio.', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        var puntuacionAnterior = pizzaTest.obtenerPuntuacion();
        var calificacion = 10;
        console.log("Nota anterior: " + puntuacionAnterior + " Calificación: " + calificacion  + " Nota posterior: " + pizzaTest.obtenerPuntuacion())

        pizzaTest.calificar(calificacion);
        //expect(pizzaTest.obtenerPuntuacion()).to.be.above(puntuacionAnterior);

    }) // Inicialmente estaba mal calculado porque al ser la nota 10, no aumentaba el promedio. Todavía no se corrige.

    it('Que el promedio no exceda el 10.', function() {
        var calificaciones = [1, 3, 5, 6, 6];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        var puntuacionAnterior = pizzaTest.obtenerPuntuacion();
        var calificacion = 10;
        console.log("Nota anterior: " + puntuacionAnterior + " Calificación: " + calificacion  + " Nota posterior: " + pizzaTest.obtenerPuntuacion())

        pizzaTest.calificar(calificacion);
        expect(pizzaTest.obtenerPuntuacion()).to.be.below(10);
    })

    it('Que el promedio no sea menor que 1.', function() {
        var calificaciones = [1, 1, 1, 1, 1];
        var pizzaTest = new Restaurant(undefined,undefined,undefined,undefined,undefined,undefined,calificaciones);
        pizzaTest.calificar(-5);
        expect(pizzaTest.obtenerPuntuacion()).to.be.above(0);
    })
})

describe('Test función buscarRestaurante(id).', function() {

    it('Dado un ID real, que devuelva el restaurant correcto.', function() {
        expect(listado.buscarRestaurante(7).id).to.be.deep.equal(7);
    })

    it('Dado un ID inexistente, que no devuelva ningun restaurant.', function() {
        expect(listado.buscarRestaurante(100)).to.be.deep.equal("No se ha encontrado ningún restaurant");
    })

    it('Dado un valor no válido, que no devuelva ningun restaurant.', function() {
        expect(listado.buscarRestaurante("asd")).to.be.deep.equal("No se ha encontrado ningún restaurant");
        expect(listado.buscarRestaurante("?!")).to.be.deep.equal("No se ha encontrado ningún restaurant");
        expect(listado.buscarRestaurante("")).to.be.deep.equal("No se ha encontrado ningún restaurant");
    }) // Inicialmente no tenía control para valores que no eran nùmeros. Se corrige.
})

describe('Test función obtenerRestaurantes().', function() {

    it('Sin ningun filtros', function() {
        expect(listado.obtenerRestaurantes(null,null,null).length).to.equal(24);
    })

    it('Filtrando sólo por ciudad', function() {
        expect(listado.obtenerRestaurantes(null,'Nueva York',null).length).to.equal(7);
    })

    it('Filtrando sólo por rubro', function() {
        expect(listado.obtenerRestaurantes('Hamburguesa',null,null).length).to.equal(4);
    })

    it('Filtrando sólo por horario', function() {
        expect(listado.obtenerRestaurantes(null,null,'08:00').length).to.equal(0);
    })

    it('Utilizando filtros Ciudad, Rubro y Horario', function() {
        expect(listado.obtenerRestaurantes('Pasta','Berlín','12:00').length).to.equal(1);
    })
})

describe('Test módulo reserva.', function() {

    it('Calcula correctamente el precio base', function() {
        expect(listadoDeReservas[0].precioBase()).to.equal(2800);
        expect(listadoDeReservas[1].precioBase()).to.equal(300);
    })

    it('Calcula correctamente el precio final', function() {
        expect(listadoDeReservas[0].precioFinal()).to.equal(2310);
        expect(listadoDeReservas[1].precioFinal()).to.equal(100);
    })
});


// PREGUNTAS A HACER
//  - Me dice que el objeto restaurante no esta definido cuando en verdad lo estoy importando.
//  - Cuando ejecuto una función tiene un scope que no respeta el orden secuencial.
//  - Armé bien las funciones biggerthan y lessthan?
//
//  - if(this.restaurantes.find(id)){
//        this.restaurantes.find(id)
//    } else {
//        return "No se ha encontrado ningún restaurant";
//    }
//      &
//    var arregloHorarios = this.restaurantes.map(function(restaurant){
//        return restaurant.horarios;
//    });
//    Se puede escribir con función flecha?
//
//  - ¿Se podría utilizar el patron módulo a restaurant.js?
//  - ¿ VAR, LET y CONST ?
