$(document).ready(function () {
    $('#listado').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No existe información",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No existe información",
            "infoFiltered": "(De un total de _MAX_ registros)"
        }
    });
});