let subscriptionLink = `https://fra.prvc.rocks:24222/user/`;

async function copyCrypto(data) {
  try {
    await navigator.clipboard.writeText(data);
    let copied = document.getElementById('copied');
    copied.classList.add('copied--show');
    await setTimeout(function () {
      copied.classList.remove('copied--show');
    }, 3000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

async function deleteKey() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('DELETE', '/k/<%= short_id %>', true);
  xmlhttp.onreadystatechange = async function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementsByClassName('download-profile')[0].classList.add('disabled');
      document.getElementById('deleteKey').classList.add('disabled');

      let deleted = document.getElementById('deleted');
      deleted.classList.add('deleted--show');
      await setTimeout(function () {
        deleted.classList.remove('deleted--show');
      }, 3000);
    }
  };
  xmlhttp.send();
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(subscriptionLink);
    let copied = document.getElementById('copiedLink');
    copied.classList.add('copied--show');
    await setTimeout(function () {
      copied.classList.remove('copied--show');
    }, 3000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Получаем значение параметра 'name' из URL
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(currentUrl).search);
  const user = urlParams.get('user');

  // Находим элемент на странице по его id
  const userLink = document.getElementById('subscriptionLink');
  const userName = document.getElementById('userName');

  // Вставляем значение параметра 'name' в содержимое элемента
  userLink.textContent = `https://fra.prvc.rocks:24222/user/${user}`;
  userName.textContent = user || 'random user';
  subscriptionLink = `https://fra.prvc.rocks:24222/user/${user}`;
});
