
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
          เพิ่มข้อมูลนักเรียน / นักศึกษา
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="รหัสประจำตัวนักเรียน / นักศึกษา"
                  name="std_code"
                  v-model="std_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="13"
                  counter
                  prepend-icon="fas fa-id-card fa-2x"
                  placeholder="รหัสประจำตัวประชาชน"
                  name="std_pin_id"
                  v-model="std_pin_id"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
               <v-text-field
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-th"
                  placeholder="รหัสกลุ่มการเรียน"
                  name="g_code"
                  v-model="g_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
           <v-flex xs4>
              <v-select
                :items="item_pre_name"
                v-model="std_prename"
                menu-props="auto"
                label="คำนำหน้าชื่อ"
                hide-details
                prepend-icon="fas fa-user"
                ></v-select>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon=""
                  placeholder="ชื่อ"
                  name="std_name"
                  v-model="std_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon=""
                  placeholder="นามสกุล"
                  name="std_lname"
                  v-model="std_lname"
                ></v-text-field>
            </v-flex>
           <v-flex xs6>

             <v-dialog
                    ref="modal"
                    v-model="modal"
                    :return-value.sync="std_birthday"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >

                <v-text-field
                  slot="activator"
                  v-model="dateFormatted"
                  label="วัน/เดือน/ปีเกิด"
                  prepend-icon="fas fa-birthday-cake"
                  @blur="date = parseDate(dateFormatted)"
                  hint="วัน/เดือน/ปีเกิด"
                  persistent-hint
                ></v-text-field>
                <v-date-picker
                  locale="th"             
                  ref="picker"
                  v-model="std_birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.modal.save(std_birthday)">OK</v-btn></v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs6>
                <v-select
                  :items="bld"
                  v-model="std_blood"
                  menu-props="auto"
                  label="หมู่เลือด"
                  hide-details
                  prepend-icon="fas fa-hospital"
                  ></v-select>
              </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red lighten-2" @click="student()">ยกเลิก</v-btn>
          <v-btn flat color="primary" @click="std_add">บันทึก</v-btn>
        </v-card-actions>
        
    </v-card>
    
</template>

<script>
    export default {
        layout: 'manage',

        data () {
            return {
              username:sessionStorage.getItem("username"),
              std_code:"",
              std_gender:"",
              std_prename:"",
              std_name:"",
              std_lname:"",
              std_pin_id:"",
              std_birthday:"",
              std_blood:"",
              g_code:"",
              type_api:"",
              danger:false,
              alt_txt:"",
              item_group:[],
              bld:['A', 'B', 'O','AB' ],
              item_pre_name:['นาย','นางสาว','นาง',],
              rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                    // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
              },
              modal: false,
              date: null,
              dateFormatted: null,
              menu1: false,

          }
        },
        async created(){
          this.sh_group()
        },
        watch:{
          std_prename(newValue){
            if(newValue=="นาย"){this.std_gender="ช"}else{this.std_gender="ญ"}
          },
           std_birthday (val) {
      this.dateFormatted = this.formatDate(this.std_birthday)
    },
          modal (val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
          },
        },
        methods:{
          async std_add(){
            let res= await this.$http.post('student/std_add',{
              std_code:this.std_code,
              std_gender:this.std_gender,
              std_prename:this.std_prename,
              std_name:this.std_name,
              std_lname:this.std_lname,
              std_pin_id:this.std_pin_id,
              std_birthday:this.dateFormatted,
              std_blood:this.std_blood,
              g_code:this.g_code,
              username:this.username
            })
            if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_group(){
            let res=await this.$http.get('/group/list/')
          },
          student(){
                  this.$router.push({name:"manage-student"})
                },
          formatDate (std_birthday) {
            if (!std_birthday) return null

            const [year, month, day] = std_birthday.split('-')
            return `${day}/${month}/${year}`
          },
          parseDate (std_birthday) {
            if (!std_birthday) return null

            const [month, day, year] = std_birthday.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
          }
              },
          computed: {
          computedDateFormatted () {
            return this.formatDate(this.std_birthday)
          }
        },

    }
    
</script>