var textdiv = document.getElementsByClassName("edit");
function setText(i, contents, type) {
  textdiv[i].textContent = contents;
  if (type == "C++") type = "cpp";
  textdiv[i].classList.toggle(`language-none`, false);
  if (type !== undefined)
    textdiv[i].classList.toggle(`language-${type.toLowerCase()}`, true);
  else {
    let str = textdiv[i].className;
    textdiv[i].className = str.replace(
      str.substring(str.indexOf(" language-"), str.length),
      ""
    );
  }
  Prism.highlightElement(textdiv[i]);
}
for (let i = 0; i < textdiv.length; i++) {
  const element = textdiv[i];
  element.addEventListener("input", () => {
    f[i].setModified(true, i);
  });
}
function getText(i) {
  return textdiv[i].textContent;
}

function changefont(i) {
  let value = document.getElementById(`selectFont${i}`).value;
  let font;
  switch (value) {
    case "0":
      font = "Arvo,serif";
      break;
    case "1":
      font = "Nunito,sans-serif";
      break;
    case "2":
      font = "Kaushan Script,cursive";
      break;
    case "3":
      font = "Source Code Pro,monospace";
      break;
  }
  textdiv[i - 1].style.fontFamily = font;
}

function changesize(i) {
  let element = document.getElementById(`selectSize${i}`);
  let size;
  let value = parseInt(element.value);
  if (value < 8 || value > 73 || value === NaN) {
    if (value < 8 || value === NaN) size = 8;
    if (value > 73) size = 72;
    element.classList.toggle("is-invalid", true);
  } else {
    size = element.value;
    element.classList.toggle("is-invalid", false);
  }
  textdiv[i - 1].style.fontSize = size + "px";
}
