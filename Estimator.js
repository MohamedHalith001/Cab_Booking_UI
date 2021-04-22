setminDate();

//TO prevent entering past date
function setminDate() {
    let today = new Date().toJSON().substr(0,10);
    document.getElementById("date").setAttribute("min", today);
}

//Gets all details about journey
function journeyDetails() {
    event.preventDefault();
    let km = document.querySelector("#km").value;
    let cab = document.querySelector("#services").value;
    let senior = document.getElementById("srcitizen").checked;
    console.log(senior);
    let span = document.getElementById("price");
    let tax = document.getElementById("gst");
    let cost = document.getElementById("total");
    let contbtn = document.getElementById("continuebtn");
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let pickup = document.getElementById("startLocation").value;
    let destination = document.getElementById("destination").value;
    //Calling isPeakHour function
    let peakHour = isPeakHour(time);
    //Calling calculate function
    let price = calculate(cab,km,senior,peakHour);
    //For printing in the Receipt
    if(senior){
        senior="Yes";
    }else{
        senior = "No";
    }
    
    var tags = document.querySelectorAll("p");
    for(let i=0;i<tags.length;i++){
        tags[i].style.visibility="VISIBLE";
    }
    contbtn.style.visibility = "visible";

    span.innerHTML = price;
    let gst = (7 * price) / 100;
    tax.innerHTML = (gst);
    gst = Math.ceil(gst);
    let total = price + gst;
    cost.innerHTML = (total);
    //Calling saveDetails function 
    saveDetails(total,km,cab,senior,pickup,destination,date,time);
    //Function for redirecting to next page
    contbtn.addEventListener('click', function () {
        window.location.replace('Receipt.html');
    });
};
//Checking for peak hour
function isPeakHour(time) {
    let hour = parseInt(time.substr(0, 2));
    // checks whether booked time is between 5:00 PM (17:00) to 7:00 PM (19:00)
    if (hour >= 17 && hour <= 19) {
        return true;
    }
}

//Calculates fareprice
function calculate(cab,km,senior,peakHour) {
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
    //if senior citizen price is 50% discount applied
    if (senior) {
        price /= 2;
    }
    return price;
}

//Storing necessery information on localstorage
function saveDetails(total,km,cab,senior,pickup,destination,date,time) {
    let obj = {
        "km": km,
        "cab":cab,
        "total":total,
        "senior":senior,
        "pickup":pickup,
        "destination":destination,
        "date":date,
        "time":time
    };
    localStorage.setItem("data", JSON.stringify(obj));
}