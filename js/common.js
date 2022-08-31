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

    /*
    ~ - binary NOT, also used for fast rounding
    (w/2-coorX) - symmetricity
    (80/w) - we need to decrease the symmetricity subtraction depending on element width/height
    /10 - we use degrees so we need one decimals
    */
    let posX = ~((w / 2 - coorX) * (80 / w)) / 10;
    let posY = ~~((h / 2 - coorY) * (80 / h)) / 10;

    // used for transition on mouse leave
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