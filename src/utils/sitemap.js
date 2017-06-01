import fs from 'fs'
import path from 'path'
import 'isomorphic-fetch'

import Lesson from '../schemas/lesson'

export default function () {
  return new Promise((resolve, reject) => {
    let sitemap =
      `https://www.teachok.com
https://www.teachok.com/login
`
    let urlCount = 2
    let totalCount = 2
    let sendIndex = 0
    const urls = []

    const addUrl = url => {
      sitemap +=
        `${url}
`
      urlCount++
      totalCount++
      if (urlCount >= 50000) {
        finish()
      }
    }

    const finish = (cb) => {
      fs.writeFile(path.join(__dirname, '../public', `sitemap${sendIndex}.txt`), sitemap, function (err) {
        if (err) {
          return reject(err)
        }
        const url = `http://www.google.com/ping?sitemap=${encodeURIComponent(`https://www.teachok.com/sitemap${sendIndex}.txt`)}`
        urls.push(url)
        fetch(url)

        sendIndex++
        sitemap = ``
        urlCount = 0
        if (cb) {
          cb()
        }
      })
    }

    Lesson.find({active: true, private: false}, (err, lessons) => {
      if (err) {
        return reject(err)
      }
      if (lessons) {
        lessons.forEach(lesson => {
          addUrl(`https://www.teachok.com/lesson/${lesson._id}`)
        })
        finish(() => {
          resolve({success: true, urls: totalCount})
        })
      }
    })
  })
}
