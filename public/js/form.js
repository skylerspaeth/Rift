// let formData = JSON.stringify($("#newSomething").serializeArray());
// // let formData = $('#newSomething').serializeJSON();
// // let formData = $("#newSomething").serializeArray();
// // console.log("form data:" + formData);
// let submitHandler = (e) => {
//     e.preventDefault();
//     console.log("bp1");
//     console.log(formData);
//     $.ajax({
//         type: "POST",
//         url: "/submit?type=newRift",
//         data: formData,
//         success: function () {
//             console.log('form data posted:' + formData);
//         },
//         dataType: "json",
//         contentType: "application/json"
//     });
//     return false;
// }

function yeet() {
    console.log($('form').serializeJSON());
}