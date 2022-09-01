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

  function renderStars(amount = 30) {
    const container = document.getElementById("container");
    const placeholdersArray = Array(amount).fill("star_placeholder");
    const starsArray = placeholdersArray.map((starPlacholder, index) =>
      createStar()
    );
    container.append(...starsArray);
  }

  renderStars();

  // card effect
  let cards = document.getElementsByClassName('rotate3D');
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

  if (window.innerWidth >= 768) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("mousemove", renderRotate);
      cards[i].addEventListener("mouseleave", clearRotate);
    }
  }

  // background parallax
  const pg1 = document.querySelectorAll('.pg-1');
  const pg2 = document.querySelectorAll('.pg-2');
  const pg3 = document.querySelectorAll('.pg-3');
  const pg4 = document.querySelectorAll('.pg-4');
  const pg5 = document.querySelectorAll('.pg-5');
  const pg6 = document.querySelectorAll('.bg_pattern');
  function bgParallax() {
    let scroll = -window.scrollY;
    pg1.forEach((el) => {
      el.style.transform = `translateY(${scroll / 50}rem)`
    })
    pg2.forEach((el) => {
      el.style.transform = `translateY(${scroll / 90}rem)`
    })
    pg3.forEach((el) => {
      el.style.transform = `translateY(${scroll / 110}rem)`
    })
    pg4.forEach((el) => {
      el.style.transform = `translateY(${scroll / 200}rem)`
    })
    pg5.forEach((el) => {
      el.style.transform = `translateY(${scroll / 210}rem)`
    })
    pg6.forEach((el) => {
      el.style.transform = `translateY(${scroll / -20}rem)`
    })
  }

  window.addEventListener('scroll', bgParallax)
