/*var d = new Date();

var n = d.getDate(),
m = d.getMonth()+ 1,
y = d.getFullYear(),
diff = (y - 1985)%30;

y = 1985 + diff;

if(n<10) n = '0' + n;
if(m<10) m = '0' + m;

var date = y+''+m+''+n;

function getImageSource() {
    var url = "http://marcel-oehler.marcellosendos.ch/comics/ch/"
    url = url + '' + y + '/' + m + '/' + date + '.gif';
    document.getElementById('comicImage').src = url;
    document.getElementById('facebookShare').href = 
    "http://www.facebook.com/sharer/sharer.php?u=" + url;
    document.getElementById('twitterShare').href =
    href="https://twitter.com/intent/tweet?url=" + url + 
    "&amp;text=Calvin%20and%20Hobbes&amp;via=daily_extension";
}

function getDateHeading() {
    document.getElementById('comicTitle').innerHTML = "Calvin and Hobbes by Bill Watterson "+n+'-'+m+'-'+y;
}

document.addEventListener('DOMContentLoaded', function() {
    getImageSource();
    getDateHeading();
});

*/

function updateClock() {
    var now = new Date() // current date

    // set the content of the element with the ID time to the formatted string
    document.getElementById("time").innerHTML = now.toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' });
    document.getElementById("date").innerHTML = now.toLocaleDateString('en-US',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // call this function again in 1000ms
}


async function loadComic() {
    var url = 'https://xiqtmwxnhz4j3uede2ytyo3aza0thbux.lambda-url.us-east-2.on.aws/';
    //hit aws lambda to grab a comic and then return the image, since we cant get the image directly due to CORS issues
    //pick between foxtrot and calvin and hobbes comics 
    let imgBase64 = await fetch(url).then(response => response.text())
    document.getElementById("comic").src = "data:image/gif;base64," + imgBase64;
}

loadComic();
document.addEventListener('DOMContentLoaded', (event) => {
    setInterval(updateClock, 1000);
})