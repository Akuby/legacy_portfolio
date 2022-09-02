  // background star effect
  function generateRandomPercent(min = 0, max = 100) {
    const randomInteger = Math.floor(Math.random() * (max + 1));
    return `${randomInteger}%`;
  }

  function generateRadomDelay(interval = 5) {
    const randomInteger = Math.random() * (interval + 1);
    return `${randomInteger}s`;
  }

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = generateRandomPercent();
    star.style.left = generateRandomPercent();
    star.style.animationDelay = generateRadomDelay();
    return star;
  }

  function renderStars(amount = 40) {
    const container = document.getElementById("container");
    const placeholdersArray = Array(amount).fill("star_placeholder");
    const starsArray = placeholdersArray.map((starPlacholder, index) =>
      createStar()
    );
    container.append(...starsArray);
  }

  renderStars();

  // card effect
  let cards = document.querySelectorAll('.rotate3D');
  let renderRotate, clearRotate;

  const shadowBlur = 20,
    shadowSpread = 2,
    shadowXOffset = 0,
    shadowYOffset = 0;

  renderRotate = function (event) {
    let contentEl = this.children[0];
    let coorX = event.offsetX;
    let coorY = event.offsetY;
    let w = this.offsetWidth;
    let h = this.offsetHeight;

    let posX = ~((w / 2 - coorX) * (80 / w)) / 10;
    let posY = ~~((h / 2 - coorY) * (80 / h)) / 10;

    if (this.children[0].classList.contains("onLeave")) {
      contentEl.classList.remove("onLeave");
    }

    contentEl.style.transform = "rotateX(" + posY + "deg) rotateY(" + posX + "deg)";
    contentEl.style.boxShadow = (-2 * posX + shadowXOffset) + "px" + " " + (2 * posY + shadowYOffset) + "px " + shadowBlur + "px " + shadowSpread + "px" + " rgba(0, 0, 0, 0.5)";

  };

  clearRotate = function () {
    let contentEl = this.children[0];
    contentEl.style.transform = "none";
    contentEl.style.boxShadow = shadowXOffset + "px " + shadowYOffset + "px " + shadowBlur + "px " + shadowSpread + "px";
    contentEl.classList.add("onLeave");

  };

  // background parallax
  const bgPlanet1 = document.querySelectorAll('.planet--1');
  const bgPlanet2 = document.querySelectorAll('.planet--2');
  const bgPlanet3 = document.querySelectorAll('.planet--3');
  const bgStar1 = document.querySelectorAll('.star--4');
  const bgStar2 = document.querySelectorAll('.star--5');
  const bgPatternNormal = document.querySelectorAll('.pattern--nor');
  const bgPatternReverse = document.querySelectorAll('.pattern--rev');
  const ufo = document.querySelector('.title-ufo');
  const typoFlow = document.querySelectorAll('.title-flow');

  function bgParallax() {
    let scroll = -window.scrollY;

    function trans(name, scrollRatio) {
      name.forEach(el => {
        el.style.transform = 'translateY('+ (scroll / scrollRatio) +'rem)'
      })
    }
    trans(bgPlanet1, 50)
    trans(bgPlanet2, 90)
    trans(bgPlanet3, 110)
    trans(bgStar1, -30)
    trans(bgStar2, -40)
    trans(bgPatternNormal, -20)
    if (window.innerWidth >= 768) {
      typoFlow.forEach((el) => {
        el.style.transform = `translateY(${scroll / -40}rem) rotate(90deg)`
      })
    }
    
    bgPatternReverse.forEach((el) => {
      el.style.transform = `translateY(${scroll / -20}rem) scaleX(-1)`
    })
  }

  window.addEventListener('scroll', bgParallax)

  // resizing

function resize () {
  let winWidth = window.innerWidth;
  if (winWidth < 768) {
    typoFlow.forEach((el) => {
      el.style.transform = 'translateY(0rem) rotate(0deg)'
    })
    cards.forEach(el => {
      el.removeEventListener("mousemove", renderRotate);
      el.removeEventListener("mouseleave", clearRotate);
    })
  } else if (winWidth >= 768) {
    typoFlow.forEach((el) => {
      el.style.transform = `translateY(${scroll / -40}rem) rotate(90deg)`
    })
    cards.forEach(el => {
      el.addEventListener("mousemove", renderRotate);
      el.addEventListener("mouseleave", clearRotate);
    })
  }
}

resize();
window.addEventListener('resize', resize)