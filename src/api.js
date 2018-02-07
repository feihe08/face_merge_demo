import axios from 'axios'
import MD5 from 'md5'
import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const AppId = '1106728456'
const AppKey = 'X4QGVbMflKS6qnNZ'

function dateNow() {
  return Math.floor(Date.now() / 1000)
}

function getReqSign(params) {
  const arr = Object.keys(params).sort().map(key => {
    return `${key}=${encodeURIComponent(params[key]).toUpperCase()}`
  })
  arr.push(`app_key=${AppKey}`)
  const md5 = MD5(arr.join('&'))
  return md5.toUpperCase()
}

export function faceMerge(imgStr) {
  const params = {
    app_id: AppId,
    time_stamp: dateNow(),
    nonce_str: 'abcfefg',
    model: 1,
    image: imgStr
  }
  const sign = getReqSign(params)
  params.sign = sign
  axios({
    method: 'post',
    url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: Object.keys(params).map(key => {
      return `${key}=${params[key]}`
    }).join('&')
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
