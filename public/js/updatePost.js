//Update Post
const updatePostFormHandler = async function (event) {
  event.preventDefault();

  // Get postId from URL
  const postId = window.location.pathname.split("/").pop();

  const post_title = document.querySelector('input[name="post_title"]').value;
  const post_body = document.querySelector('textarea[name="post_body"]').value;
  const tag_id = document.getElementById("tag-select").value;

  console.log(post_title, post_body, tag_id);
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        post_title,
        post_body,
        tag_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedPost = await response.json();
    document.location.replace(`/profile`);
  } catch (err) {
    console.error(err);
  }
};

document
  .querySelector("#update-post-form")
  .addEventListener("submit", updatePostFormHandler);
