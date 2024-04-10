let lastFieldForSpellCheck;
function RenderSpellChecker() {
    $('.spellchecker').blur(function () { CheckSpelling(this); });
}
String.prototype.replaceAt = function (index, len, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + len);
}
function CheckSpelling(txt) {
    lastFieldForSpellCheck = txt;
    let str = $(txt).val();
    GetCorrectedText(str);
}
function GetCorrectedText(str) {
    console.log('str: ', str);
    if (str != '') {
        let ObjPriData = {
            inputString: str
        };

        $.ajax({
            type: "post",
            url: "/Services/SpellCheckerAPI.asmx/GetCorrectedText",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(ObjPriData),
            dataType: "json",
            success: function (result) {
                console.log(result.d, str);
                if (result.d != null && result.d != "null") {
                    let res = JSON.parse(result.d);
                    //"{"StartIndex":6,"Length":9,"Suggestions":["students"]}"
                    let finalString = str;
                    let wrongWord = finalString.substr(res.StartIndex, res.Length);
                    finalString = finalString.replaceAt(res.StartIndex, res.Length, '<span class="misSpelled">' + wrongWord + '</span>');
                    DisplayCorrectionsIfAny(finalString, res.Suggestions, wrongWord);
                } else {
                    DisplayCorrectionsIfAny('');
                }
            },
            error: function (result) {
                alert('error occured');
                alert(result.responseText);
            },
            async: true
        });
    }
}
function DisplayCorrectionsIfAny(finalString, suggestions, wrongWord) {
    $('#divSuggestionList').html('');
    if (finalString != '') {
        $('#divSuggestions').html(finalString);
        $('#divSuggestionsContainer').show();
        if (suggestions && suggestions.length > 0) {

            let _listItems = '';
            for (let i = 0; i < suggestions.length; i++) {
                _listItems += '<li onclick="SetCorrectedText(this, \'' + wrongWord + '\');">' + suggestions[i] + '</li>';
            }
            $('#divSuggestionList').html('Suggestions:<ul>' + _listItems + '</ul>');
        }
    } else {
        $('#divSuggestions').html('Looks good.');
        $('#divSuggestionsContainer').hide();
        notifySuccess('Looks good.');
    }
}
function SetCorrectedText(objLi, wrongWord) {
    let newWord = $(objLi).text();
    let replacedTest = $('#divSuggestions').html().replace('<span class="misSpelled">' + wrongWord + '</span>', '<span class="misSpelledCorrected">' + newWord + '</span>');
    $('#divSuggestions').html(replacedTest);
    let str = $('#divSuggestions').text();
    $(lastFieldForSpellCheck).val(str);
    GetCorrectedText(str);
}
function ChangeFieldTextFromEditableDiv(_div) {
    let str = $(_div).text();
    console.log('ChangeFieldTextFromEditableDiv: ', str);
    $(lastFieldForSpellCheck).val(str);
    GetCorrectedText(str);
}