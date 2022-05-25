const express = require('express')
const router = express.Router()
const app = express()

const pool = require('../db.js').pool
const { default: axios } = require('axios')

const createReview = async (req, res) => {
    const { email, text, number } = req.body
    const { flavor, atmosphere, cheap, service } = number
    const sql = `insert into review(sidx, email, flavor, atmosphere, cheap, service, text) 
        values(3, ?, ?,?,?,?,?)`
    const param = [email, flavor, atmosphere, cheap, service, text]

    try {
        const result = await pool.execute(sql, param)
        const response = {
            errno : 0,
            result
        }
        res.json(response)
    }
    catch (e) {
        console.log(e)
        const response = {
            errno : 1
        }
        res.json(response)
    }
}

const deleteReview = async (req, res) => {
    const { idx } = req.body
    const sql = `delete from review where idx=?`
    const param = [idx]

    try {
        const result = await pool.execute(sql, param)
        const response = {
            errno : 0,
            result
        }
        res.json(response)
    }
    catch (e) {
        console.log(e)
        const response = {
            errno: 1
        }
        res.json(response)
    }
}

const updateReview = async (req, res) => {
    const { text, idx, flavor, cheap, atmosphere, service } = req.body
    const sql = `update review set text=?, flavor=?, cheap=?, atmosphere=?, service=? where idx=?`
    const param = [text, flavor, cheap, atmosphere, service, idx]

    try {
        const result = await pool.execute(sql, param)
        const response = {
            errno: 0,
            result
        }
        res.json(response)
    }
    catch (e) {
        console.log(e)
        const response = {
            errno:1
        }
        res.json(response)
    }
}

router.use('/createReview', createReview)
router.use('/deleteReview', deleteReview)
router.use('/updateReview', updateReview)

module.exports = router