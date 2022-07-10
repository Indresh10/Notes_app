var fsAccess = true;
if (!"showOpenFilepicker" in window) {
  document.getElementById("lfoot").classList.toggle("d-none", false);
  fsAccess = false;
}
var f = new Array(5);
var free = new Array(5);
free.forEach((v) => {
  v = false;
});

function getFreeFile() {
  free.forEach((v, i) => {
    if (v === false) return i;
  });
  return false;
}
