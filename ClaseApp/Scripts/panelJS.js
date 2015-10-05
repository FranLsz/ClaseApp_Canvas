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
    var claseJson = [];
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





    function pintarCanvas(res) {

        var canvas = document.getElementById("canvasClase");
        var ctx = canvas.getContext("2d");


        for (var i = 0; i < res.length; i++) {
            ctx.fillStyle = res[i].color;
            ctx.fillRect(res[i].x, res[i].y, res[i].w, res[i].h);
            ctx.stroke();
        }

    }


    function refreshClase() {
        var auxUrl = url + "?$filter=nombre eq '" + nombre + "'";

        $.getJSON(auxUrl, function (res) {
            localStorage.setItem(nombre + "_cache", JSON.stringify(res));
            pintarCanvas(res);
        });

    }

    function manageCache() {
        if (!localStorage.getItem(nombre + "_cache")) {
            refreshClase();
        } else {
            pintarCanvas(JSON.parse(localStorage.getItem(nombre + "_cache")));
        }

    }

    manageCache();


    $("#btnSalir").on("click", logout);
    $("#btnCrear").on("click", add);

    $("#btnRecargar").on("click", refreshClase);

});
