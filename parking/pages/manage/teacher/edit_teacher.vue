
<template>
    <v-card>
       <v-alert
        v-model="danger"
        dismissible
        :type=type_api
      >
        {{alt_txt}}
      </v-alert>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          แก้ไขข้อมูลครู / บุคลากร
          <v-spacer></v-spacer>
          <v-btn fab dark small color="primary"  @click="isEditing = !isEditing">
        <v-icon dark v-if="isEditing">fas fa-times</v-icon>
        <v-icon dark  v-else>edit</v-icon>
      </v-btn>
          <v-dialog v-model="conf_del" persistent max-width="290">
           <v-btn fab dark small color="red" slot="activator">
           <v-icon dark>fas fa-trash-alt</v-icon>
           </v-btn>
            <!-- <v-btn slot="activator" flat color="red lighten-2"><i class="fas fa-trash-alt fa-2x"></i></v-btn> -->
            <v-card>
              <v-card-title class="headline">ยืนยันการลบข้อมูล</v-card-title>
              <v-card-text>ต้องการลบข้อมูลรหัส {{t_code}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="teacher_del()">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  maxlength="10"
                  counter
                  :rules="[rules.required, rules.counter]"
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="รหัสประจำตัวครู / บุคลากร"
                  name="t_code"
                  v-model="t_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-user fa-2x"
                  placeholder="ชื่อ นามสกุล"
                  name="t_name"
                  v-model="t_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-archway fa-2x"
                  placeholder="แผนกวิชา"
                  name="t_dep"
                  v-model="t_dep"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required, rules.counter]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  placeholder="เบอร์โทรศัพท์"
                  name="t_tel"
                  v-model="t_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  prepend-icon="fas fa-key"
                  :append-icon="stg_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="stg_password ? 'text' : 'password'"
                  label="รหัสผ่าน"
                  v-model="t_password"
                  @click:append="stg_password = !stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>      
            <v-flex xs4 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  prepend-icon="fas fa-users"
                  v-model="mst_1"
                  placeholder="รหัสกลุ่มการเรียนที่ 1"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs4 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  prepend-icon="fas fa-users"
                  v-model="mst_2"
                  placeholder="รหัสกลุ่มการเรียนที่ 2"
                ></v-text-field>
              </v-layout>
            </v-flex>
           <v-flex xs4 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  prepend-icon="fas fa-users"
                  v-model="mst_3"
                  placeholder="รหัสกลุ่มการเรียนที่ 3"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="success" @click="teacher()">ย้อนกลับ</v-btn>
          <v-btn round color="primary" :disabled="!isEditing" @click="teacher_update(t_id)">บันทึก</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        layout:sessionStorage.getItem("cv_layout"),
        data () {
          return {
            username:sessionStorage.getItem("username"),
            t_id:'',
            t_code:"",
            t_name:"",
            t_dep:"",
            t_tel:"",
            t_password:"",

            mst_1: '',
            mst_2: '',
            mst_3: '',

            stg_password: false,
            type_api:"",
            danger:false,
            loading: false,
            conf_del:false,
            isEditing:null,
            alt_txt:"",

            gro1: [
              'IT A1'
            ],
            gro2: [
              'IT B1'
            ],
            gro3: [
             'IT C1'
            ],
            rules: {
              required: value => !!value || 'ห้ามว่าง.',
              // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            }
          }
        },
        async created(){
          this.sh_teacher()
        },
        methods:{
            conf_del(){this.conf_del=true},
            async teacher_del(){
              let res=await this.$http.post('/teacher/teacher_del',{
                t_code:this.t_code,
        				t_name:this.t_name,
        				t_dep:this.t_dep,
        				t_tel:this.t_tel,
        				t_password:this.t_password,
                t_id:this.$route.query.t_id,
                mst_1:this.mst_1,
                mst_2:this.mst_2,
                mst_3:this.mst_3,
                username:this.username
              })
              if(res.data.ok==true){this.$router.push({name:"manage-teacher"})}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            async sh_teacher(){
              let res=await this.$http.get('/teacher/sh_teacher/'+this.$route.query.t_id)
              this.t_id=this.$route.query.t_id
              this.t_code=res.data.datas.t_code
              this.t_name=res.data.datas.t_name
              this.t_dep=res.data.datas.t_dep
              this.t_tel=res.data.datas.t_tel
              this.t_password=res.data.datas.t_password

              this.mst_1=res.data.msts1.g_code
              this.mst_2=res.data.msts2.g_code
              this.mst_3=res.data.msts3.g_code
            
            },
            async teacher_update(t_id){
              //console.log("t_id"+t_id)
              let res=await this.$http.post("/teacher/teacher_update",{
                
        				t_code:this.t_code,
        				t_name:this.t_name,
        				t_dep:this.t_dep,
        				t_tel:this.t_tel,
        				t_password:this.t_password,
                t_id:t_id,
                mst_1:this.mst_1,
                mst_2:this.mst_2,
                mst_3:this.mst_3,
                username:this.username
              })
              console.log(res.data)
                if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	 else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            teacher(){
              this.$router.push({name:"manage-teacher"})
            }
        }
    }
</script>