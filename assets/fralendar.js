// listener event for buttons 
$(".btn").on("click", function () {
    var value = $(this).val();
    console.log(value)
    // changes value on button to "1" signifying they are available
    if (value === "0" || value === "2") {
        $(this).val("1")
        $(this).removeClass("btn-danger")
        $(this).addClass("btn-success");
        console.log(value)
    }
    // changes value on button to "2" signifying they are unavailables
    if (value === "1") {
        $(this).val("2")
        $(this).removeClass("btn-success")
        $(this).addClass("btn-danger")
        console.log(value)
    }

})