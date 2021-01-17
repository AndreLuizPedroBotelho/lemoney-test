function submit(event) {
  event.preventDefault();

  const advertiser_name = document.getElementById('advertiser_name').value
  const urlI = document.getElementById('url').value
  const description = document.getElementById('description').value
  const starts_at = document.getElementById('starts_at').value

  const ends_at = document.getElementById('ends_at').value ? document.getElementById('ends_at').value : undefined
  const premium = document.querySelector('#premium').checked
  const id = document.getElementById('id').value

  const conditionMethods = !id ?
    { method: 'post', url: `${url}/offer` } :
    { method: 'put', url: `${url}/offer/${id}` }

  axios({
    method: conditionMethods.method,
    url: conditionMethods.url,
    data: {
      advertiser_name,
      url: urlI,
      description,
      starts_at,
      ends_at,
      premium
    }
  }).then(response => {
    loadOffer()
    $('#saveOfferModal').modal('toggle');
  })
    .catch(error => {
      console.log(error)
    });

}

$("#saveForm").submit(submit);

function openModal() {
  $('#saveForm').trigger("reset");
  document.getElementById('id').value = ''

  $('#saveOfferModal').modal();

  document.getElementById('title-modal').innerHTML = 'New Offer'

}

function getDate(date) {
  const newDate = new Date(date)

  const day = ('0' + newDate.getDate().toString()).slice(-2)
  const year = newDate.getFullYear().toString()
  const month = ('0' + (newDate.getMonth() + 1)).slice(-2)

  return `${year}-${month}-${day}`
}

function editModal(id) {
  axios.get(`${url}/offer/${id}`)
    .then(response => {
      openModal()

      document.getElementById('advertiser_name').value = response.data.payload.advertiser_name
      document.getElementById('url').value = response.data.payload.url
      document.getElementById('description').value = response.data.payload.description
      document.getElementById('id').value = response.data.payload.id
      document.getElementById('starts_at').value = getDate(response.data.payload.starts_at)
      document.getElementById('ends_at').value = response.data.payload.ends_at ? getDate(response.data.payload.ends_at) : ''
      document.querySelector('#premium').checked = response.data.payload.premium
      document.getElementById('title-modal').innerHTML = 'Edit Offer'

    })
    .catch(error => {
      console.log(error)
    })
}

function destroy(id) {
  axios.delete(`${url}/offer/${id}`)
    .then(response => {
      loadOffer()
    })
    .catch(error => {
      console.log(error)
    })
}

function changeStatus(id, active) {

  axios.put(`${url}/offerChangeActive/${id}`, { active: active })
    .then(response => {
      loadOffer()
    })
    .catch(error => {
      console.log(error)
    })
}

function loadOffer() {
  axios({
    method: 'get',
    url: `${url}/offer`
  })
    .then(response => {

      const newBody = response.data.payload.map((data) => {
        return `
        <tr>
          <td>${data.id}</td>
          <td>${data.advertiser_name}</td>
          <td>${data.url}</td>
          <td>${data.state ? 'enable' : 'disabled'}</td>
          <td>
            <button type="button" class="btn btn-primary" onclick="editModal(${data.id})">
              Edit
            </button>
            <button type="button" class="btn btn-secondary" onclick="changeStatus(${data.id},${!data.active})">
              ${!data.active ? 'Enable' : 'Disabled'}
            </button>
            <button type="button" class="btn btn-danger" onclick="destroy(${data.id})">
              Destroy
            </button>
          </td>
        </tr>`
      })

      $('#tableOffer tbody').html(
        newBody.join("").toString()
      )
    })
    .catch(error => {
      console.log(error)
    })
}

loadOffer()