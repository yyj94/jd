import axios from 'axios'

export function getDatas() {
  const url = 'http://www.yeyanjie.com/test/api/data.json'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
