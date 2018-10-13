const express = require('express')
const router = express.Router()

module.exports = router


router.get('/list', async (req, res) => {
  try {
    let rows = await req.db('pk_feed').select('*').orderBy("f_id","desc")
    res.send({
      ok: true,
      datas: rows,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})
router.get('/cus_select/:select', async (req, res) => {//console.log(req.params.select)
    try {
      let rows = await req.db('pk_department').select(req.params.select)
      res.send({
        ok: true,
        datas: rows,
      })
    }catch(e){res.send({ ok: false, error: e.message })}
  })

router.get("/sh_dep/:d_id",async(req,res)=>{
  console.log('param='+req.params.d_id)
  try{
    let db = req.db
    let row = await req.db('pk_department').select('*').where({
      d_id: req.params.d_id
    })
    res.send({
      ok:true,
      datas: row[0] || {},
    })
  }catch(e){
    res.send({ok:false,error:e.message})
  }
})

router.post("/dep_add",async (req,res)=>{//console.log("u_id="+req.body.u_id)
  try{
    let d_id=await req.db("pk_department").insert({
      	d_code:req.body.d_code,
        d_name:req.body.d_name,
      
    })
    let log=await req.db("pk_department_log").insert({
      d_id:d_id,
      d_code:req.body.d_code,
      d_name:req.body.d_name,
      u_id:req.body.username,
      d_log_work:"เพิ่มข้อมูล",

    })
    res.send({ok:true,txt:"เพิ่มข้อมูล "+req.body.d_name+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถเพิ่มข้อมูล "+req.body.d_name+" ได้",alt:"error"})}

  
  
})

router.post("/dep_del",async (req,res)=>{
  console.log("log="+req.body)
  try{
    let d_id=await req.db("pk_department").del().where({
      d_id:req.body.d_id
    })
    let log=await req.db("pk_department_log").insert({
      d_id:req.body.d_id,
      d_code:req.body.d_code,
      d_name:req.body.d_name,
      u_id:req.body.username,
      d_log_work:"ลบข้อมูล"
    })
    res.send({ok:true,txt:"ลบข้อมูล "+req.body.d_id+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถลบข้อมูลได้",alt:"error"})}
})
router.post("/dep_update",async(req,res)=>{//console.log(req.body.d_id)
  try{
    let sql=await req.db("pk_department").update({
        d_code:req.body.d_code,
        d_name:req.body.d_name,

    }).where({
      d_id:req.body.d_id
    })
    let log=await req.db("pk_department_log").insert({
      d_id:req.body.d_id,
      d_code:req.body.d_code,
      d_name:req.body.d_name,
      u_id:req.body.username,
      d_log_work:"แก้ไขข้อมูล"
    })
    res.send({ok:true,txt:"แก้ไขข้อมูล "+req.body.d_name+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถแก้ไขข้อมูล "+req.body.d_name+" ได้",alt:"error"})}
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
// router.get('/save3', async (req, res) => {
//   try {
//     let db = req.db  
//     let ids = await db('t1').insert({})
//     await Promise.all([
//       db('t2').insert({}),
//       db('t3').insert({})
//     ])
//     res.send({status: true})
//   } catch (e) {
//     res.send({status: false})
//   }
// })