// const { Post } = require("../../models");

console.log('dashboard');
console.log(document.querySelector('#comment-delete'));
const newFormHandler = async (event) => {
  console.log('delete button');
  event.preventDefault();

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

const postDeleteHandler = async (event) => {
  event.preventDefault();
  console.log('delete post');

  if (event.target.hasAttribute('data-id')) {
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
  }
};

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

const handlePostUpdate = async (event) => {
  event.preventDefault();
  console.log('handlePostUpdate');
  try {  
    const id = event.target.getAttribute('data-id')
    const currentData = await fetch(`/api/post/${id}`, {
      method: 'GET'
    });
    console.log('currentData', currentData);
    if (event.target.hasAttribute('data-id')) {
      const id2 = event.target.getAttribute('data-id');
      const response = await fetch(`/api/post/${id2}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  } catch (err) {
    console.log(err);
  }
};
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

let postDeleteList = document.querySelectorAll('.post-delete');
// let commentDeleteList = document.querySelectorAll('.comment-delete');

postDeleteList.forEach(post => {
  post.addEventListener('click', postDeleteHandler);
});

// commentDeleteList.forEach(comment => {
//   comment.addEventListener('click', commentDeleteHandler);
// });

let postUpdateList = document.querySelectorAll('.post-update');
// let commentUpdateList = document.querySelectorAll('.comment-update');

postUpdateList.forEach(post => {
  post.addEventListener('click', handlePostUpdate)
});

// commentUpdateList.forEach(comment => {
//   comment.addEventListener('click', handleCommentUpdate)
// });