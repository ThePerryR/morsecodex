const uploadFile = (file, signedRequest, url, resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', signedRequest)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(url)
      } else {
        reject('Could not upload file.')
      }
    }
  }
  xhr.send(file)
}

export default (file, user) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `/sign-s3?file-name=${Date.now() + user.id}&file-type=${file.type}`)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        uploadFile(file, response.signedRequest, response.url, resolve, reject)
      } else {
        reject()
        alert('Could not get signed URL.')
      }
    }
  }
  xhr.send()
})
