const d = new Date();
dayNumber = d.getDate();
month = d.getMonth() + 1;
year = d.getFullYear();

const salawat = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const days = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

document.getElementById("day").innerHTML += days[d.getDay()];
document.getElementById("miladiDate").innerHTML = d.toLocaleDateString("ar-US");
document.getElementById("hijriDate").innerHTML = d.toLocaleDateString("ar-SA");

let a = (aa) => {
  let toogle = document.getElementById(`kabs${aa}`).innerHTML;
  if (toogle == "D") {
    document.getElementById(aa).style.justifyContent = "flex-start";
    document.getElementById(`kabs${aa}`).innerHTML = "L";
    document.body.style.background = "black";
  } else if ((toogle = "L")) {
    document.getElementById(aa).style.justifyContent = "flex-end";
    document.getElementById(`kabs${aa}`).innerHTML = "D";
    document.body.style.background = "white";
  }
};

let counter = 6;
let choose = (ch) => {
  if (ch.id == counter) {
    document.getElementById("ul").style.display = "block";
    ch.id = counter++;
  } else {
    document.getElementById("ul").style.display = "none";
    ch.id = counter;
  }
};

let selectCity = (li, cityName) => {  
  document.getElementById("right").innerHTML =
    "مواقيت الصلاة في " + cityName.innerHTML;
  for (let i = 0; i < 6; i++) {
    document.getElementById(i).innerHTML = "انتظر قليلا...";
  }
  const url = `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${li}&country=Syria&method=1`;
  axios
    .get(url)
    .then((response) => {
      for (let i = 0; i < 6; i++) {
        document.getElementById(i).innerHTML =
          response.data.data[dayNumber].timings[salawat[i]].split(" ")[0];
      }
    })
    .catch(() => {
      alert("حدث خطأ, حاول مرة أخرى");
    });
};

document.getElementById("adress").addEventListener("click", () => {
  return new Promise((resolve) => {
    axios.get("http://ip-api.com/json").then((response) => {
      document.getElementById("topTitle").innerHTML =
        "مواقيت الصلاة في " + response.data.country;
      document.getElementById("right").innerHTML =
        "مواقيت الصلاة في " + response.data.city;
      for (let i = 0; i < 6; i++) {
        document.getElementById(i).innerHTML = "انتظر قليلا...";
      }
      resolve({ country: response.data.country, city: response.data.city });
    });
  }).then(({ country, city }) => {
    const url = `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}&method=1`;
    axios
      .get(url)
      .then((response) => {
        for (let i = 0; i < 6; i++) {
          document.getElementById(i).innerHTML =
            response.data.data[dayNumber].timings[salawat[i]].split(" ")[0];
        }
      })
      .catch(() => {
        alert("حدث خطأ, حاول مرة أخرى");
      });
  });
});
