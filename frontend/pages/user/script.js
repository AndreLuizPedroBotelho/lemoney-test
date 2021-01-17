
axios({
  method: 'get',
  url: `${url}/offer?state=true`,
})
  .then(response => {
    const newBody = response.data.payload.map((data) => {
      getCountdown(data)
      return `
          <div class="card col-xl-3 mb-2 margin-card  col-lg-3 col-md-5 col-sm-6 col-xs-6" >
              ${data.ends_at ? `
              <div id="countdownCard${data.id}" class="countdownCard"> </div>
              ` : ''}
              ${data.premium ? `

              <div class="premiumCard">premium </div>
              ` : ''}

              <div class="card-body text-center paddingCard">
                <p class="card-text">${data.advertiser_name}</p>

                <button type="button" onclick="redirectUrl('${data.url}')"
                    class="btn text-center ${data.premium ? 'btn-success' : 'btn-secondary'} active">Shop Now</button>
              </div>
          </div>
      `
    })

    $('#cardsOffers').html(
      newBody.join("").toString()
    )
  })
  .catch(error => {
    alert('Error')
  })

function redirectUrl(url) {
  let urlOpen = url

  if (!url.match(/^http?:\/\//i) && !url.match(/^https?:\/\//i)) {
    urlOpen = 'http://' + url;
  }

  window.open(urlOpen, '_blank');
}

function getCountdown({ id, ends_at }) {
  const endsAt = new Date(ends_at)
  if (ends_at) {
    setInterval(function () {
      const display = document.querySelector(`#countdownCard${id}`);

      const now = new Date().getTime();
      var distance = endsAt - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (display) {
        display.textContent = `Expire in ${days}d ${hours}h ${minutes}m  ${seconds}s `;

        if (distance < 0) {
          clearInterval(x);
          display.textContent = "EXPIRED";
        }
      }


    }, 1000);
  }

}