print();
/**
 * Prints all the saved details
 */
function print() {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    document.getElementById("pickup").innerHTML = data.pickup;
    document.getElementById("destination").innerHTML = data.destination;
    document.getElementById("travelDate").innerHTML = data.travelDate;
    document.getElementById("travelTime").innerHTML = data.travelTime;
    document.getElementById("seniorCitizen").innerHTML = data.seniorCitizen;
    document.getElementById("cost").innerHTML = data.total;
    document.getElementById("type").innerHTML = data.cab;
}