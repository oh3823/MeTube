const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');
const textarea = form.querySelector('textarea');

const delBtns = document.getElementsByClassName('del');

const tmp = [];
const addComment = (text, commentId) => {
  const list = document.querySelector('.video__comments ul');
  const comment = document.createElement('li');
  comment.dataset.id = commentId;
  const icon = document.createElement('i');
  const span = document.createElement('span');
  const del = document.createElement('span');
  del.addEventListener('click', handleDelete);
  del.innerText = ' ❌';
  del.className = 'del';
  span.innerText = text;
  icon.className = 'fas fa-comment';
  comment.className = 'video__comment';
  comment.appendChild(icon);
  comment.appendChild(span);
  comment.appendChild(del);
  list.prepend(comment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  const json = await response.json();
  console.log(json);
  if (response.status === 201) {
    addComment(text, json.commentId);
  }
  textarea.value = '';
};

const handleDelete = async (event) => {
  const li = event.target.parentElement;
  const commentId = li.dataset.id;
  const response = await fetch(`/api/comment/${commentId}/delete`, {
    method: 'delete',
  });
  li.remove();
};

form.addEventListener('submit', handleSubmit);
for (let i = 0; i < delBtns.length; i++) {
  delBtns[i].addEventListener('click', handleDelete);
}
