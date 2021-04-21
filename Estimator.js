let cabType = document.getElementById("services");
let noOfKms = document.getElementById("km");
let calculateBtn = document.getElementById("calculatebtn");
let price = document.getElementById("price");
let contBtn = document.getElementById("continuebtn");
let senior = document.getElementById("srcitizen");
let cab, kms, pri, seniorCitizen;
function kit() {
    cab = cabType.value;
    kms = noOfKms.value;
    seniorCitizen = senior.value;
    if (cab === "Micro") {
        pri = 10 * kms;
    } else if (cab === "Mini") {
        pri = 15 * kms;
    } else {
        pri = 20 * kms;
    }
    console.log(pri);
    if (seniorCitizen == "yes") {
        price.innerHTML = pri / 2;
    } else {
        price.innerHTML = pri;
    }
    contBtn.style.visibility = "visible";
};

calculateBtn.addEventListener('click', kit);