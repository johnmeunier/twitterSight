chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    document.querySelector(".form-element__input[name='title']").value = request.title;
    document.querySelector(".form-element__input[name='url']").value = request.url;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPageSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;

const _formatValue = (value) => `${value}%0A%0A`;

const _buildTwitterURL = (title, comment, url, hashtags) => `https://twitter.com/intent/tweet?text=${title && _formatValue(title)}${comment && _formatValue(comment)}${url && _formatValue(url)}${hashtags.replace(/#/g, '%23')}`;

document.querySelector('.form-submit').addEventListener('click', () => {
  const title = document.querySelector(".form-element__input[name='title']").value;
  const comment = document.querySelector(".form-element__input[name='comment']").value;
  const url = document.querySelector(".form-element__input[name='url']").value;
  const hashtags = document.querySelector(".form-element__input[name='hashtags']").value;
  window.open(_buildTwitterURL(title, comment, url, hashtags), "_blank");
})