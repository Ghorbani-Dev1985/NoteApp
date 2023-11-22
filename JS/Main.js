let $ = document;
let Header = $.querySelector("#Header");
let AddNoteInput = $.querySelector("#AddNoteInput");
let AddNoteBtn = $.querySelector(".AddNoteBtn");
let EditNoteBtn = $.querySelector(".EditNoteBtn");
let ClearInputBtn = $.querySelector(".ClearInputBtn");
let NoteItemsBody = $.querySelector(".NoteItemsBody");
let NoteForm = $.querySelector("#NoteForm");
let ColorBox = $.querySelectorAll(".ColorBox");
let NoteWrapper = $.querySelector(".NoteWrapper");
let TaskAlert = $.querySelector("#TaskAlert");
let NoteItem = $.querySelectorAll(".NoteItem");
let ScrollUp = $.querySelector(".ScrollUp");
let ScrollTopSection = $.querySelector(".ScrollTopSection");
let NoteItems = [];


function AddNewNote() {
  let AddNoteInputValue = AddNoteInput.value.trim();
  let BgColor = NoteWrapper.style.backgroundColor;
  if (AddNoteInputValue) {
    let NewNoteObj = {
      id: NoteItems.length + 1,
      NoteTitle: AddNoteInputValue,
      NoteBgColor: BgColor,
      isCompleted: false,
    };
    AddNoteInput.value = "";
    GreenAlert();
    TaskAlert.innerHTML = `یادداشت با عنوان (${AddNoteInputValue}) ثبت گردید.`;
    NoteItems.push(NewNoteObj);
    SetLocalStorage(NoteItems);
    NoteGenerator(NoteItems);
    AddNoteInput.focus();
  } else {
    RedAlert();
    TaskAlert.innerHTML = `لطفا عنوان یادداشت را وارد نمایید`;
    RemoveAlert();
  }
}



// EventListener
AddNoteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && EditNoteBtn.classList.contains("hidden")) {
    AddNewNote();
  }
});