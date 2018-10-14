
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
          เพิ่มข้อมูลครู / บุคลากร
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required, rules.counter]"
                  maxlength="10"
                  counter
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
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
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
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
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
                  prepend-icon="fas fa-key"
                  :append-icon="stg_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="stg_password ? 'text' : 'password'"
                  label="รหัสผ่าน"
                  value=""
                  v-model="t_password"
                  class="input-group--focused"
                  @click:append="stg_password = !stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>      
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  prepend-icon="fas fa-lock"
                  :append-icon="stg_password2 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min,rules.confirm_pass]"
                  :type="stg_password2 ? 'text' : 'password'"
                  label="ยืนยันรหัสผ่าน"
                  value=""
                  v-model="t_con_pass"
                  class="input-group--focused"
                  @click:append="stg_password2 = !stg_password2"
                ></v-text-field>
              </v-layout>
            </v-flex>     
            <v-flex xs4 >
              <v-layout align-center>
                <v-text-field 
                  prepend-icon="fas fa-users"
                  v-model="mst_1"
                  placeholder="รหัสกลุ่มการเรียนที่ 1"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs4 >
              <v-layout align-center>
                <v-text-field 
                  prepend-icon="fas fa-users"
                  v-model="mst_2"
                  placeholder="รหัสกลุ่มการเรียนที่ 2"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs4 >
              <v-layout align-center>
                <v-text-field 
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
<<<<<<< HEAD
          <v-btn round color="success" @click="teacher()">ย้อนกลับ</v-btn>
          <v-btn round color="primary" @click="teaher_add()">บันทึก</v-btn>
=======
          <v-btn flat color="red lighten-2" @click="teacher()">ย้อนกลับ</v-btn>
          <v-btn flat color="primary" @click="teaher_add()" :disabled="!formIsValid">บันทึก</v-btn>
>>>>>>> dd929714fb897c82f7b483379316d130d58b8332
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        layout:sessionStorage.getItem("cv_layout"),
        data () {
            return {
              username:sessionStorage.getItem("username"),
              t_code:"",
              t_name:"",
              t_dep:"",
              t_tel:"",
              t_username:"",
              t_password:"",
              t_con_pass:"",

              mst_1: '',
              mst_2: '',
              mst_3: '',

              stg_password: false,
              stg_password2: false,
              type_api:"",
              danger:false,
              loading: false,
              items: [],
              sh_gro1: null,
              sh_gro2: null,
              sh_gro3: null,
              group: [
              
              ],
              rules: {
                required: value => !!value || 'ห้ามว่าง.',
                // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
              }
          
          }
    
        },
        watch: {
          sh_gro1 (val) {
            val && val !== this.mst_1 && this.querySelections(val)
          },
          sh_gro2 (val) {
            val && val !== this.mst_2 && this.querySelections(val)
          },
          sh_gro3 (val) {
            val && val !== this.mst_3 && this.querySelections(val)
          }
        },
        async created(){
          let res=await this.$http.get('/group/cus_select/g_code')
          // console.log(res.data.datas)
          this.group=res.data.datas
      
        },
        methods: {
          querySelections (v) {
            this.loading = true
            setTimeout(() => {
              // this.items = this.group.filter(e => {
              //   return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
              // })
              return this.group.filter(e => e.class + '' === this.sh_gro1)
              this.loading = false
            }, 500)
          },
          async teaher_add(){
            if(this.t_code!='' && this.t_name!='' && this.t_dep!='' && this.t_tel!='' ){
              console.log("add teacher")
              let res=await this.$http.post("teacher/teacher_add",{
                t_code:this.t_code,
                t_name:this.t_name,
                t_dep:this.t_dep,
                t_tel:this.t_tel,
                t_username:this.t_username,
                t_password:this.t_password,
                username:this.username,
                mst_1:this.mst_1,
                mst_2:this.mst_2,
                mst_3:this.mst_3,
              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          teacher(){
              this.$router.push({name:"manage-teacher"})
            }
        },
        computed: {
          formIsValid () {
            if(this.t_password==this.t_con_pass && this.t_password!=""){
              return true
            }
          }
        },
    }
</script>