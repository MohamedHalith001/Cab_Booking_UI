print();
//Printing the receipt----
function print() {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    document.getElementById("pickup").innerHTML = data.pickup;
    document.getElementById("destination").innerHTML = data.destination;
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("time").innerHTML = data.time;
    document.getElementById("senior").innerHTML = data.senior;
    document.getElementById("cost").innerHTML = data.total;
    document.getElementById("type").innerHTML = data.cab;
}