function textarea_auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function togglePreview() {
    var preview = document.getElementById("markdown-preview");
    var write_content = document.getElementById("input-content");
    if (preview.style.display === "block") {
        preview.style.display = "none";
        write_content.style.display = "block";
        write_content.focus();
    } else {
        preview.innerHTML = marked(write_content.value);
        Prism.highlightAll();
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

function editor_shortcut(e) {
  // char key code: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  console.log("Tab");

  if(e.keyCode==9 || e.which==9){
    e.preventDefault();
    const TAB_SIZE = 2;
    // The one-liner that does the magic
    document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));
  }

}

textarea = document.getElementsByName("content")[0];
textarea_auto_grow(textarea);

window.onload = function(){
    // editor shortcuts
    textarea = document.getElementsByName("content")[0];
    textarea.onkeydown = editor_shortcut;

    // preview button
    preview_button = document.getElementById("preview-bnt");
    preview_button.onclick = togglePreview;
};
