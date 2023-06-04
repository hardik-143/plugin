function thetooltip(elements) {
  let doc = document;
  // let elements = this;

  const createTooltip = (ele, ttooltipIndex) => {
    // default properties of tooltip
    let dO = {
      pos: ele.getAttribute("data-ttooltip-pos") || "bottom",
      content: ele.getAttribute("data-ttooltip-text"),
      size: ele.getAttribute("data-ttooltip-size"),
      visible: ele.hasAttribute("data-ttooltip-visible"),
      blunt: ele.hasAttribute("data-ttooltip-blunt"),
    };
    // default properties of tooltip

    let ttooltip = document.createElement("div"); // create tooltip
    document.body.appendChild(ttooltip); // append tooltip to body
    ttooltip.classList.add("hide"); // hide tooltip as default
    let position = {
      top: 0,
      left: 0,
    }; // default position of tooltip

    ttooltip.classList.add(
      `ttooltip`,
      `ttooltip-${ttooltipIndex}`,
      `ttooltip-${dO.size}`
    );
    ttooltip.innerHTML = dO.content;

    // set position of tooltip
    let elePos = ele.getBoundingClientRect();
    let eleTop = elePos.top;
    let eleLeft = elePos.left;
    let eleWidth = ele.offsetWidth;
    let eleHeight = ele.offsetHeight;
    let ttooltipWidth = ttooltip.offsetWidth;
    let ttooltipHeight = ttooltip.offsetHeight;

    if (dO.pos === "top") {
      position.top = eleTop - ttooltipHeight - 10;
      position.left = eleLeft + eleWidth / 2 - ttooltipWidth / 2;
    } else if (dO.pos === "bottom") {
      position.top = eleTop + eleHeight + 10;
      position.left = eleLeft + eleWidth / 2 - ttooltipWidth / 2;
    } else if (dO.pos === "left") {
      position.top = eleTop + eleHeight / 2 - ttooltipHeight / 2;
      position.left = eleLeft - ttooltipWidth - 10;
    } else if (dO.pos === "right") {
      position.top = eleTop + eleHeight / 2 - ttooltipHeight / 2;
      position.left = eleLeft + eleWidth + 10;
    } else if (dO.pos === "top-left") {
      position.top = eleTop - ttooltipHeight - 10;
      position.left = eleLeft;
    } else if (dO.pos === "top-right") {
      position.top = eleTop - ttooltipHeight - 10;
      position.left = eleLeft + eleWidth - ttooltipWidth;
    } else if (dO.pos === "bottom-right") {
      position.top = eleTop + eleHeight + 10;
      position.left = eleLeft + eleWidth - ttooltipWidth;
    } else if (dO.pos === "bottom-left") {
      position.top = eleTop + eleHeight + 10;
      position.left = eleLeft;
    }
    // set position of tooltip

    // ttooltip.css(position); // set position of tooltip
    ttooltip.style = `top: ${position.top}px; left: ${position.left}px;`; // set position of tooltip

    if (dO.size == "fit") {
      // if size is fit then set width of tooltip to width of element & set left position of tooltip to left position of element
      ttooltip.style.width = `${eleWidth}px`;
      ttooltip.style.left = `${eleLeft}px`;
    }
    let clsPosition = `ttooltip-${dO.pos}`;
    ttooltip.classList.add("ttooltip-opening", clsPosition);
    if (dO.blunt) ttooltip.classList.add("ttooltip-blunt");
    if (dO.visible) ttooltip.classList.add("ttooltip-always-visible");

    // set animation of tooltip
    setTimeout(() => {
      ttooltip.style.transform = "scale(1)";
      ttooltip.classList.remove("hide", "ttooltip-opening");
    }, 200);
  };
  const removeTooltip = (i) => {
    let ttooltip = doc.querySelector(`.ttooltip-${i}`);
    if (ttooltip.classList.contains("ttooltip-blunt")) {
      ttooltip.parentNode.removeChild(ttooltip);
    } else {
      ttooltip.classList.add("ttooltip-close");
      setTimeout(() => {
        ttooltip.parentNode.removeChild(ttooltip);
      }, 200);
    }
  };
  setTimeout(() => {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.hasAttribute("data-ttooltip-visible")) {
        createTooltip(element, i);
      } else {
        if (element.getAttribute("data-ttooltip-toggle") == "click") {
          element.addEventListener("click", function () {
            if (doc.querySelector(`.ttooltip-${i}`)) {
              removeTooltip(i);
            } else {
              createTooltip(element, i);
            }
          });
        } else {
          element.addEventListener("mouseenter", function () {
            createTooltip(element, i);
          });
          element.addEventListener("mouseleave", function () {
            removeTooltip(i);
          });
        }
      }
    }
  }, 30);
}
document.addEventListener("DOMContentLoaded", function () {
  let elements = document.querySelectorAll("[data-ttooltip]");
  thetooltip(elements);
});
