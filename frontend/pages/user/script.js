
axios({
  method: 'get',
  url: `${url}/offer?state=true`,
})
  .then(response => {

    const newBody = response.data.payload.map((data) => {
      return `
          <div class="card col-xl-3 mb-2 margin-card  col-lg-3 col-md-5 col-sm-6 col-xs-6" >

    ${data.premium ? '<div class="premiumCard">premium </div>' : ''}

    <div class="card-body text-center">
      <p class="card-text">${data.advertiser_name}</p>

      <a href="${!data.url.includes('http://') ? 'http://' : ''}${data.url}" target="_blank" class="btn text-center btn-primary active">Shop Now</a>
    </div>
  </div>`
    })

    $('#cardsOffers').html(
      newBody.join("").toString()
    )
  })
  .catch(error => {
    alert(error)
  })
