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
