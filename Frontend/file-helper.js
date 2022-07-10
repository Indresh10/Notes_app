function getFileHandle() {
  return window.showOpenFilePicker().then((handles) => handles[0]);
}

function getNewFileHandle() {
  tp = [];
  for (x in exts) {
    tp.push("." + x);
  }
  const opts = {
    types: [
      {
        description: "Text files",
        accept: { "text/*": tp },
      },
    ],
  };
  return window.showSaveFilePicker(opts);
}

function readFile(file) {
  return file.text();
}

async function writeFile(filehandle, contents) {
  const writeable = filehandle.createWritable();
  await writeable.write(contents);
  await writeable.close();
}

async function verifyPermission(filehandle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.writable = true;
    opts.mode = "readwrite";
  }

  if ((await filehandle.queryPermission(opts)) === "granted") {
    return true;
  }

  if ((await fileHandle.requestPermission(opts)) === "granted") {
    return true;
  }
  return false;
}
