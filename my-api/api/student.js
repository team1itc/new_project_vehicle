const express = require('express')
const router = express.Router()

module.exports = router

router.get('/list', async (req, res) => {
  try {
    let rows = await req.db('pk_student').select('*')
    res.send({
      ok: true,
      student: rows,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})

router.get("/sh_std/:std_id",async(req,res)=>{
  console.log('param='+req.params.std_id)
  try{
    let db = req.db
    let row = await req.db('pk_student').select('*').where({
      std_id: req.params.std_id
    })
    res.send({
      ok:true,
      student: row[0] || {},
    })
  }catch(e){
    res.send({ok:false,error:e.message})
  }
})

// /api/student/save
router.post('/save', async (req, res) => {
  try {
    // TODO: check

    // INSERT
    let id = await req.db('student').insert({
      code: req.body.code || '',
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
    }).then(ids => ids[0])

    res.send({
      ok: true,
      id,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})
router.post("/std_add",async (req,res)=>{
  try{
    let std_id=await req.db("pk_student").insert({
      	std_code:req.body.std_code,
        std_gender:req.body.std_gender,
        std_prename:req.body.std_prename,
        std_name:req.body.std_name,
        std_lname:req.body.std_lname,
        std_pin_id:req.body.std_pin_id,
        std_birthday:req.body.std_birthday,
      	std_blood:req.body.std_blood,
      	g_code:req.body.g_code,
      	std_username:req.body.std_code,
      	std_password:req.body.std_pin_id
    })
    res.send({ok:true,txt:"เพิ่มข้อมูล "+req.body.std_code+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถเพิ่มข้อมูลได้",alt:"error"})}
})


//   /api/student/save
router.post('/save', async (req, res) => {
  let db = req.db
  // UPDATE student SET first_name=?, last_name=? WHERE id=7
  await db('student').where({id: req.body.id}).update({
    name: req.body.name,
    phone: req.body.phone,
  })
  // let ids = await db('student').insert({
  //   code: '',
  //   first_name: '',
  //   last_name: '',
  // })
  // let id = ids[0]
  res.send({ok: true})
})

router.delete('/:id', function (req, res) {
  req.db('student').where({id: req.params.id}).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})
router.post('/save2', (req, res) => {
  let db = req.db  
  db('t1').insert({}).then(ids => {
    let id = ids[0]
    Promise.all([
      db('t2').insert({}).catch(),
      db('t3').insert({}).catch(),
    ]).then(() => {
      res.send({status: true})
    }).catch(err => {
      res.send({status: false})
    })    
  })
  console.log('ok')
})
router.get('/save3', async (req, res) => {
  try {
    let db = req.db  
    let ids = await db('t1').insert({})
    await Promise.all([
      db('t2').insert({}),
      db('t3').insert({})
    ])
    res.send({status: true})
  } catch (e) {
    res.send({status: false})
  }
})
router.get('/about', function (req, res) {
  res.send('About birds')
})

