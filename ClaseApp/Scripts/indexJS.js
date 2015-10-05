if (localStorage.getItem("nombre")) {
    location.replace("panel.html");
}

$(document).ready(function () {
    function login() {
        var n = $("#nombre").val();

        if (n === "") {
            alert("No puede estar vacío");
            return;
        }

        localStorage.setItem("nombre", n);
        location.replace("panel.html");
    }

    $("#btnEntrar").on("click", login);
})