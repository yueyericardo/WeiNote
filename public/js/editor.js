function ignoreLatex(text){
    return text.replace(/(\${2}[^\$]+\${2})/g, function(a){return `<div class="mathjax-block">${a}</div>`});
}

function textarea_auto_grow(element) {
    element.style.height = (element.scrollHeight)+"px";
}

function addTableContainer(text){
    return text.replace(/(<table[^>]*>(?:.|\n)*?<\/table>)/g, function(a){return `<div class="tableContainer">${a}</div>`});
}

function togglePreview() {
    var preview = document.getElementById("markdown-preview");
    var write_content = document.querySelector('.CodeMirror');
    if (preview.style.display === "block") {
        preview.style.display = "none";
        write_content.style.display = "block";
        myCodeMirror.focus();
    } else {
        preview.innerHTML = addTableContainer(marked(ignoreLatex(myCodeMirror.getValue())));
        Prism.highlightAll();
        MathJax.typeset();
        preview.style.display = "block";
        write_content.style.display = "none";
    }
}


document.onkeyup = function(e) {
    // char key code: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    var os = getOS()
    console.log("shortcut bind to editor shotcut");
    // ---------------  editor behavior ---------------
    if (e.ctrlKey && e.which == 32) {
        // Ctrl + Space -> Preview
        togglePreview()
    } else if (e.ctrlKey && e.which == 13) {
        // Ctrl + Enter -> Submit
        document.getElementById("input-submit").click();
    }
    // --------------- common shortcut ---------------
    // mac shortcut using Ctrl, other operating system using Alt
    if (os == 'Mac'){
        if (e.ctrlKey && e.which == 78) {
            // Ctrl + N
            window.location.href = "/note/create";
        } else if (e.altKey && e.which == 78) {
            // Alt + N
            window.open("/note/create");
        } else if (e.ctrlKey && e.which == 72) {
            // Ctrl + H
            window.location.href = "/notes";
        } else if (e.ctrlKey && e.which == 65) {
            // Ctrl + A
            window.location.href = "/notes/all";
        } else if (e.ctrlKey && e.which == 67) {
            // Ctrl + C
            window.location.href = "/notes/archive";
        }
    }else{
        if (e.altKey && e.which == 78) {
            // Alt + N
            window.location.href = "/note/create";
        } else if (e.altKey && e.which == 72) {
            // Alt + H
            window.location.href = "/notes";
        } else if (e.altKey && e.which == 65) {
            // Alt + A
            window.location.href = "/notes/all";
        } else if (e.altKey && e.which == 67) {
            // Alt + C
            window.location.href = "/notes/archive";
        }
    }
};

textarea = document.getElementsByName("content")[0];
textarea_auto_grow(textarea);

formSubmitting = false;
var isDirty = function() {
    currentData = myCodeMirror.getValue();
    if (currentData == sessionStorage.getItem('tmpInitialData')){
        return false
    }
    return true;
}
var setFormSubmitting = function() {
    save_lasttag();
    formSubmitting = true;
};

window.onload = function(){
    options = {
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping: true,
        theme: 'monokai',
        viewportMargin: Infinity,
        indentWithTabs: true,
        indentUnit: 4,
        extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList",
                    "Tab": "autoIndentMarkdownList", "Shift-Tab": "autoUnindentMarkdownList"
                },
    }
    textarea = document.getElementById("input-content")
    myCodeMirror = CodeMirror.fromTextArea(textarea, options=options);
    myCodeMirror.focus();
    sessionStorage.setItem('tmpInitialData', myCodeMirror.getValue());

    // preview button
    preview_button = document.getElementById("preview-bnt");
    preview_button.onclick = togglePreview;

    window.addEventListener("beforeunload", function (e) {
        if (formSubmitting || !isDirty()) {
            return undefined;
        }

        var confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
};
