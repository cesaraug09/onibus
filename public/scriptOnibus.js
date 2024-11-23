function showDetails(busNumber) {
    document.getElementById("bus-list").classList.add("hidden");
    document.getElementById("route-details").classList.remove("hidden");
}

function showList() {
    document.getElementById("route-details").classList.add("hidden");
    document.getElementById("bus-list").classList.remove("hidden");
}