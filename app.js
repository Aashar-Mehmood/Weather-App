
const yourKey = 'paste_Your_Key_Here';

const IMAGES = ["images/clouds.jpg", "images/snowfall.jpg", "images/sunshine.jpg"];
const CHOICE = document.getElementById('choice');
const mainSec = document.getElementById('mainSec');
const cityCountryName = document.getElementById('area');
const resultButton = document.getElementById('Results');
const cityResultButton = document.getElementById('cityResults');


const lon = document.getElementById('lon');
const lat = document.getElementById('lat');
const temp = document.getElementById('temp');
const min = document.getElementById('min');
const max = document.getElementById('max');


resultButton.addEventListener('click', ()=>{
  if(cityCountryName.value == '' || cityCountryName.value == null)
    alert('Enter City Or Country Name to Search');
  else{
    getWeatherInfo(cityCountryName.value).catch((err)=>alert(err));
  }
});

cityResultButton.addEventListener('click', ()=>{
  var selectedCity = CHOICE.children[CHOICE.selectedIndex].value;
  getWeatherInfo(selectedCity);
});

async function getWeatherInfo(location){
  var ApiLink = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric&appid="+yourKey;
  const response = await fetch(ApiLink);
  const data = await response.json();
  lon.textContent = data.coord.lon;
  lat.textContent = data.coord.lat;
  temp.textContent = data.main.temp + ' ° ';
  min.textContent = data.main.temp_min +' ° ';
  max.textContent = data.main.temp_max + ' °';  
  var intTemp = parseInt(data.main.temp);
  mainSec.children[0].style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  if(intTemp>=30){
    mainSec.style.background = `url('${IMAGES[2]}')`;
  }
  else if(intTemp<=10){
    mainSec.style.background = `url('${IMAGES[1]}')`;
  }
  else {
    mainSec.style.background = `url('${IMAGES[0]}')`;
  }
  mainSec.style.backgroundRepeat = 'no-repeat';
  mainSec.style.backgroundSize = 'cover';
}
