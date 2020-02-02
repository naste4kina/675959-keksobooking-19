'use strict';

//  константы
var TITLES = ['большой дворец', 'маленький дворец', 'большая квартира', 'маленькая квартира', 'большой дом', 'маленький дом', 'большое бунгало', 'маленькое бунгало'];
var PRICE_MIN = 100;
var PRICE_MAX = 100000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 8;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;

//  массив из исходного
var shuffleArray = function (array) {
  var newArray = [];
  var tempArray = array.slice();
  var arrayCount = length ? length - 1 : tempArray.length - 1;
  for (var i = 0; i <= arrayCount; i++) {
    var randomId = getRandomIntInclusive(0, tempArray.length - 1);
    newArray.push(tempArray[randomId]); //  записываем
    tempArray.splice(randomId, 1); // удаляем временный
  }
  return newArray;
};

//  случайное число min-max
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//  случайный элемент
var getRandomArrayElement = function (array) {
  var id = Math.floor(Math.random() * array.length);
  var element = array[id];
  return element;
};

// cоздаем объявление
var generateRandomAd = function () {
  var advert = {};

  advert.author = {
    avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png'
  };

  advert.offer = {
    title: getRandomArrayElement(TITLES),
    address: location.x + ', ' + location.y,
    price: getRandomIntInclusive(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomIntInclusive(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: shuffleArray(FEATURES, getRandomIntInclusive(0, FEATURES.length)),
    description: '',
    photos : shuffleArray(PHOTOS),
  };


  advert.location = {
    x: getRandomIntInclusive(LOCATION_X_MIN, LOCATION_X_MAX),
    y: getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX)
  };

  return advert;
};


//  создаем массив
var generateAdArray = function (amount) {
  var array = [];
  for (var i = 0; i < amount; i++) {
    var advert = generateRandomAd();
    array.push(advert);
  }
  return array;
};

var pinsTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var renderAdPin = function (advert) {
  var element = pinsTemplate.cloneNode(true);
  element.style.left = advert.location.x + 'px';
  element.style.top = advert.location.y + 'px';
  var pinImg = element.querySelector('img');
  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;
  return element;
};
var renderAdPins = function () {
  var pinList = generateAdArray(8);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinList.length; i++) {
    var element = renderAdPin(pinList[i]);
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
  document.querySelector('.map__pins').appendChild(fragment);
};

//  показываем карту
document.querySelector('.map').classList.remove('map--faded');

// наносим точки
renderAdPins();
