$(document).ready(function() {
    var prizes = [
        500,
        1000,
        2000,
        3000,
        5000,
        10000,
        15000,
        25000,
        50000,
        100000,
        200000,
        400000,
        800000,
        1500000,
        3000000
    ];
    for(var round; round < 15; round++) {
        // тельце раунда
    }
});

function displayQuestion(qst) {
    $("#question").child("p").text(qst.text);
    for(var ans of qst.answers) {
        $("#answer" + ans.index).text(ans.text);
    }
}