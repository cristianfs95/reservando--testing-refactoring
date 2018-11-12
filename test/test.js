/*
--EXAMPLE
var expect = chai.expect;
describe('Test de suma', function(){
    it('resultado positivo', function(){
            var resultado = suma(2,3);
            expect(resultado).to.be.above(0);
    })
    it('resultado negativo', function(){
            var resultado = suma(-1,-3);
            expect(0).to.be.above(resultado);
    })
})*/

var jquery = require('../js/jquery-3.3.1.js'),
    restaurant = require('../js/restaurant.js'),
    listado = require('../js/listado.js'),
    aplicacion = require('../js/aplicacion.js'),
    chai = require('chai'),
    assert = chai.assert;

// Objeto de TEST
var pizzaTest = new Restaurant(25, "Resting", "Asiática", "Testland", ["13:00", "15:30", "18:00","19:00","22:30"], "../img/pizza4.jpg", [6, 7, 9, 10, 5]);

describe('Test función reservarHorario(horario)', function(){

    it('Cuando se reserva un horario, el horario correspondiente se elimina del arreglo.', function(){
        var horariosAnterior = pizzaTest.horarios;
        pizzaTest.reservarHorario("13:00");
        assert(horariosAnterior).equals(pizzaTest.horarios);
    })

    it('Cuando se reserva un horario que no posee, el arreglo se mantiene igual.', function(){

    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro, el arreglo se mantiene igual.', function(){

    })
})

describe('Test función obtenerPuntuación()', function(){

    it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.', function(){


    })

    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function(){


    })
})

describe('Test función calificar()', function(){

    it('Dada una calificación mayor a la establecida que suba el promedio.', function(){

    })

    it('Dada una calificación menor a la establecida que baje el promedio.', function(){


    })

    it('Dada la calificación 10, que suba el promedio', function(){


    })

    it('Que el promedio no exceda el 10', function(){


    })

    it('Que el promedio no sea menor que 0', function(){


    })
})

describe('Test función buscarRestaurante(id)', function(){

    it('Dado un ID real, que devuelva el restaurant correcto.', function(){


    })

    it('Dado un ID inexistente, que no devuelva ningun restaurant', function(){


    })

    it('Dado un valor no válido, que no devuelva ningun restaurant', function(){


    })
})

describe('Test función obtenerRestaurantes()', function(){

    it('Dado un ID real, que devuelva el restaurant correcto con todos sus propiedades.', function(){


    })

    it('Dado un ID inexistente, que no devuelva ningun restaurant', function(){


    })


    it('Dado un valor no válido, que no devuelva ningun restaurant', function(){


    })
})
