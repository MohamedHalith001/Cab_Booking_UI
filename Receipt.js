print();
/**
 * Prints the receipt with all saved details
 */
function print() {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    document.getElementById("pickup").innerHTML = data.pickup;
    document.getElementById("destination").innerHTML = data.destination;
    document.getElementById("journeyDate").innerHTML = data.journeyDate;
    document.getElementById("journeyTime").innerHTML = data.journeyTime;
    document.getElementById("senior").innerHTML = data.seniorCitizen;
    document.getElementById("cost").innerHTML = data.total;
    document.getElementById("type").innerHTML = data.cab;
}