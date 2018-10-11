const express = require('express')
const router = express.Router()

module.exports = router

router.get('/list', async (req, res) => {
  try {
    let rows = await req.db('pk_student').select('*').orderBy("std_code","desc")
    res.send({
      ok: true,
      datas: rows,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})
router.get('/list_g/:g_code', async (req, res) => {
  try {
    let rows = await req.db('pk_student').select('*')
    .where({
      g_code:req.params.g_code
    })
    .orderBy("std_code","desc")
    res.send({
      ok: true,
      datas: rows,
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
      datas: row[0] || {},
    })
  }catch(e){
    res.send({ok:false,error:e.message})
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
    let log=await req.db("pk_student_log").insert({
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
      std_password:req.body.std_pin_id,

      u_id:req.body.username,
      std_log_work:"เพิ่มข้อมูล"
  })
    res.send({ok:true,txt:"เพิ่มข้อมูล "+req.body.std_code+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถเพิ่มข้อมูลได้",alt:"error"})}
})

router.post("/std_del",async (req,res)=>{//console.log(req.params.std_id)
  try{
    let std_id=await req.db("pk_student").del().where({
      std_id:req.body.std_id
    })
    let log=await req.db("pk_student_log").insert({
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
      std_password:req.body.std_pin_id,
      std_id:req.body.std_id,
      u_id:req.body.username,
      std_log_work:"ลบข้อมูล"
    })
    res.send({ok:true,txt:"ลบข้อมูล "+req.body.std_id+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถลบข้อมูลได้",alt:"error"})}
})
router.post("/std_update",async(req,res)=>{//console.log(req.body.std_id)
  try{
    let sql=await req.db("pk_student").update({
      std_code:req.body.std_code,
      std_pin_id:req.body.std_pin_id,
      std_prename:req.body.std_prename,
      std_name:req.body.std_name,
      std_lname:req.body.std_lname,
      std_birthday:req.body.std_birthday,
      std_gender:req.body.std_gender,
      std_blood:req.body.std_blood,
      g_code:req.body.g_code
    }).where({
      std_id:req.body.std_id
    })
    let log=await req.db("pk_student_log").insert({
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
      std_password:req.body.std_pin_id,
      std_id:req.body.std_id,
      u_id:req.body.username,
      std_log_work:"แก้ไขข้อมูล"
    })
    res.send({ok:true,txt:"แก้ไขข้อมูล "+req.body.std_code+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถแก้ไขข้อมูล "+req.body.std_code+" ได้",alt:"error"})}
})

