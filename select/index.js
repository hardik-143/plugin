$(document).ready(function () {
    $("#single0").select({
      cls: {
        container: "select---container",
        optionHover: "select---option---hover",
        optionSelected: "select---option---selected",
      },
      noResult: "No results found",
    });
    $("#single1").select({
      allowClear: true,
      cls: {
        container: "select---container",
        optionHover: "select---option---hover",
        optionSelected: "select---option---selected",
      },
      noResult: "No results found",
    });
    $("#single2").select({
      search: true,
      allowClear: true,
      cls: {
        container: "select---container",
        optionHover: "select---option---hover",
        optionSelected: "select---option---selected",
      },
      noResult: "No results found",
    });
    $("#single3").select({
      search: true,
      allowClear: true,
      cls: {
        container: "select---container",
        optionHover: "select---option---hover",
        optionSelected: "select---option---selected",
      },
      noResult: "No results found",
    });
  $("#multiple0").select({
    cls: {
      search: "select---search",
      searchInput: "select---search---input",
      option: "select---option",
    },
    noResult: "No results found",
  });
  $("#multiple1").select({
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
