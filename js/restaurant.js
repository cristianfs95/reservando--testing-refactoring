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
    /*for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios.splice(i, 1);
            return;
        }
    }*/ // BLOQUE FACTORIZADO.
    this.horarios =  this.horarios.filter(function(horario) {
        return horario !== horarioReservado;
    });// FACTORIZACIÓN.
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

function sum(array){
    var sum = 0;
    for(var i in array) { sum += array[i]; }
    return sum;
}

function average(array) {
    avg = (sum(array) / array.length);
    return Math.round(avg * 10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        /*var sumatoria = 0;
        for (var i = 0; i < this.calificaciones.length; i++) {
            sumatoria += this.calificaciones[i]
        }
        var promedio = sumatoria / this.calificaciones.length;
        return Math.round(promedio * 10) / 10;*/ // BLOQUE FACTORIZADO.
        return average(this.calificaciones); // FACTORIZACIÓN.
    }
}

