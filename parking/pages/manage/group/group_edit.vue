
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
          แก้ไขข้อมูลกลุ่ม    
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
              <v-card-text>ต้องการลบข้อมูล {{g_name}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="group_del()">ใช่</v-btn>
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
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-credit-card"
                  placeholder="รหัสกลุ่ม"
                  name="g_code"
                  v-model="g_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-users"
                  placeholder="ชื่อกลุ่มการเียน"
                  name="g_name"
                  v-model="g_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                 
                  maxlength="255"
                  counter
                  prepend-icon="fas fa-credit-card"
                  placeholder="รหัสแผนก"
                  name="d_code"
                  v-model="d_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="green darken-3" @click="student(g_code)"><i class="fas fa-users fa-2x"></i> นักเรียนในกลุ่ม {{nums}} คน</v-btn>
          <v-spacer></v-spacer>
          
          <v-btn flat color="red lighten-2" @click="group()">ย้อนกลับ</v-btn>
          <v-btn flat color="primary" :disabled="!isEditing" @click="group_update(g_id)">บันทึก</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        layout:sessionStorage.getItem("cv_layout"),

        data () {
            return {
              username:sessionStorage.getItem("username"),
              g_code:"",
              g_name:"",
              d_code: '',
              type_api:"",
              nums:"",
              danger:false,
              conf_del:false,
              isEditing:null,
              rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                    // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
              },
          }
        },
        async created(){
          this.sh_group()
        },
        methods:{
          conf_del(){this.conf_del=true},
          async group_del(){//console.log("group_del")
            let res=await this.$http.post('/group/group_del/',{
              g_id:this.$route.query.g_id,
              g_code:this.g_code,
              g_name:this.g_name,
              d_code:this.d_code,
              username:this.username
            })
            if(res.data.ok==true){this.$router.push({name:"manage-group"})}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_group(){
            let res=await this.$http.get('/group/sh_group/'+this.$route.query.g_id)
            // console.log("api return=".res.data.datas)
            this.g_id=this.$route.query.g_id
            this.g_code=res.data.datas.g_code
            this.g_name=res.data.datas.g_name
            this.d_code=res.data.datas.d_code
            this.nums=res.data.nums
          },
          async group_update(g_id){
            //console.log("g_id"+g_id)
            let res=await this.$http.post("/group/group_update",{
              g_code:this.g_code,
              g_name:this.g_name,
              d_code:this.d_code,
              g_id:g_id,
              username:this.username
            })
            console.log(res.data)
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,this.sh_group()}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          group(){
            // this.$router.replace("../group")
            this.$router.push({name:"manage-group"})
          },
          student(g_code){
            this.$router.push({path: '../../manage/student/?g_code='+g_code})
          }
        }
    }
</script>