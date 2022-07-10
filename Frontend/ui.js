window.addEventListener("beforeunload", (e) => {
  const msg = `There are unsaved changes. Are you sure you want to leave?`;
  if (files.isModified) {
    e.preventDefault();
    e.returnValue = msg;
  }
});

files.confirmDiscard = () => {
  if (!files.isModified) {
    return true;
  }
  const confirmMsg = "Discard changes? All changes will be lost.";
  return confirm(confirmMsg);
};

files.setModified = (val) => {
  if (!"showOpenFilePicker" in window) {
    return;
  }
  files.isModified = val;
  //change file save pointer
};
