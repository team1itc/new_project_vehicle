
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
          แก้ไขข้อมูลส่วนตัว
          <v-spacer></v-spacer>
         <v-btn fab dark small color="primary"  @click="isEditing = !isEditing">
        <v-icon dark v-if="isEditing">fas fa-times</v-icon>
        <v-icon dark  v-else>edit</v-icon>
      </v-btn>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  label="รหัสประจำตัวครู / บุคลากร"
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
                  maxlength="50"
                  counter
                  label="ชื่อ นามสกุล"
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
                  maxlength="100"
                  counter
                  label="แผนกวิชา"
                  name="t_dep"
                  v-model="t_dep"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  label="เบอร์โทรศัพท์"
                  name="t_tel"
                  v-model="t_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-id-badge fa-2x"
                  label="ชื่อผู้ใช้"
                  name="t_username"
                  v-model="t_username"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required, rules.min]"
                  :append-icon="stg_password ? 'visibility' : 'visibility_off'"
                  name="t_password"
                  label="รหัสผ่าน"
                  value=""
                  v-model="t_password"
                  class="input-group--focused"
                  prepend-icon="fas fa-key fa-2x"
                   :type="stg_password ? 'text' : 'password'"
                  @click:append="stg_password = !stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="success" dask @click="teacher()">ย้อนกลับ</v-btn>
          <v-btn round color="primary" :disabled="!isEditing" @click="profile_update()">บันทึก</v-btn>

        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        layout: 'manage',
        data () {
          return {
              t_id:sessionStorage.getItem("id"),
              // t_code:sessionStorage.getItem("t_code"),
              // t_name:sessionStorage.getItem("t_name"),
              // t_dep:sessionStorage.getItem("t_dep"),
              // t_tel:sessionStorage.getItem("t_tel"),
              // t_username:sessionStorage.getItem("t_username"),
              // t_password:sessionStorage.getItem("t_password"),

            t_code:"",
            t_name:"",
            t_dep:"",
            t_tel:"",
            t_username:"",
            t_password:"",

            mst_1: '',
            mst_2: '',
            mst_3: '',

            type_api:"",
            danger:false,
            loading: false,
            conf_del:false,
            isEditing:null,
            alt_txt:"",
            stg_password: false,
            loading:false,

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
                min: v => v.length >= 8 || 'Password ไม่ควรน้อยกว่า 8 ตัวอักษร',
                emailMatch: () => ('The email and password you entered don\'t match'),

              },
          }
        },
        async created(){
          this.sh_profile()
        },
        methods:{
            async sh_profile(){
              let res=await this.$http.post('/teacher/sh_profile/',{t_id:this.t_id})
              this.t_id=this.$route.query.t_id
              this.t_code=res.data.datas.t_code
              this.t_name=res.data.datas.t_name
              this.t_dep=res.data.datas.t_dep
              this.t_tel=res.data.datas.t_tel
              this.t_username=res.data.datas.t_username
              this.t_password=res.data.datas.t_password
            
            },
            async profile_update(){
              // console.log("t_id"+sessionStorage.getItem("id"))
              let res=await this.$http.post("/teacher/profile_update",{
                
        				t_code:this.t_code,
        				t_name:this.t_name,
        				t_dep:this.t_dep,
        				t_tel:this.t_tel,
        				t_username:this.t_username,
        				t_password:this.t_password,
                t_id:sessionStorage.getItem("id"),
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