if (!localStorage.getItem("nombre")) {
    location.replace("index.html");
}

var nombre = localStorage.getItem("nombre");

var url = "https://alumnoscurso.azure-mobile.net/Tables/Clase15";

function logout() {
    localStorage.removeItem("nombre");
    location.replace("index.html");
}

$(document).ready(function () {
    function add() {
        var mesa = {
            nombre: nombre,
            x: $("#x").val(),
            y: $("#y").val(),
            w: $("#w").val(),
            h: $("#h").val(),
            color: $("#color").val()
        };

        $.ajax({
            type: "POST",
            url: url,
            success: function () {
                alert("Guardado");
            },
            error: function (err) {
                console.log(err);
            },
            data: JSON.stringify(mesa),
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }



    function render(mesas) {
        var canvas = document.getElementById("canvasClase");
        var ctx = canvas.getContext("2d");
        for (var i = 0; i < mesas.length; i++) {
            ctx.fillStyle = mesas[i].color;
            ctx.fillRect(mesas[i].x, mesas[i].y, mesas[i].w, mesas[i].h);
            ctx.stroke();
        }
    }

    function refreshClase() {
        var auxUrl = url + "?$filter=nombre eq '" + nombre + "'";

        $.getJSON(auxUrl, function (res) {
            localStorage.setItem(nombre + "_cache", JSON.stringify(res));
            render(res);
        });
    }

    function manageCache() {
        if (!localStorage.getItem(nombre + "_cache")) {
            refreshClase();
        } else {
            render(JSON.parse(localStorage.getItem(nombre + "_cache")));
        }
    }

    manageCache();

    $("#btnSalir").on("click", logout);
    $("#btnCrear").on("click", add);
    $("#btnRecargar").on("click", refreshClase);

});
