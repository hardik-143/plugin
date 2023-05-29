$.fn.select = function (o) {
  // check if select already initialized
  let id = $(this).attr("id");
  let doc = $(document);
  if (doc.find(`.select-wrapper-${id}`).length > 0) {
    throw new Error(
      `Select already initialized on #${id} \n If you want to reinitialize select, please use .destroy() method`
    );
  }
  // check if select already initialized

  // default options
  let dO = {
    search: o.search || false,
    data: o.data || [],
    selected: o.selected || "",
    allowClear: o.allowClear || false,
    cls: {
      container: o.cls && o.cls.container ? o.cls.container : "",
      search: o.cls && o.cls.search ? o.cls.search : "",
      searchInput: o.cls && o.cls.searchInput ? o.cls.searchInput : "",
      option: o.cls && o.cls.option ? o.cls.option : "",
      optionHover: o.cls && o.cls.optionHover ? o.cls.optionHover : "",
      optionSelected: o.cls && o.cls.optionSelected ? o.cls.optionSelected : "",
    },
    noResult: o.noResult || "No options found",
  };
  // default options
  let selectEle = $(this);
  let options = [];
  let placeholder = "";
  let showPlaceholder = false;
  const isSelected = (value) => {
    if (value === dO.selected) {
      return true;
    } else {
      return false;
    }
  };
  const optionHtml = (value, text) => {
    return $(
      `<div class="select-wrapper__option ${dO.cls.option}" data-value="${value}" value="${value}">${text}</div>`
    )[0];
  };
  const addOptionsInSelect = () => {
    selectEle.html("");
    options.forEach((item) => {
      let opt = $(
        `<option value="${$(item).attr("value")}">${$(item).text()}</option>`
      );
      selectEle.append(opt);
    });
  };
  const createOptionsList = () => {
    if (dO.data.length > 0) {
      dO.data.forEach((item) => {
        options.push(optionHtml(item.value, item.text));
      });
    } else {
      selectEle.find("option").each(function () {
        if ($(this).attr("value")) {
          options.push(optionHtml($(this).attr("value"), $(this).text()));
        }
      });
    }
    addOptionsInSelect();
  };
  createOptionsList();

  // set selected option text as placeholder otherwise set data-placeholder as placeholder
  const getPlaceholder = () => {
    if (dO.selected) {
      options.forEach((item) => {
        if (isSelected($(item).attr("value"))) {
          placeholder = $(item).text();
          selectEle.val($(item).attr("value"));
          showPlaceholder = true;
        }
      });
    }
    if (selectEle.val() && dO.data.length == 0) {
      placeholder = selectEle.find(`option[value="${selectEle.val()}"]`).text();
      showPlaceholder = true;
    }
    if (!placeholder) {
      selectEle.val("");
      showPlaceholder = false;
      placeholder = selectEle.attr("data-placeholder");
    }
  };
  const setPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    } else {
      return "select an option";
    }
  };
  // set selected option text as placeholder otherwise set data-placeholder as placeholder

  // close select dropdown
  const closeAllSelect = () => {
    $(".select-wrapper").removeClass("select-wrapper__opened");
    $(".select-wrapper__dropdown").slideUp(200);
  };
  // close select dropdown

  // get arrow
  const getArrow = () => {
    let sArrow = $(`<span class="select-wrapper__arrow"></span>`);
    let arrowHtml = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>`;
    sArrow.html(arrowHtml);
    return sArrow;
  };
  // get arrow

  // get clear button
  const getclear = () => {
    let sClear = $(`<span class="select-wrapper__clear hide"></span>`);
    let clearHtml = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M7,7 L17,17 M7,17 L17,7"></path></svg>`;
    sClear.html(clearHtml);
    return sClear;
  };
  // get clear button

  getPlaceholder();
  // select-wrapper
  let sWrapper = $(
    `<div class="select-wrapper select-wrapper-${id} ${dO.cls.container}" data-select="${id}"></div>`
  );
  let sSelected = $(`<div class="select-wrapper__selected"></div>`);
  let sSelectedTextWrapper = $(
    `<div class="select-wrapper__selected-text-wrapper"></div>`
  );
  let sSelectedText = $(
    `<span class="select-wrapper__selected-text ${
      !showPlaceholder ? "select-wrapper__placeholder" : ""
    }">${setPlaceholder()}</span>`
  );
  let sClear = getclear();
  let sArrow = getArrow();

  // select dropdown
  let sDropdown = $(`<span class="select-wrapper__dropdown"></span>`);
  let sDropdownInner = $(`<div class="select-wrapper__dropdown-inner"></div>`);

  // select search
  let sSearchWrapper = $(
    `<div class="select-wrapper__search-wrapper ${dO.cls.search}"></div>`
  );
  let sSearch = $(
    `<input type="text" class="select-wrapper__search ${dO.cls.searchInput}" placeholder="search">`
  );
  // select search

  // select options
  let sOptionsWrapper = $(
    `<div class="select-wrapper__options-wrapper"></div>`
  );
  let sOptions = $(`<div class="select-wrapper__options"></div>`);
  sOptions.append(options);
  let sOptionsNoResultFound = $(
    `<div class="select-wrapper__option select-wrapper__no-result hide">${dO.noResult}</div>`
  );
  // select options

  // append all elements to select-wrapper
  selectEle.after(sWrapper); // append select wrapper after select element
  sWrapper.append(sSelected); // append selected wrapper into select wrapper
  sSelected.append(sSelectedTextWrapper); // append selected text wrapper into selected wrapper
  sSelectedTextWrapper.append(sSelectedText); // append selected text into selected text wrapper
  if (dO.allowClear) {
    sSelected.append(sClear); // append clear button into selected wrapper
    if (selectEle.val() && showPlaceholder) {
      sClear.removeClass("hide");
    }
  }
  sSelected.append(sArrow); // append arrow into selected wrapper

  sWrapper.append(sDropdown); // append dropdown into select wrapper
  sDropdown.append(sDropdownInner); // append dropdown inner into dropdown
  if (dO.search) {
    // if search is true then append search wrapper into dropdown inner
    sSearchWrapper.append(sSearch); // append search into search wrapper
    sDropdownInner.append(sSearchWrapper); // append search wrapper into dropdown inner
  }
  sDropdownInner.append(sOptionsWrapper); // append options wrapper into dropdown inner
  sOptionsWrapper.append(sOptions); // append options into options wrapper
  sOptions.append(sOptionsNoResultFound); // append no result found into options list
  selectEle.addClass("select-hidden"); // hide select element

  // reset select
  const resetSelect = () => {
    closeAllSelect();
    selectEle.val("");
    sWrapper
      .find(".select-wrapper__selected-text")
      .text(setPlaceholder())
      .addClass("select-wrapper__placeholder");
    sWrapper
      .find(".select-wrapper__option")
      .removeClass("select-wrapper__option--selected");
    sWrapper
      .find(".select-wrapper__option:not(.select-wrapper__no-result)")
      .show();
    sSearch.val("");
    sClear.addClass("hide");
  };
  // reset select

  // toggle select dropdown
  const toggleSelect = () => {
    sWrapper
      .toggleClass("select-wrapper__opened")
      .find(".select-wrapper__dropdown")
      .slideToggle(200);
  };
  // toggle select dropdown

  sSelected.bind("click", function (e) {
    // on click select wrapper
    if (
      $(e.target).hasClass("select-wrapper__clear") ||
      $(e.target).closest(".select-wrapper__clear").length > 0
    ) {
      return false;
    }
    toggleSelect();
  });
  sOptions.find(".select-wrapper__option").bind("click", function () {
    // on click option
    let value = $(this).data("value");
    let text = $(this).text();
    $(this)
      .addClass(`select-wrapper__option--selected ${dO.cls.optionSelected}`)
      .siblings()
      .removeClass(`select-wrapper__option--selected ${dO.cls.optionSelected}`);
    let selectEle = $(this).closest(".select-wrapper").data("select");
    let selectWrapperEle = $(this).closest(".select-wrapper");
    sClear.removeClass("hide");
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
  sClear.bind("click", function () {
    // on click clear button
    resetSelect();
  });
  sOptions.find(".select-wrapper__option").bind("mouseover", function () {
    // on mouseover option
    $(this)
      .addClass(`select-wrapper__focused ${dO.cls.optionHover}`)
      .siblings()
      .removeClass(`select-wrapper__focused ${dO.cls.optionHover}`);
  });
  sSearch.bind("keyup", function () {
    // on search
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
  // doc.bind("click", function (e) {
  //   if (!$(e.target).closest(".select-wrapper").length) {
  //     closeAllSelect();
  //   }
  // });
  doc.bind("keydown", function (e) {
    // close on escape key
    if (e.keyCode == 27) {
      closeAllSelect();
    }
    let isNext = false;
    // move select-wrapper__focused class up down on arrow key
    if (e.keyCode == 38 || e.keyCode == 40) {
      if (e.keyCode == 40) {
        isNext = true;
      }
      let selectWrapperEle = $(".select-wrapper__opened");
      let options = selectWrapperEle.find(
        ".select-wrapper__option:visible:not(.select-wrapper__no-result)"
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
      // move select-wrapper__focused class up down on arrow key
      options
        .eq(index)
        .addClass("select-wrapper__focused")
        .siblings()
        .removeClass("select-wrapper__focused");
      // move select-wrapper__focused class up down on arrow key

      // scroll to focused option
      let currentOffset = sOptionsWrapper.offset().top;
      let nextTop = options.eq(index).offset().top;
      if (isNext) {
        currentOffset = currentOffset + sOptionsWrapper.outerHeight();
        nextTop = nextTop + options.eq(index).outerHeight();
      }
      let nextOffset = sOptionsWrapper.scrollTop() + (nextTop - currentOffset);
      sOptionsWrapper.scrollTop(nextOffset);
      // scroll to focused option
    }
    if (e.keyCode == 13) {
      // on enter key select option which is focused and close dropdown
      let selectWrapperEle = $(".select-wrapper__opened");
      let focused = selectWrapperEle.find(".select-wrapper__focused");
      focused.trigger("click");
    }
  });

  let returnObj = {
    close: closeAllSelect,
    open: function () {
      sSelected.trigger("click");
    },
    getValue: function () {
      return selectEle.val();
    },
    setValue: function (value) {
      let option = sOptions.find(
        `.select-wrapper__option[data-value="${value}"]`
      );
      if (option.length > 0) {
        option.trigger("click");
      }
    },
    getText: function () {
      if (sSelectedText.hasClass("select-wrapper__placeholder")) {
        return undefined;
      } else {
        return sSelectedText.text();
      }
    },
    getOptions: function () {
      return sOptions.find(".select-wrapper__option");
    },
    getOptionsList: function () {
      let options = [];
      sOptions
        .find(".select-wrapper__option:not(.select-wrapper__no-result)")
        .each(function () {
          let option = {
            value: $(this).data("value"),
            text: $(this).text(),
          };
          options.push(option);
        });
      return options;
    },
    destroy: function () {
      sWrapper.remove();
      selectEle.removeClass("select-hidden");
    },
    addOption: function (option) {
      let optionEle = `<div class="select-wrapper__option" data-value="${option.value}">${option.text}</div>`;
      sOptions.append(optionEle);
    },
    removeOption: function (value) {
      let option = sOptions.find(
        `.select-wrapper__option[data-value="${value}"]`
      );
      option.remove();
    },
    disable: function () {
      sWrapper.addClass("select-wrapper--disabled");
      selectEle.prop("disabled", true);
    },
    enable: function () {
      sWrapper.removeClass("select-wrapper--disabled");
      selectEle.prop("disabled", false);
    },
    reset: function () {
      resetSelect();
    },
  };
  return returnObj;
};
