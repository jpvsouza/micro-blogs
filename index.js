import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';

fetch(USERS_API).then((response) =>
  response.json().then((data) => {
    fillUsersSelect(data.users)
  })
).catch(error => fillErrorMessage(error.message));

usersSelect.addEventListener('change', () => {
  clearPageData();

  // faça a lógica para pegar as informações dos posts da pessoa selecionada e dos comentários do post destacado aqui.
  const id = usersSelect.value;
  fetch(USERS_API + `/${id}/posts`).then((response) =>
    response.json().then((data) => {
      fillPosts(data.posts)
      const postId = data.posts[0].id;
      const POST_COMMENTS_URL = `https://dummyjson.com/posts/${postId}/comments`;

      fetch(POST_COMMENTS_URL).then(response => response.json())
      .then(data => fillFeaturedPostComments(data.comments))
    })
    .catch(error => fillErrorMessage(error.message))
  )
});
