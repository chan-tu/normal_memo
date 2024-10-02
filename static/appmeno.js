async function edimeno(event) {
  const id = event.target.dataset.id;
  const edinput = prompt("수정 값 입력");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: edinput,
    }),
  });
  readmeno();
}

async function delbtn(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readmeno();
}

function displaymemo(memo) {
  const ul = document.querySelector("#meono-ui");

  const li = document.createElement("li");
  li.innerHTML = `[id:${memo.id}] ${memo.content}`;

  const edtBtn = document.createElement("button");
  edtBtn.innerText = "수정";
  edtBtn.addEventListener("click", edimeno);
  edtBtn.dataset.id = memo.id;

  const deletbtn = document.createElement("button");
  deletbtn.innerText = "삭제";
  deletbtn.addEventListener("click", delbtn);
  deletbtn.dataset.id = memo.id;

  li.appendChild(edtBtn);
  li.appendChild(delebtn);
  ul.appendChild(li);
}

async function readmeno() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#meono-ui");
  ul.innerHTML = "";
  jsonRes.forEach(displaymemo);
}

async function create_meno(value) {
  const res = await fetch("/menos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readmeno();
}

function handle_Memo(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  create_meno(input.value);
  input.value = "";
}
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handle_Memo);

readmeno();
