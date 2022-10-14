// comment submit function
const handleCommentSubmit = async (event) => {
    console.log(event);
    event.preventDefault();

    let urlString = window.location.toString().split('/');
    // console.log('urlString', urlString);
    let post_id = urlString[urlString.length - 1];
    // console.log('post_id', post_id);

    let content = document.querySelector('#comment-input').value.trim();
    console.log(JSON.stringify({ content, post_id }));
    if (content) {
      const response = await fetch(`/api/comment/`, {
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
        console.log('response.ok line 55');
      } else {
        alert('Failed to post comment');
      }
    }
  }

// comment form submit event listener
  document.querySelector('.comment-form').addEventListener('submit', handleCommentSubmit)
