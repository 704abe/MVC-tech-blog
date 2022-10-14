// post comment function
const handleCommentSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    let post_id = document.getElementById('post-title').getAttribute('data-id');

    let content = document.querySelector('#comment-input').value.trim();
    console.log(JSON.stringify({ content, post_id }));
    if (content) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ 
          content,
          post_id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (response.ok) {
        console.log('response.ok');
        location.reload();
      } else {
        console.log('hello');
      }
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please enter a comment',
            showConfirmButton: true,
            timer: 1500,
            confirmButtonColor: '#0d6efd'
        })
    }
}

// event listener for comment submit
document.querySelector('.comment-form').addEventListener('submit', handleCommentSubmit)
