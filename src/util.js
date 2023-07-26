function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function formatId(x){
    return x.replace(/\s/g, "-").replace(/[()]/g, "");
}