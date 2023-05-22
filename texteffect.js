// Define the myPicker() function as a jQuery extension
$.fn.textdesign = function (o) {
  const validElement = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6"];
  function isValidHexCode(hexCode) {
    return /^#[0-9A-F]{6}$/i.test(hexCode);
  }
  function isValidRGBCode(rgbCode) {
    return /^#[0-9A-F]{6}$/i.test(rgbCode);
  }
  function isValidFontSizeInPx(fontSize) {
    return /^(\d{1,3})px$/i.test(fontSize);
  }
  function isValidElement(element) {
    return validElement.includes(element);
  }
  function isValidRGB(rgb) {
    return /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.test(rgb);
  }
  function isValidColor(color) {
    return isValidHexCode(color) || isValidRGBCode(color);
  }
  let ele = $(this);
  let text = ele.text();

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
  if (o.effect === "wave") {
    createWave(text);
  } else if (o.effect === "outline") {
    createOutline(text);
  }
};
