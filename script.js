console.log("connected");

let post_btn = document.querySelector("#post-btn")

post_btn.addEventListener('click', (e) => {
    let posts_box = document.querySelector(".posts") //posts box
    let main_post = document.createElement('div');
    main_post.id = 'post-' + new Date().getTime();
    main_post.innerHTML = `<div class="main-post">
    <div class="post-main">
        <div class="prof-img">
            <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739" alt="#">
        </div>
        <div class="post-right">    
            <div class="post-det">
                <h4>Name</h4>
                <h5>@user</h5>
                <div class="post-right-btns">
                    <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661" alt="#" id="edit-btn">
                    <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/030/original/delete-color-filled.png?1706888714" alt="#" id="delete-btn">
                </div>
            </div>
            
            <div class="post-txt-area">
                <textarea name="post" id="post-area-text" cols="30" rows="10" disabled = "disabled"></textarea>
            </div>
            
            <div class="like-cmnt-btns">
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/026/original/comment.png?1706888619" alt="#" id="comment-btn">
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679" alt="#" id="like-btn">
                <span>0</span>
            </div>
        </div>
    </div>`
    posts_box.appendChild(main_post);

    let post_area_text = main_post.querySelector('#post-area-text');
    post_area_text.value = document.querySelector('#post-area').value;

    let edit_btn = main_post.querySelector('#edit-btn');
    edit_btn.addEventListener('click', () => {
        editPost(main_post.id);
    });

    let delete_btn = main_post.querySelector('#delete-btn');
    delete_btn.addEventListener('click', () => {
        deletePost(main_post.id);
    });

    let comment_btn = main_post.querySelector('#comment-btn');
    comment_btn.addEventListener('click', () => {
        let commentText = prompt('Enter your comment:');
        if (commentText) {
            addComment(main_post.id, commentText);
        }
    });

    let like_btn = main_post.querySelector('#like-btn');
    like_btn.addEventListener('click', () => {
        likePost(main_post.id);
    });
});

function editPost(postId) {
    const post = document.getElementById(postId);

    const postText = post.querySelector('.post-txt-area textarea').value;

    const textarea = document.createElement('textarea');
    textarea.value = postText;

    post.querySelector('.post-txt-area').replaceWith(textarea);

    textarea.focus();

    textarea.addEventListener('blur', () => {

        const updatedText = textarea.value;


        const updatedPostTextarea = document.createElement('div');
        updatedPostTextarea.classList.add('post-txt-area');
        updatedPostTextarea.innerHTML = `<textarea name="post" id="post-area-text" cols="30" rows="10" disabled = "disabled">${updatedText}</textarea>`;


        textarea.replaceWith(updatedPostTextarea);
    });
}

function deletePost(postId) {

    const post = document.getElementById(postId);


    post.remove();
}

function addComment(postId, commentText) {

    const post = document.getElementById(postId);

    const commentContainer = post.querySelector('.comment-post');

    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `<div class="prof-img">
                              <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739" alt="#">
                          </div>
                          <div class="post-right">    
                              <div class="post-det">
                                  <h4>Name</h4>
                                  <h5>@user</h5>
                                  <div class="post-right-btns">
                                      <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661" alt="#">
                                      <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/030/original/delete-color-filled.png?1706888714" alt="#">
                                  </div>
                              </div>
  
                              <div class="post-txt-area">
                                  <textarea name="post" id="post-area-text" cols="30" rows="10" disabled = "disabled">${commentText}</textarea>
                              </div>
  
                              <div class="like-cmnt-btns">
                                  <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679" alt="#">
                              </div>
                          </div>`;


    commentContainer.parentElement.insertBefore(comment, commentContainer);
}

function likePost(postId) {
    const post = document.getElementById(postId);
    const likeBtn = post.querySelector('#like-btn');
    const likeCount = post.dataset.likes || 0;

    post.classList.toggle('liked');
    likeBtn.classList.toggle('liked');

    const newLikeCount = post.classList.contains('liked') ? likeCount + 1 : likeCount - 1;

    post.dataset.likes = newLikeCount;
    likeBtn.nextElementSibling.textContent = newLikeCount;

}

document.querySelector('#post-area').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('#post-btn').click();
    }
});