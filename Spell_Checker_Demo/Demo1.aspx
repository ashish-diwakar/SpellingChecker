<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Demo1.aspx.cs" Inherits="Spell_Checker_Demo.Demo1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        Demo: Spell Checker Javascript & C# Tool
    </title>
    <style>
        
    </style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/Styles/Notification.css" />
    <link rel="stylesheet" href="/Styles/SpellCheckerUI.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="/Scripts/Notification.js"></script>
    <script src="/Scripts/SpellCheckerJS.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div style="text-align: center;">
            Enter some text for Spell Checking: <textarea id="txtDemo1" class="spellchecker" rows="4" cols="40"></textarea>
        </div>
        <div id="divSuggestionsContainer" style="display:none;">
            <div id="divSuggestions" class="suggestionText" contenteditable="true" onblur="ChangeFieldTextFromEditableDiv(this);"></div>
            <div id="divSuggestionList" class="suggestionList"></div>
        </div>
    </form>
    <script type="text/javascript">        
        RenderSpellChecker();
        RenderNotificationDiv();
    </script>
</body>
</html>
