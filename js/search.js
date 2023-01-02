function showResult(str) {
    if (str.length == 0) {
        document.getElementById('livesearch').innerHTML = '';
        return;
    }
    console.log(str); // Trả về dữ liệu nhập vào

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('livesearch').innerHTML = this.responseText;
        }
    };

    xmlhttp.open('GET', './php/live_search.php?txtmemo=' + str, true);
    xmlhttp.send();
}
