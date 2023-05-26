$.fn.select = function (o) {
  let dO = {
    search: o.search || false,
  };
  let doc = $(document);
  let selectEle = $(this);
  let options = $(this).find("option");
  let id = $(this).attr("id");
  let placeholder = "";
  let showPlaceholder = false;
  const getPlaceholder = () => {
    options.each(function () {
      if ($(this).attr("selected")) {
        placeholder = $(this).text();
        showPlaceholder = true;
      }
    });
    if (!placeholder) {
      showPlaceholder = false;
      placeholder = $(this).attr("data-placeholder");
    }
  };
  const closeAllSelect = () => {
    $(".select-wrapper").removeClass("select-wrapper__opened");
    $(".select-wrapper__dropdown").slideUp(200);
  };
  getPlaceholder();
  let sWrapper = $(
    `<div class="select-wrapper select-wrapper-${id}" data-select="${id}"></div>`
  );
  let sSelected = $(`<div class="select-wrapper__selected"></div>`);
  let sSelectedText = $(
    `<span class="select-wrapper__selected-text ${
      !showPlaceholder ? "select-wrapper__placeholder" : ""
    }">${placeholder ? placeholder : "select option"}</span>`
  );
  let sDropdown = $(`<span class="select-wrapper__dropdown"></span>`);
  let sDropdownInner = $(`<div class="select-wrapper__dropdown-inner"></div>`);
  let sSearchWrapper = $(`<div class="select-wrapper__search-wrapper"></div>`);
  let sSearch = $(
    `<input type="text" class="select-wrapper__search" placeholder="search">`
  );
  let sArrow = $(`<span class="select-wrapper__arrow"></span>`);
  let sOptions = $(`<div class="select-wrapper__options"></div>`);
  options.each(function () {
    let sOption = $(
      `<div class="select-wrapper__option" data-value="${$(this).attr(
        "value"
      )}">${$(this).text()}</div>`
    );
    sOptions.append(sOption);
  });
  let sOptionsNoResultFound = $(
    `<div class="select-wrapper__option select-wrapper__no-result hide">No result found</div>`
  );
  sOptions.append(sOptionsNoResultFound);
  sSelected.append(sSelectedText);
  sSelected.append(sArrow);
  sWrapper.append(sSelected);
  sWrapper.append(sDropdown);
  sDropdown.append(sDropdownInner);
  if (dO.search) {
    sSearchWrapper.append(sSearch);
    sDropdownInner.append(sSearchWrapper);
  }
  sDropdownInner.append(sOptions);
  $(this).after(sWrapper);
  $(this).hide();
  sSelected.bind("click", function (e) {
    $(this)
      .closest(".select-wrapper")
      .toggleClass("select-wrapper__opened")
      .find(".select-wrapper__dropdown")
      .slideToggle(200);
  });
  sOptions.find(".select-wrapper__option").bind("click", function () {
    let value = $(this).data("value");
    let text = $(this).text();
    $(this)
      .addClass("select-wrapper__focused")
      .siblings()
      .removeClass("select-wrapper__focused");
    let selectEle = $(this).closest(".select-wrapper").data("select");
    let selectWrapperEle = $(this).closest(".select-wrapper");
    $(`select[id="${selectEle}"]`).val(value);
    selectWrapperEle.toggleClass("select-wrapper__opened");
    selectWrapperEle
      .find(".select-wrapper__selected-text")
      .text(text)
      .removeClass("select-wrapper__placeholder");
    selectWrapperEle.find(".select-wrapper__dropdown").slideUp(200);
    selectWrapperEle
      .find(".select-wrapper__option:not(.select-wrapper__no-result)")
      .show();
    sSearch.val("");
  });
  sSearch.bind("keyup", function () {
    let value = $(this).val().toLowerCase();
    let selectWrapperEle = $(this).closest(".select-wrapper");
    if (value == "") {
      selectWrapperEle
        .find(".select-wrapper__option:not(.select-wrapper__no-result)")
        .show();
      return;
    } else {
      selectWrapperEle.find(".select-wrapper__no-result").addClass("hide");
    }
    let options = selectWrapperEle.find(
      ".select-wrapper__option:not(.select-wrapper__no-result)"
    );
    options.each(function () {
      let text = $(this).text().toLowerCase();
      if (text.indexOf(value) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    if (
      selectWrapperEle.find(
        ".select-wrapper__option:not(.select-wrapper__no-result):visible"
      ).length == 0
    ) {
      selectWrapperEle.find(".select-wrapper__no-result").removeClass("hide");
    } else {
      selectWrapperEle.find(".select-wrapper__no-result").addClass("hide");
    }
  });
  doc.bind("scroll", function () {
    closeAllSelect();
  });
  doc.bind("click", function (e) {
    if (!$(e.target).closest(".select-wrapper").length) {
      closeAllSelect();
    }
  });
  doc.bind("keydown", function (e) {
    // close on escape key
    if (e.keyCode == 27) {
        closeAllSelect();
    }
    // move select-wrapper__focused class up down on arrow key
    if (e.keyCode == 38 || e.keyCode == 40) {
      let selectWrapperEle = $(".select-wrapper__opened");
      let options = selectWrapperEle.find(
        ".select-wrapper__option:not(.select-wrapper__no-result)"
      );
      let focused = selectWrapperEle.find(".select-wrapper__focused");
      let index = options.index(focused);
      if (e.keyCode == 38) {
        index--;
      } else {
        index++;
      }
      if (index < 0) {
        index = options.length - 1;
      }
      if (index > options.length - 1) {
        index = 0;
      }
      options
        .eq(index)
        .addClass("select-wrapper__focused")
        .siblings()
        .removeClass("select-wrapper__focused");
    }
    if (e.keyCode == 13) {
      let selectWrapperEle = $(".select-wrapper__opened");
      let focused = selectWrapperEle.find(".select-wrapper__focused");
      focused.trigger("click");
    }
  });
};
