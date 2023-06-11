$(document).ready(function () {
  $("#wave").texteffect({
    effect: "wave",
    color: "#E57C23",
    fontSize: "60px",
    textElement: "h1",
    wrapperElement: "div",
  });
  $("#outline").texteffect({
    effect: "outline",
    wrapperElement: "div",
    hoverEffect: true,
  });
  $("#split").texteffect({
    effect: "split",
    wrapperElement: "div",
    fontSize: "80px",
  });
  $("#glitch").texteffect({
    effect: "glitch",
    wrapperElement: "div",
    fontSize: "60px",
    textElement: "h1",
  });
  $("#gif").texteffect({
    effect: "gif",
    gif: "rain",
    wrapperElement: "div",
    fontSize: "60px",
    textElement: "h1",
  });
  $("#reflection").texteffect({
    effect: "reflection",
    wrapperElement: "div",
    fontSize: "60px",
    textElement: "h1",
  });
});
