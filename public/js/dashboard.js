console.log('dashboard');
// create post function
const newFormHandler = async (event) => {
  console.log('delete button');
  event.preventDefault();
  console.log(event.target);
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  console.log(JSON.stringify({ title, content }));

  if (title && content) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  } else {
    console.log('dashboard: no title or content');
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Please enter a title and content',
      showConfirmButton: true,
      timer: 1500,
      confirmButtonColor: '#0d6efd'
    }); 
  }
};
// delete post function
const postDeleteHandler = async (event) => {
  event.preventDefault();
  console.log('delete post');

  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Failed to delete post',
      showConfirmButton: true,
      timer: 1500,
      confirmButtonColor: '#0d6efd'
    }); 
  }
};
// delete comment function
const commentDeleteHandler = async (event) => {
  console.log('delete comment');

  event.preventDefault();
  console.log(event);
  
  try {  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
      console.log(response.ok)
      if (response.ok) {
        event.target.remove();
        document.location.replace('/dashboard');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to delete comment',
          showConfirmButton: true,
          timer: 1500,
          confirmButtonColor: '#0d6efd'
        }); 
      }
    }
  } catch (err) {
    console.log(err)
  }
};
// gets post content and populates it in text fields
const handleGetPost = async (event) => {
  event.preventDefault();
  console.log('handleGetPost');

  const id = event.target.getAttribute('data-id');
  
  await fetch(`/api/post/${id}`, {
    method: 'GET'
  }).then(result => console.log(result.json().then(result => {
    let data = result[0];
    let id = data.id
    let title = data.title;
    let content = data.content;

    let createForm = document.getElementById('create-form');
    let updateForm = document.getElementById('update-form');
    let commentForm = document.getElementById('update-comment-form');


    if(!createForm.classList.contains('display-none')) {
      createForm.classList.add('display-none');
    }
  
    if(updateForm.classList.contains('display-none')) {
      updateForm.classList.remove('display-none');
    }
  
    if(!commentForm.classList.contains('display-none')) {
      commentForm.classList.add('display-none');
    }

    document.querySelector('#update-title').setAttribute('data-id', id);
    document.querySelector('#update-title').value = title;
    document.querySelector('#update-content').value = content;
    document.querySelector('#post-card-title').textContent = 'Update Post:';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelector('#cancel-button').addEventListener('click', () => location.reload);
    document.querySelector('#update-button').addEventListener('click', handlePostUpdate);
})))

}
// submits updated post info
const handlePostUpdate = async () => {
  console.log('handlePostUpdate');
  let id = document.querySelector('#update-title').getAttribute('data-id');
  let title = document.querySelector('#update-title').value
  let content = document.querySelector('#update-content').value

  try {
    fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(console.log('put request'))
    
  } catch (err) {
    console.log(err);
  }
};
// gets comment content and populates it in text fields
const handleGetComment = async(event) => {
  event.preventDefault();
  console.log('update comment');
  let createForm = document.getElementById('create-form');
  let updateForm = document.getElementById('update-form');
  let commentForm = document.getElementById('update-comment-form');

  if(!createForm.classList.contains('display-none')) {
    createForm.classList.add('display-none');
  }

  if(!updateForm.classList.contains('display-none')) {
    updateForm.classList.add('display-none');
  }

  if(commentForm.classList.contains('display-none')) {
    commentForm.classList.remove('display-none');
  }

  let id = event.target.getAttribute('data-id');
  document.querySelector('#update-comment').setAttribute('data-id', id);

  await fetch(`/api/comment/${id}`, {
    method: 'GET'
  }).then(result => result.json()).then(result => {
    let commentData = result;
    commentId = commentData.id;
    content = commentData.content;

    document.querySelector('#post-card-title').textContent = 'Update Comment:';
    document.querySelector('#update-comment').textContent = content;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.querySelector('#comment-cancel-button').addEventListener('click', () => location.reload)
    document.querySelector('.update-comment-button').addEventListener('click', handleCommentUpdate)
  })
}
// submits updated comment info
const handleCommentUpdate = () => {
  let id = document.querySelector('#update-comment').getAttribute('data-id')
  let content = document.querySelector('#update-comment').value

  fetch(`/api/comment/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(result => console.log(result))
}
// event listeners for create/update/delete buttons and form submits
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

let postDeleteList = document.querySelectorAll('.post-delete');
let commentDeleteList = document.querySelectorAll('.comment-delete');

postDeleteList.forEach(post => {
  post.addEventListener('click', postDeleteHandler);
});

commentDeleteList.forEach(comment => {
  comment.addEventListener('click', commentDeleteHandler);
});

let postUpdateList = document.querySelectorAll('.post-update');
let commentUpdateList = document.querySelectorAll('.comment-update');

postUpdateList.forEach(post => {
  post.addEventListener('click', handleGetPost)
});

commentUpdateList.forEach(comment => {
  comment.addEventListener('click', handleGetComment)
});
