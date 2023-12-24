/**
* Template Name: Logis
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


/*我寫的*/

function new_rating(rating, emotion_classification) {

  console.log("rating is " + rating)

  let diration;
  if (emotion_classification == "positive") {
    diration = 1;
  } else if (emotion_classification == "negative") {
    diration = -1;
  } else {
    return rating;
  }

  let penalty;
  if (rating == 1 || rating == 2) {
    console.log("enter 1")
    penalty = 2;
  } else if (rating == 3) {
    console.log("enter 2")
    penalty = 1;
  } else if (rating == 4 || rating == 5) {
    console.log("enter 3")
    penalty = -2;
  }

  // console.log("parseInt(diration)*parseInt(penalty) = " + parseInt(diration) + "*" + parseInt(penalty))

  let discriminant = parseInt(diration) * parseInt(penalty);
  // console.log('dis is ' + discriminant)

  discriminant = parseInt(discriminant)
  let newRating;
  if (discriminant == -2) {
    console.log("enter 4")
    newRating = rating;
  } else if (discriminant == 2) {
    console.log("enter 5")
    newRating = parseInt(rating) + parseInt(penalty);
  } else if (discriminant == 1 || discriminant == -1) {
    console.log("enter 6")
    newRating = parseInt(rating) + parseInt(diration);
  }

  // console.log("new rating is " + newRating)

  return newRating;
}

function transfer_json(json) {

  let r_json = {};
  r_json[`user_name`] = "<strong>" + json[`user_name`] + "</strong>";
  emotion_classification = json[`emotion_classification`]
  if (emotion_classification = "positive") {
    r_json[`emotion_classification`] = "&#128512";
  } else if (emotion_classification = "negative") {
    r_json[`emotion_classification`] = "&#128545";
  }

  const newRating = new_rating(json[`rating`], emotion_classification);
  let total_star = "";
  for (let ind = 0; ind < newRating; ind++) {
    total_star += "&#11088";
  }
  r_json[`rating`] = total_star;

  r_json[`comment`] = json[`comment`];

  return r_json;
}

function assign_review(json, ind_review) {
  let total_component = [
    `user_name`,
    `emotion_classification`,
    `rating`,
    `comment`,
  ];

  const modified_json = transfer_json(json);

  let identify_prefix = `user_${ind_review}-`;
  for (let ind_component = 0; ind_component < 4; ind_component++) {
    let component = total_component[ind_component]
    let identify = identify_prefix + component
    console.log(`${component} = ${modified_json[component]}`);
    const block = document.getElementById(identify);
    block.innerHTML = modified_json[component];
  }
  console.log('\n');
}

const clickButton = document.getElementById('button');
clickButton.addEventListener('click', function () {
  const messageInput = document.getElementById("input");
  const messageText = messageInput.value;

  if (messageText.trim() !== "") {

    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    let body = {
      "url": messageText
    }

    fetch("http://140.120.182.90:11144/analyze", {
      headers: headers,
      method: "post",
      body: JSON.stringify(body)
    })
      .then((res) => {

        data = res.json();
        // console.log("data is ");
        // console.log(res);
        return data;

      }).then((data) => {
        data = data.comment;
        // console.log(data);
        for (let ind_review = 0; ind_review < 12; ind_review++) {
          assign_review(data[ind_review], ind_review);
        }

        const total_rating = data.map(json => json.rating);
        const modified_rating = data.map(json => new_rating(json[`rating`], json[`emotion_classification`]));
        const num_rating = total_rating.length

        console.log(`num_rating = ${num_rating}`);

        let Google_rating = total_rating.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        Google_rating = Google_rating / parseFloat(num_rating);
        Google_rating = Google_rating.toFixed(1);
        const GOOGLE_rating = document.getElementById("GOOGLE_rating");
        GOOGLE_rating.innerHTML = Google_rating.toString();
        const GOOGLE_name = document.getElementById("GOOGLE_name");
        GOOGLE_name.innerHTML = "Google Rating";

        // let total_New_rating = total_rating.forEach(new_rating);
        console.log(`modified_rating = ${modified_rating}`);
        let New_rating = modified_rating.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        New_rating = New_rating / parseFloat(num_rating);
        New_rating = New_rating.toFixed(1);
        const NEW_rating = document.getElementById("NEW_rating");
        NEW_rating.innerHTML = New_rating;
        const NEW_name = document.getElementById("NEW_name");
        NEW_name.innerHTML = "New Rating";

        const ratingArea = document.getElementById("rating_area");
        ratingArea.classList.remove('d-none');

        const reviewArea = document.getElementById("horizontal-pricing");
        reviewArea.classList.remove('d-none');
      });
  }
})
