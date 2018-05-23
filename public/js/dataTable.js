$(document).ready(function () {
    $("#listado #checkall").click(function () {
        if ($("#listado #checkall").is(':checked')) {
            $("#listado input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#listado input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $("[data-toggle=tooltip]").tooltip();
});