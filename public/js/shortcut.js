document.onkeyup = function(e) {
  // char key code: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  if (e.ctrlKey && e.which == 78) {
    window.location.href = "/note/create";
  } else if (e.altKey && e.which == 78) {
    window.open("/note/create");
  } else if (e.ctrlKey && e.which == 72) {
    window.location.href = "/notes";
  } else if (e.ctrlKey && e.which == 65) {
    window.location.href = "/notes/all";
  } else if (e.ctrlKey && e.which == 67) {
    window.location.href = "/notes/archive";
  }
};
