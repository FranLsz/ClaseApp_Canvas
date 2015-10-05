if (!localStorage.getItem("nombre")) {
    location.replace("index.html");
}

var nombre = localStorage.getItem("nombre");

var url = "https://alumnoscurso.azure-mobile.net/Tables/Clase15";

$(document).ready(function () {

    function salir() {
        localStorage.removeItem("nombre");
        location.replace("index.html");
    }

    function crear() {

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





    function pintarCanvas(res) {

        var canvas = document.getElementById("canvasClase");
        var ctx = canvas.getContext("2d");


        for (var i = 0; i < res.length; i++) {
            ctx.fillStyle = res[i].color;
            ctx.fillRect(res[i].x, res[i].y, res[i].w, res[i].h);
            ctx.stroke();
        }

    }


    function obtenerMesas() {
        var auxUrl = url + "?$filter=nombre eq '" + nombre + "'";

        $.get(auxUrl, pintarCanvas);

    }

    obtenerMesas();
    $("#btnSalir").on("click", salir);
    $("#btnCrear").on("click", crear);

    $("#btnRecargar").on("click", obtenerMesas);

});
