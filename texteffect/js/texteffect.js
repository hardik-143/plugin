$.fn.texteffect = function (o) {
  const validElement = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6"];
  function isValidHexCode(hexCode) {
    return /^#[0-9A-F]{6}$/i.test(hexCode);
  }
  function isValidRGBCode(rgbCode) {
    return /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.test(rgbCode);
  }
  function isValidFontSizeInPx(fontSize) {
    return /^(\d{1,3})px$/i.test(fontSize);
  }
  function isValidElement(element) {
    return validElement.includes(element);
  }
  function validateMaxFontSize(fontSize, max) {
    return parseInt(fontSize.substring(0, fontSize.length - 2)) > max
      ? "50px"
      : fontSize;
  }
  function isValidColor(color) {
    return isValidHexCode(color) || isValidRGBCode(color);
  }
  function fontSizeIsInLimit(fs, limit) {
    return parseInt(fs.substring(0, fs.length - 2)) > limit;
  }
  let ele = $(this);
  let text = ele.text();

  const addConsoleWarning = (msg) => {
    console.warn(msg);
  };
  const addInDOM = (container) => {
    ele.after(container);
    ele.hide();
  };
  const createWave = (text) => {
    var dO = {
      wE: isValidElement(o.wrapperElement) ? o.wrapperElement : "div", // wrapper element
      tE: isValidElement(o.textElement) ? o.textElement : "h3", // text element
      c: isValidColor(o.color) ? o.color : "#1B9C85", // color
      fS: isValidFontSizeInPx(o.fontSize) ? o.fontSize : "40px", // font size
    };
    const h = document.createElement(dO.wE);
    $(h).addClass("wave");
    const a = document.createElement(dO.tE);
    const b = document.createElement(dO.tE);
    $(a).addClass("text").text(text).css("font-size", dO.fS);
    $(b).addClass("text").text(text).css("font-size", dO.fS);
    $(h).css("color", dO.c);
    h.append(a);
    h.append(b);
    addInDOM(h);
  };

  const createOutline = () => {
    var dO = {
      wE: isValidElement(o.wrapperElement) ? o.wrapperElement : "div", // wrapper element
      tE: isValidElement(o.textElement) ? o.textElement : "h3", // text element
      fS: isValidFontSizeInPx(o.fontSize) ? o.fontSize : "50px", // font size
      hE: o.hoverEffect ? o.hoverEffect : false, // hover effect
    };
    t = text.replace(/\S/g, "<span class='letter'>$&</span>");
    const container = $(`<${dO.wE}></${dO.wE}>`);
    $(container).addClass(`outline ${dO.hE ? "has--hover" : ""}`);
    const a = $(`<${dO.tE}></${dO.tE}>`);
    a.addClass("textWrapper")
      .css({
        "font-size": dO.fS,
      })
      .html(t);
    container.append(a);
    addInDOM(container);
  };

  const createSplit = () => {
    var dO = {
      wE: isValidElement(o.wrapperElement) ? o.wrapperElement : "div", // wrapper element
      tE: isValidElement(o.textElement) ? o.textElement : "p", // text element
      fS: isValidFontSizeInPx(o.fontSize)
        ? validateMaxFontSize(o.fontSize, 150)
        : "50px", // font size
      c: isValidColor(o.color) ? o.color : "#1B9C85", // color
    };
    if (fontSizeIsInLimit(dO.fS, 150)) {
      addConsoleWarning("Font size is too large. It should be less than 150px");
    }
    const container = $(`<${dO.wE} class="split"></${dO.wE}>`);
    container.css("color", dO.c);
    const a = $(`<${dO.tE}>${text}</${dO.tE}>`);
    a.addClass("text").css({
      "font-size": dO.fS,
    });
    const b = $(`<${dO.tE}>${text}</${dO.tE}>`);
    b.addClass("text").css({
      "font-size": dO.fS,
      "background-color": dO.c,
    });
    container.append(a);
    container.append(b);
    addInDOM(container);
  };

  const createGlitch = () => {
    var dO = {
      wE: isValidElement(o.wrapperElement) ? o.wrapperElement : "div", // wrapper element
      tE: isValidElement(o.textElement) ? o.textElement : "p", // text element
      fS: isValidFontSizeInPx(o.fontSize) ? o.fontSize : "50px", // font size
    };
    const container = $(`<${dO.wE} class="glitch"></${dO.wE}>`);
    const a = $(
      `<${dO.tE} class="text" data-text="${text}">${text}</${dO.tE}>`
    );
    a.css("font-size", dO.fS);
    container.append(a);
    addInDOM(container);
  };

  const createGif = () => {
    var dO = {
      wE: isValidElement(o.wrapperElement) ? o.wrapperElement : "div", // wrapper element
      tE: isValidElement(o.textElement) ? o.textElement : "p", // text element
      fS: isValidFontSizeInPx(o.fontSize) ? o.fontSize : "50px", // font size
      gif: o.gif ? o.gif : "water", // gif type
    };
    const container = $(`<${dO.wE} class="gif"></${dO.wE}>`);
    const a = $(`<${dO.tE} class="text ${dO.gif}" >${text}</${dO.tE}>`);
    a.css("font-size", dO.fS);
    container.append(a);
    addInDOM(container);
  };

  if (o.effect === "wave") {
    createWave(text);
  } else if (o.effect === "outline") {
    createOutline(text);
  } else if (o.effect === "split") {
    createSplit(text);
  } else if (o.effect === "glitch") {
    createGlitch(text);
  } else if (o.effect === "gif") {
    createGif(text);
  }
};
