window.addEventListener("beforeunload", (e) => {
  const msg = `There are unsaved changes. Are you sure you want to leave?`;
  if (!f.every(checkModified)) {
    e.preventDefault();
    e.returnValue = msg;
  }
});

function checkModified(v) {
  return v.isModified === false;
}

function setFile(fileno) {
  let menu = document.getElementById(`file${fileno}`);
  menu.classList.toggle("d-none", false);
  document.getElementById(`file${fileno}-title`).textContent =
    f[fileno - 1].filename;
  document.getElementById(`file${fileno}_title`).textContent =
    f[fileno - 1].filename;
  menu.click();
}

function unsetFile(fileno, nextfile) {
  let menu = document.getElementById(`file${fileno}`);
  menu.classList.toggle("d-none", true);
  let nmenu;
  if (nextfile === false) {
    nmenu = document.getElementById("def");
  } else {
    nmenu = document.getElementById(`file${nextfile}`);
  }
  nmenu.click();
}

function setTheme() {
  let check = document.getElementsByName("theme");
  let i;
  for (let j = 0; j < check.length; j++) {
    const element = check[j];
    if (element.checked === true) {
      i = j;
    }
  }
  let ele = document.getElementById("theme-css");
  let href = ele.href;
  switch (i) {
    case 0:
      href = href.replace(
        href.substring(href.lastIndexOf("/") + 1, href.length),
        "prism-default.css"
      );
      ele.href = href;
      break;
    case 1:
      href = href.replace(
        href.substring(href.lastIndexOf("/") + 1, href.length),
        "prism-coy.css"
      );
      ele.href = href;
      break;
    case 2:
      href = href.replace(
        href.substring(href.lastIndexOf("/") + 1, href.length),
        "prism-night.css"
      );
      ele.href = href;
      break;
    case 3:
      href = href.replace(
        href.substring(href.lastIndexOf("/") + 1, href.length),
        "prism-funky.css"
      );
      ele.href = href;
      break;
  }
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  const request = new Request("/theme", {
    headers: { "X-CSRFToken": csrftoken },
  });
  fetch(request, {
    method: "POST",
    body: JSON.stringify({
      theme: i,
    }),
  })
    .then((response) => response.json())
    .then((msg) => {
      if ("error" in msg) {
        alert(msg["error"]);
      }
    });
}

var thememodal = document.getElementById("themeModal");
thememodal.addEventListener("hidden.bs.modal", () => {
  fetch("/theme")
    .then((response) => response.json())
    .then((msg) => {
      let check = document.getElementsByName("theme");
      check[msg["theme"]].checked = true;
    });
});

window.addEventListener("resize", () => {
  if (original !== window.innerHeight) {
    document.getElementById("footer").style.display = "none";
  } else {
    document.getElementById("footer").style.display = "block";
  }
});
