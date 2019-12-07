var common = window.common || {};
common.fn = common.fn || {};


Date.prototype.formatoFecha = function(valor) {
    var monthNames = new Array("NaN", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var daysNames = new Array("Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday");
    let dia = this.getDate();
    let fecha = this.getDay();
    let mes = this.getMonth() + 1;
    let anio = this.getFullYear();

    if (valor == 1) {
        return (dia < 10 ? '0' + dia : dia) + "/" + (mes < 10 ? '0' + mes : mes) + "/" + anio;
    } else if (valor == 2) {
        return anio + "/" + (mes < 10 ? '0' + mes : mes) + "/" + (dia < 10 ? '0' + dia : dia);
    } else if (valor == 3) {
        return anio + "/" + (dia < 10 ? '0' + dia : dia) + "/" + (mes < 10 ? '0' + mes : mes);
    } else if (valor == 4) {
        return (mes < 10 ? '0' + mes : mes) + "/" + (dia < 10 ? '0' + dia : dia) + "/" + anio;
    } else if (valor == 6) {
        return anio + "-" + (mes < 10 ? '0' + mes : mes) + "-" + (dia < 10 ? '0' + dia : dia);
    } else if (valor == 7) {
        return "<div>" + (daysNames[fecha]) + "</div><div class='daysnames'>" + (dia < 10 ? '0' + dia : dia) + " " + (monthNames[mes]) + ".</div>";
    } else if (valor == 8) {
        return " " + (daysNames[fecha]) + " " + (dia < 10 ? '0' + dia : dia) + " " + (monthNames[mes]) + " " + anio;

    } else {
        // let x = new Date("20"+partes[0].replace(/\//g, '-'));
        let opciones_fecha = { year: 'numeric', month: 'short', day: 'numeric' }
        let fecha = this.toLocaleDateString('en-EN', opciones_fecha);

        return getWeekDay(this) + " " + fecha;
    }
}

Array.prototype.shuffle = function() {
    var i = this.length,
        j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

function getWeekDay(date) {
    let days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

    return days[date.getDay()];
}

Array.prototype.unique = function(a) {
    return function() { return this.filter(a) }
}(function(a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

common.fn.duplicarObjetos = function(o, flag) {
    return jQuery.extend(true, (flag ? [] : {}), o);
};
common.fn.toDraw = function(str, objOriginal) {
    str = str.replace(/{[^{}]+}/g, function(key) {
        var temp = "";
        if (key.indexOf(".") < 0) {
            temp = objOriginal[key.replace(/[{}]+/g, "")] || "";
        } else {
            var keyArray = (key.replace(/[{}]+/g, "")).split(".");
            var obj2 = objOriginal;
            for (var i = 0; i < keyArray.length; i++) {
                if (obj2 && obj2.hasOwnProperty(keyArray[i])) {
                    if (i == (keyArray.length - 1)) {
                        temp = obj2[keyArray[i]] || "";
                    } else {
                        obj2 = obj2[keyArray[i]];
                    }

                } else {
                    break;
                }
            }

        }
        return temp;
    });
    return str;
};