console.log('dashboard');

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

    document.querySelector('#post-title').setAttribute('data-id', id);
    document.querySelector('#post-title').value = title;
    document.querySelector('#post-content').value = content;
    document.querySelector('#post-card-title').textContent = 'Update Post:';
    document.querySelector('#update-form').classList.remove('display-none');
    document.querySelector('#create-form').classList.add('display-none');
    // document.querySelector('#update-button').classList.remove('display-none');
    // document.querySelector('#cancel-button').classList.remove('display-none');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelector('#cancel-button').addEventListener('click', () => location.reload);
    document.querySelector('#update-button').addEventListener('click', handlePostUpdate);
})))

}

const handlePostUpdate = async () => {
  console.log('handlePostUpdate');
  const id = document.querySelector('#post-title').getAttribute('data-id');
  let title = document.querySelector('#post-title').value
  let content = document.querySelector('#post-content').value

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
  comment.addEventListener('click', commentDeleteHandler)
});