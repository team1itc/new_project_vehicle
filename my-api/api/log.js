const express = require('express')
const router = express.Router()

module.exports = router


router.get('/department', async (req, res) => {
  try {
    let rows = await req.db('pk_department_log').select('*').orderBy("d_log_date","desc")
    res.send({
      ok: true,
      datas: rows,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})
router.get('/group', async (req, res) => {
    try {
      let rows = await req.db('pk_group_log').select('*').orderBy("g_log_date","desc")
      res.send({
        ok: true,
        datas: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
})
router.get('/machine', async (req, res) => {
    try {
      let rows = await req.db('pk_machine_log').select('*').orderBy("mc_log_date","desc")
      res.send({
        ok: true,
        datas: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
})
router.get('/teacher', async (req, res) => {
    try {
      let rows = await req.db('pk_teacher_log').select('*').orderBy("t_log_date","desc")
      res.send({
        ok: true,
        datas: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
})
router.get('/student', async (req, res) => {
    try {
      let rows = await req.db('pk_student_log').select('*').orderBy("std_log_date","desc")
      res.send({
        ok: true,
        datas: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
})