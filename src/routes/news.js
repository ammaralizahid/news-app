const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('/', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=1cf870e3b41c4b03bfdc9853c196df14`)
        res.render('news', { articles : newsAPI.data.articles  })
    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })   
            console.log(err.response.data)     
            console.log(err.response.status) 
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)   
        }
    } 
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/source?id=${articleID}&apiKey=1cf870e3b41c4b03bfdc9853c196df14`) 
        
        res.render('newsSingle', { article : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null }) 
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers) 
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2022-02-23&sortBy=publishedAtsearch=${search}&apiKey=1cf870e3b41c4b03bfdc9853c196df14`)
        res.render('newsSearch', { articles : newsAPI.data.articles  })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers) 
        } else if(err.requiest) { 
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 
