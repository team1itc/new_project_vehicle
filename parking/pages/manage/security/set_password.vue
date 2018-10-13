
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
          ตั้งค่าความปลอดภัย 
          <v-spacer></v-spacer>
          <v-btn
            color="green lighten-2"
            flat
            @click="isEditing = !isEditing"
          >
            <i v-if="isEditing" class="fas fa-times fa-2x"></i>
            <i v-else class="fas fa-edit fa-2x "></i>
          </v-btn>
          <v-dialog v-model="conf_del" persistent max-width="290">
            <v-btn slot="activator" flat color="red lighten-2"><i class="fas fa-trash-alt fa-2x"></i></v-btn>
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
                  :append-icon="stg_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="stg_password ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  value=""
                  v-model="password"
                  class="input-group--focused"
                  @click:append="stg_password = !stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>      
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :append-icon="stg_password2 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min,rules.confirm_pass]"
                  :type="stg_password2 ? 'text' : 'password'"
                  name="conf_pass"
                  label="Confirm Password"
                  value=""
                  v-model="conf_pass"
                  class="input-group--focused"
                  @click:append="stg_password2 = !stg_password2"
                ></v-text-field>
              </v-layout>
            </v-flex>      
            
        
           
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red lighten-2" >ยกเลิก</v-btn>
          <v-btn flat color="primary" @click="select_id(t_id)" :disabled="!formIsValid">บันทึก</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        layout:sessionStorage.getItem("cv_layout"),

        data () {
            return {
              t_username:sessionStorage.getItem("username"),
              t_password:sessionStorage.getItem("password"),
              t_id:sessionStorage.getItem("id"),
              
              stg_password: false,
              stg_password2: false,
              password:"",
              conf_pass:"",
              
              // isEditing:"",
              // isLoading: false,
              // form: false,

              type_api:"",
              danger:false,
              loading: false,
              conf_del:false,
              isEditing:null,
              alt_txt:"",
              
              rules: {
                required: value => !!value || 'ห้ามว่าง.',
                min: v => v.length >= 8 || 'Password ไม่ควรน้อยกว่า 8 ตัวอักษร',
                emailMatch: () => ('The email and password you entered don\'t match'),

              },
            }
        },
        async created(){
          this.sh_select_id()
        },
        methods:{
          //  async sh_select_id(){
          //     let res=await this.$http.get('/teacher/sh_select_id/'+this.$route.query.t_id)
          //     this.t_id=this.$route.query.t_id
          //     this.t_password=res.data.datas.t_password
            
          //   },
            async select_id(t_id){

              let res=await this.$http.post("/teacher/select_id",{
                t_password:this.password,
                t_username:this.t_username,
                t_id:t_id
              })
              console.log(res.data)
                if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	 else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            
            },
        },
        computed: {
          formIsValid () {
            return (this.conf_pass==this.password)
          }
        },
    }
</script>