$.fn.stringInfo = function () {
    var element = this[0];
    var string = element.innerText;
    var stringLength = string.length;
    var ArrayOfWords = string.split(" ");
    var TotalWords = ArrayOfWords.length;
    var TotalSpaces = TotalWords - 1;
    var reverseString = string.split("").reverse().join("");
    var alphabetCount = 0;
    var numberCount = 0;
    var specialCharCount = 0;
    var spaceCount = 0;
    for (let i = 0; i < string.length; i++) {
        const str = string.charAt(i);
        if (str.match(/[a-z]/i)) {
            alphabetCount++;
        } else if (str.match(/[0-9]/i)) {
            numberCount++;
        } else if (str.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/i)) {
            specialCharCount++;
        } else if (str.match(/\s/i)) {
            spaceCount++;
        }
    }
    function findWord(word) {
        var count = 0;
        for (let i = 0; i < ArrayOfWords.length; i++) {
            const str = ArrayOfWords[i];
            if (str == word) {
                count++;
            }
        }
        return count;
    }
    function deleteWord(word) {
        var html = "";
        for (let i = 0; i < ArrayOfWords.length; i++) {
            const str = ArrayOfWords[i];
            if (str != word) {
                html += str + " ";
            }
        }
        return html;
    }
    function replaceWord(word, replaceWord) {
        var html = "";
        for (let i = 0; i < ArrayOfWords.length; i++) {
            const str = ArrayOfWords[i];
            if (str == word) {
                html += replaceWord + " ";
            } else {
                html += str + " ";
            }
        }
        return html;
    }
    function addWord(word, isLast) {
        var html = "";
        if (isLast) {
            html = string + " " + word;
        } else {
            html = word + " " + string;
        }
        return html;
    }
    function highlightWord(word) {
        var html = "";
        for (let i = 0; i < ArrayOfWords.length; i++) {
            const str = ArrayOfWords[i];
            if (str == word) {
                html += "<span style='background-color:yellow'>" + str + "</span>" + " ";
            } else {
                html += str + " ";
            }
        }
        return html;
    }
    let obj = {
        stringLength,
        ArrayOfWords,
        TotalWords,
        TotalSpaces,
        alphabetCount,
        numberCount,
        specialCharCount,
        spaceCount,
        reverseString,
        findWord,
        deleteWord,
        replaceWord,
        addWord,
        highlightWord
    }
    return obj;
}