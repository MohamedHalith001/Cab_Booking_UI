setminDate();

/**
 * To prevent user from entering past date
 */
function setminDate() {
    let today = new Date().toJSON().substr(0,10);
    document.getElementById("travelDate").setAttribute("min", today);
}

/**
 * Gets all details about journey
 */
function journeyDetails() {
    event.preventDefault();
    let km = document.querySelector("#km").value;
    let cab = document.querySelector("#services").value;
    let seniorCitizen = document.getElementById("seniorCitizen").checked;
    let span = document.getElementById("price");
    let tax = document.getElementById("gst");
    let cost = document.getElementById("total");
    let continuebtn = document.getElementById("continuebtn");
    let travelDate = document.getElementById("travelDate").value;
    let travelTime = document.getElementById("travelTime").value;
    let pickup = document.getElementById("startLocation").value;
    let destination = document.getElementById("destination").value;
    //Calling isPeakHour function
    let peakHour = isPeakHour(travelTime);
    //Calling calculate function
    let price = calculate(cab,km,seniorCitizen,peakHour);
    //For printing in the Receipt
    if(seniorCitizen){
        seniorCitizen="Yes";
    }else{
        seniorCitizen = "No";
    }
    
    var tags = document.querySelectorAll("p");
    for(let i=0;i<tags.length;i++){
        tags[i].style.visibility="VISIBLE";
    }
    continuebtn.style.visibility = "visible";

    span.innerHTML = price;
    let gst = (7 * price) / 100;
    tax.innerHTML = (gst);
    gst = Math.ceil(gst);
    let total = price + gst;
    cost.innerHTML = (total);
    //Calling saveDetails function 
    saveDetails(total,km,cab,seniorCitizen,pickup,destination,travelDate,travelTime);
    //Function for redirecting to next page
    contbtn.addEventListener('click', function () {
        window.location.replace('Receipt.html');
    });
};
//Checking for peak hour
function isPeakHour(travelTime) {
    let hour = parseInt(travelTime.substr(0, 2));
    // checks whether booked time is between 5:00 PM (17:00) to 7:00 PM (19:00)
    if (hour >= 17 && hour <= 19) {
        return true;
    }
}

/**
 * Calulates fare price
 * @param {String} cab 
 * @param {String} km 
 * @param {boolean} senior 
 * @param {boolean} peakHour 
 */
function calculate(cab,km,seniorCitizen,peakHour) {
    let price;
    let pricePerKm;
    switch (cab) {
        case "Micro":
            pricePerKm = 10;
            break;
        case "Mini":
            pricePerKm =  15;
            break;
        case "Prime":
            pricePerKm = 20;
            break;
    }
    price = pricePerKm * km;
    //If booked time is peakhour additional 1.25% charge is added
    if (peakHour) {
        price += ((price * 1.25) / 100);
        document.getElementById("peakHour").innerHTML = "Yes (1.25% Extra Charges are applied)";
    } else {
        document.getElementById("peakHour").innerHTML = "No";
    }
    //if senior citizen 50% discount is applied
    if (seniorCitizen) {
        price /= 2;
    }
    return price;
}

/**
 * Saves all necessary Details
 * @param {String} total 
 * @param {String} km 
 * @param {String} cab 
 * @param {boolean} seniorCitizen
 * @param {String} pickup 
 * @param {String} destination 
 * @param {String} traveldate 
 * @param {String} travelTime 
 */
function saveDetails(total,km,cab,seniorCitizen,pickup,destination,travelDate,travelTime) {
    let obj = {
        "km": km,
        "cab":cab,
        "total":total,
        "seniorCitizen":seniorCitizen,
        "pickup":pickup,
        "destination":destination,
        "travelDate":travelDate,
        "travelTime":travelTime
    };
    localStorage.setItem("data", JSON.stringify(obj));
}