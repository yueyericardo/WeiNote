document.onkeyup = function(e) {
  if (e.ctrlKey && e.which == 78) {
    // alert("Ctrl + N shortcut combination was pressed");
    window.location.href = "/note/create";
  } else if (e.altKey && e.which == 78) {
    // alert("Alt + N shortcut combination was pressed");
    window.open("/note/create");
  } else if (e.ctrlKey && e.which == 72) {
    // alert("Ctrl + H shortcut combination was pressed");
    window.location.href = "/notes";
  }
};