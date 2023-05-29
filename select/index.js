$(document).ready(function () {
  $("#single").select({
    search: true,
    allowClear: true,
    cls: {
      container: "select---container",
      optionHover: "select---option---hover",
      optionSelected: "select---option---selected",
    },
  });
  $("#multiple").select({
    search: true,
    cls: {
      search: "select---search",
      searchInput: "select---search---input",
      option: "select---option",
    },
    allowClear: true,
    noResult: "No results found",
  });
});
