$(document).ready(function () {
  let citySelect = $("#city").select({
    search: true,
    // data: [
    //   { value: "1", text: "New York" },
    //   { value: "2", text: "Los Angeles" },
    //   { value: "3", text: "Chicago" },
    //   { value: "4", text: "Houston" },
    //   { value: "5", text: "Philadelphia" },
    // ],
    cls: {
      container: "select---container",
      search: "select---search",
      searchInput: "select---search---input",
      option: "select---option",
      optionHover: "select---option---hover",
      optionSelected: "select---option---selected",
    },
    noResult: "No results found",
    // selected: "3",
    allowClear: true,
  });
  $(document).on("click", "#btn", function () {
    citySelect.getOptions();
    // citySelect.close();
  });
});
