const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', async (req,res)=>{
    consolr.log("teacher")
})
router.get('/list', async (req, res) => {
  try {
    let rows = await req.db('pk_teacher').select('*').orderBy("t_id","desc")
    res.send({
      ok: true,
      datas: rows,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})

router.get("/sh_teacher/:t_id",async(req,res)=>{
  let id=req.params.t_id
  // console.log('param='+id)
  try{
    let db = req.db
    let row = await req.db('pk_teacher').select('*').where({
      t_id: id
    })
    let mst = await req.db('pk_match_std_tch').select('g_code').where({
      t_id: id
    })
    res.send({
      ok:true,
      datas: row[0] || {},
      msts1:mst[0] || {},
      msts2:mst[1] || {},
      msts3:mst[2] || {}
    })
  }catch(e){
    res.send({ok:false,error:e.message})
  }
})

router.post("/sh_profile/",async(req,res)=>{
  // console.log('param='+req.params.t_id)
  try{
    let db = req.db
    let row = await req.db('pk_teacher').select('*').where({
      t_id: req.body.t_id
    })
    res.send({
      ok:true,
      datas: row[0] || {},
    })
  }catch(e){
    res.send({ok:false,error:e.message})
  }
})

router.get("/sh_select_id/:t_id",async(req,res)=>{
  console.log('param='+req.params.t_id)
  try{
    let db = req.db
    let row = await req.db('pk_teacher').select('*').where({
      t_id: req.params.t_id
    })
    res.send({
      ok:true,
      datas: row[0] || {},
    })
  }catch(e){
    res.send({ok:false,error:e.message})
  }
})

router.post("/teacher_add",async (req,res)=>{
  try{
    let t_id=await req.db("pk_teacher").insert({
      	t_code:req.body.t_code,
        t_name:req.body.t_name,
        t_dep:req.body.t_dep,
        t_tel:req.body.t_tel,
      	t_username:req.body.t_code,
      	t_password:req.body.t_password
    })
    if(req.body.mst_1!=""){
      let mst1=await req.db("pk_match_std_tch").insert({
        t_id:t_id,
        g_code:req.body.mst_1,
      })
    }
    if(req.body.mst_2!=""){
      let mst2=await req.db("pk_match_std_tch").insert({
        t_id:t_id,
        g_code:req.body.mst_2,
      })
    }
    if(req.body.mst_3!=""){
      let mst3=await req.db("pk_match_std_tch").insert({
        t_id:t_id,
        g_code:req.body.mst_3,
      })
    }
    let log=await req.db("pk_teacher_log").insert({
        t_id:t_id,
      	t_code:req.body.t_code,
        t_name:req.body.t_name,
        t_dep:req.body.t_dep,
        t_tel:req.body.t_tel,
      	t_username:req.body.t_code,
        t_password:req.body.t_password,
        t_log_work:"เพิ่มข้อมูล",
        u_id:req.body.username,

    })
    res.send({ok:true,txt:"เพิ่มข้อมูล "+req.body.t_code+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถเพิ่มข้อมูลได้",alt:"error"})}
})

router.post("/teacher_del",async (req,res)=>{//console.log(req.params.t_id)
  try{
    let t_id=await req.db("pk_teacher").del().where({
      t_id:req.body.t_id
    })
    let mst1=await req.db("pk_match_std_tch").del().where({
      t_id:req.body.t_id
    })
    let log=await req.db("pk_teacher_log").insert({
      t_id:req.body.t_id,
      t_code:req.body.t_code,
      t_name:req.body.t_name,
      t_dep:req.body.t_dep,
      t_tel:req.body.t_tel,
      t_username:req.body.t_code,
      t_password:req.body.t_password,
      t_log_work:"ลบข้อมูล",
      u_id:req.body.username,

  })
    res.send({ok:true,txt:"ลบข้อมูล "+req.body.t_id+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถลบข้อมูลได้",alt:"error"})}
})
router.post("/teacher_update",async(req,res)=>{//console.log(req.body.t_id)
  try{
    let sql=await req.db("pk_teacher").update({
        t_code:req.body.t_code,
        t_name:req.body.t_name,
        t_dep:req.body.t_dep,
        t_tel:req.body.t_tel,
      	t_username:req.body.t_code,
      	t_password:req.body.t_password
    }).where({
      t_id:req.body.t_id
    })
    if(req.body.mst_1!=""){
      let mst1=await req.db("pk_match_std_tch").insert({
        g_code:req.body.mst_1,
        t_id:req.body.t_id
      })
    }
    if(req.body.mst_2!=""){
      let mst2=await req.db("pk_match_std_tch").insert({
        g_code:req.body.mst_2,
        t_id:req.body.t_id
      })
    }
    if(req.body.mst_3!=""){
      let mst3=await req.db("pk_match_std_tch").insert({
        g_code:req.body.mst_3,
        t_id:req.body.t_id
      })
    }
    let log=await req.db("pk_teacher_log").insert({
      t_id:req.body.t_id,
      t_code:req.body.t_code,
      t_name:req.body.t_name,
      t_dep:req.body.t_dep,
      t_tel:req.body.t_tel,
      t_username:req.body.t_code,
      t_password:req.body.t_password,
      t_log_work:"แก้ไขข้อมูล",
      u_id:req.body.username,

  })
    res.send({ok:true,txt:"แก้ไขข้อมูล "+req.body.t_code+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถแก้ไขข้อมูล "+req.body.t_code+" ได้",alt:"error"})}
})

router.post("/profile_update",async(req,res)=>{//console.log(req.body.username)
  try{
    let sql=await req.db("pk_teacher").update({
        t_code:req.body.t_code,
        t_name:req.body.t_name,
        t_dep:req.body.t_dep,
        t_tel:req.body.t_tel,
    }).where({
      t_id:req.body.t_id
    })
    
    let log=await req.db("pk_teacher_log").insert({
      t_id:req.body.t_id,
      t_code:req.body.t_code,
      t_name:req.body.t_name,
      t_dep:req.body.t_dep,
      t_tel:req.body.t_tel,
      t_password:req.body.t_password,
      t_log_work:"แก้ไขข้อมูล",
      u_id:req.body.username

  })
    res.send({ok:true,txt:"แก้ไขข้อมูล "+req.body.t_code+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถแก้ไขข้อมูล "+req.body.t_code+" ได้",alt:"error"})}
})

router.post("/select_id",async(req,res)=>{ console.log("joy"+req.body.t_id)
  try{
    let sql=await req.db("pk_teacher").update({
      	t_password:req.body.t_password
    }).where({
      t_id:req.body.t_id
    })
    let log=await req.db("pk_teacher_log").insert({
      t_id:req.body.t_id,
      t_password:req.body.t_password,
      t_log_work:"แก้ไขข้อมูล",
      u_id:req.body.t_username
    })
    
    res.send({ok:true,txt:"แก้ไขข้อมูล "+req.body.t_password+" สำเร็จ",alt:"success"})
  }catch(e){res.send({ok:false,txt:"ไม่สามารถแก้ไขข้อมูล "+req.body.t_password+" ได้",alt:"error"})}
})