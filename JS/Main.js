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
function SetLocalStorage(noteList) {
  localStorage.setItem("Note", JSON.stringify(noteList));
}

function NoteGenerator(NoteLists) {
  if (NoteLists.length > 0) {
    let NewDivEle, SpanEle, TrashImgEle, TickImgEle, EditImgEle, IconDiv;
    NoteItemsBody.innerHTML = "";
    NoteLists.forEach((NoteList) => {
      NewDivEle = $.createElement("div");
      IconDiv = $.createElement("div");
      SpanEle = $.createElement("span");
      TrashImgEle = $.createElement("img");
      TickImgEle = $.createElement("img");
      EditImgEle = $.createElement("img");
      NewDivEle.className = "NoteItem";
      IconDiv.className =
        "w-full gap-5 flex content-end items-center border p-10";
      TickImgEle.setAttribute("src", "./Assets/Images/tick.svg");
      EditImgEle.setAttribute("src", "./Assets/Images/edit.svg");
      TrashImgEle.setAttribute("src", "./Assets/Images/trash.svg");
      TrashImgEle.addEventListener("click", () =>
        DeleteNote(NoteList.id, NoteList.NoteTitle)
      );
      TickImgEle.addEventListener("click", () => CompleteNote(NoteList.id));
      EditImgEle.addEventListener("click", () =>
        EditNote(NoteList.id, NoteList.NoteTitle)
      );
      SpanEle.textContent = NoteList.NoteTitle;
      if (NoteList.isCompleted) {
        SpanEle.className = "completed";
      } else {
        SpanEle.className = "";
      }
      IconDiv.append(TickImgEle, EditImgEle, TrashImgEle);
      NewDivEle.append(SpanEle, IconDiv);
      NewDivEle.style.backgroundColor = NoteList.NoteBgColor;
      NoteItemsBody.append(NewDivEle);
      NoteWrapper.style.backgroundColor = "rgba(40 41 61 / 1)";
      RemoveAlert();
    });
  } else {
    NewDivEle = $.createElement("div");
    NewDivEle.innerHTML = "هیچ یادداشتی ثبت نگردیده است.";
    NewDivEle.className = "NullNoteAlert";
    NoteItemsBody.append(NewDivEle);
  }
}


// EventListener
AddNoteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && EditNoteBtn.classList.contains("hidden")) {
    AddNewNote();
  }
});