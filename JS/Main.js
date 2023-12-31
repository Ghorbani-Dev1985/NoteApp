const $ = document;
const Header = $.querySelector("#Header");
const AddNoteInput = $.querySelector("#AddNoteInput");
const AddNoteBtn = $.querySelector(".AddNoteBtn");
const EditNoteBtn = $.querySelector(".EditNoteBtn");
const ClearInputBtn = $.querySelector(".ClearInputBtn");
const NoteItemsBody = $.querySelector(".NoteItemsBody");
const NoteForm = $.querySelector("#NoteForm");
const ColorBox = $.querySelectorAll(".ColorBox");
const NoteWrapper = $.querySelector(".NoteWrapper");
const TaskAlert = $.querySelector("#TaskAlert");
const NoteItem = $.querySelectorAll(".NoteItem");
const ScrollUp = $.querySelector(".ScrollUp");
const ScrollTopSection = $.querySelector(".ScrollTopSection");
const DeleteModal = $.querySelector('.DeleteModal')
const Overlay = $.querySelector('.Overlay')
const DeleteModalYesBtn = $.querySelector('#DeleteModal__YesBtn')
const DeleteModalNoBtn = $.querySelector('#DeleteModal__NoBtn')
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
let id = null;
let title = null;
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
      TrashImgEle.addEventListener("click", () =>{
        DeleteNote(NoteList.id , NoteList.NoteTitle)
      }
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
ColorBox.forEach((Colors) => {
  Colors.addEventListener("click", (event) => {
    let bgColor = event.target.style.backgroundColor;
    NoteWrapper.style.backgroundColor = bgColor;
  });
});
function RedAlert() {
  TaskAlert.style.visibility = "visible";
  TaskAlert.style.opacity = 1;
  TaskAlert.style.color = "#f43f5e";
}
function GreenAlert() {
  AddNoteInput.value = "";
  TaskAlert.style.visibility = "visible";
  TaskAlert.style.opacity = 1;
  TaskAlert.style.color = "#22c55e";
}
function EditNote(id, title) {
  let localStorageNotes = JSON.parse(localStorage.getItem("Note"));
  NoteItems = localStorageNotes;
  NoteItems.forEach((NoteItem) => {
    if (NoteItem.id === id) {
      AddNoteBtn.classList.add("hidden");
      EditNoteBtn.classList.remove("hidden");
      AddNoteInput.value = title;
      AddNoteInput.focus();
      EditNoteBtn.addEventListener("click", () => {
        NoteItem.NoteTitle = AddNoteInput.value.trim();
        NoteItem.NoteBgColor = NoteWrapper.style.backgroundColor;
        SetLocalStorage(NoteItems);
        NoteGenerator(NoteItems);
        GreenAlert();
        TaskAlert.innerHTML = `یادداشت با عنوان (${AddNoteInput.value}) با موفقیت ویرایش گردید.`;
        AddNoteBtn.classList.remove("hidden");
        EditNoteBtn.classList.add("hidden");
        if (
          AddNoteInput.addEventListener("keydown", (event) => {
            if (
              event.key === "Enter" &&
              !EditNoteBtn.classList.contains("hidden")
            ) {
              NoteItem.NoteTitle = AddNoteInput.value.trim();
              NoteItem.NoteBgColor = NoteWrapper.style.backgroundColor;
              SetLocalStorage(NoteItems);
              NoteGenerator(NoteItems);
              GreenAlert();
              TaskAlert.innerHTML = `یادداشت با عنوان (${AddNoteInput.value}) با موفقیت ویرایش گردید.`;
            }
          })
        );
      });
    }
  });
}
function DeleteNote(id, title) {
   let Confirm = confirm('آیا برای حذف یادداشت مطمعن هستید؟')

   if(Confirm){
     let localStorageNotes = JSON.parse(localStorage.getItem("Note"));
     NoteItems = localStorageNotes;
     let deleteNoteIndex = NoteItems.findIndex((note) => {
       return note.id === id;
     });
     NoteItems.splice(deleteNoteIndex, 1);
     RedAlert();
     TaskAlert.innerHTML = `یادداشت با عنوان ${title} حذف گردید.`;
     RemoveAlert();
     SetLocalStorage(NoteItems);
     NoteGenerator(NoteItems);
     if (NoteItems.length === 0) window.location.reload();
   }
 }

function CompleteNote(id) {
  let localStorageNotes = JSON.parse(localStorage.getItem("Note"));
  NoteItems = localStorageNotes;
  NoteItems.forEach((NoteItem) => {
    if (NoteItem.id === id) {
      NoteItem.isCompleted = !NoteItem.isCompleted;
    }
  });
  SetLocalStorage(NoteItems);
  NoteGenerator(NoteItems);
}
function GetLocalStorage() {
  let getTodos = JSON.parse(localStorage.getItem("Note"));
  if (getTodos) {
    NoteItems = getTodos;
  } else {
    NoteItems = [];
  }
  NoteGenerator(NoteItems);
}
function RemoveAlert() {
  setTimeout(() => {
    TaskAlert.style.visibility = "hidden";
    TaskAlert.style.opacity = 0;
  }, 2000);
}
function ClearNote() {
    NoteItems = [];
    NoteItemsBody.innerHTML = "";
    localStorage.removeItem("Note");
    RedAlert();
    TaskAlert.innerHTML = `همه یادداشت‌ها حذف گردید.`;
    window.location.reload();
    RemoveAlert();
}
function OpenModal(){
  DeleteModal.style.display = 'block'
  Overlay.style.display = 'block'
}
function CloseModal(){
  DeleteModal.style.display = 'none'
  DeleteOneNoteModal.style.display = 'none'
  Overlay.style.display = 'none'
}
function ScrollTop(scrollY){
  let documentHeight = document.body.clientHeight;
  let scrollPercent = (scrollY / (documentHeight ));
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  ScrollTopSection.style.width = `${scrollPercentRounded}%`;
}


// EventListener
NoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
AddNoteBtn.addEventListener("click", AddNewNote);
window.addEventListener("load", GetLocalStorage);
ClearInputBtn.addEventListener("click", OpenModal);
DeleteModalYesBtn.addEventListener('click' , ClearNote)
DeleteModalNoBtn.addEventListener('click' , CloseModal);
Overlay.addEventListener('click' , CloseModal)
AddNoteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && EditNoteBtn.classList.contains("hidden")) {
    AddNewNote();
  }
});
ScrollUp.addEventListener("click", () => {
  scrollTo(0, 0);
});
window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  if ($.documentElement.scrollTop > 0) {
    Header.classList.add("GlassBg");
  }
  if ($.documentElement.scrollTop >= 250) {
    ScrollUp.style.visibility = "visible";
    ScrollUp.style.opacity = 1;
  } else {
    Header.classList.remove("GlassBg");
    ScrollUp.style.visibility = "hidden";
    ScrollUp.style.opacity = 0;
  }
   ScrollTop(scrollY);
});