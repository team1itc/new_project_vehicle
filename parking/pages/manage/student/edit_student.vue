
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
          แก้ไขข้อมูลนักเรียน / นักศึกษา
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
              <v-card-text>ต้องการลบข้อมูลรหัส {{std_code}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="std_del()">ใช่</v-btn>
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
                  :disabled="!isEditing"
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
                  :disabled="!isEditing"
                  prepend-icon="fas fa-th"
                  placeholder="รหัสกลุ่มการเรียน"
                  name="g_code"
                  v-model="g_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
           <v-flex xs4>
              <v-select 
                :disabled="!isEditing"
                :items="item_std_prename"
                v-model="std_prename"
                menu-props="auto"
                label="คำนำหน้าชื่อ"
                hide-details
                prepend-icon="fas fa-user"
                
                ></v-select>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :disabled="!isEditing"
                  prepend-icon=""
                  placeholder="ชื่อ"
                  name="std_name"
                  v-model="std_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :disabled="!isEditing"
                  prepend-icon=""
                  placeholder="นามสกุล"
                  name="std_lname"
                  v-model="std_lname"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="!isEditing"
                prepend-icon="fas fa-birthday-cake"
                placeholder="วัน เดือน ปี เกิด เช่น 8 พฤษภาคม 2540"
                name="std_birthday"
                v-model="std_birthday"
                ></v-text-field>
            </v-flex>
            
            <v-flex xs6>
              <v-select
                :disabled="!isEditing"
                :items="gd"
                v-model="std_gender"
                menu-props="auto"
                hide-details
                label="เพศ"
                prepend-icon="fas fa-transstd_gender"
               
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                :disabled="!isEditing"
                :items="bld"
                v-model="std_blood"
                menu-props="auto"
                hide-details
                label="กรุ๊ปเลือด"
                prepend-icon="fas fa-hospital"
              
              ></v-select>
            </v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-btn round color="success" @click="student()">ย้อนกลับ</v-btn>
          <v-btn round color="primary" :disabled="!isEditing" @click="std_update(std_id)">บันทึก</v-btn>
        </v-card-actions>
        
    </v-card>
    
</template>

<script>
    export default {
        layout: 'manage',

        data () {
          return {
            username:sessionStorage.getItem("username"),
            std_id:"",
            std_code:'',
            std_pin_id:"",
            std_prename:"",
            std_name:"",
            std_lname:"",
            std_birthday:"",
            std_blood: '',
            std_gender:'',
            g_code:"",

            type_api:"",
            danger:false,
            alt_txt:"",
            conf_del:false,
            isEditing:null,
            bld:['A', 'B', 'O','AB'],
            gd:[{text:'ชาย',value:"ช"},{text:'หญิง',value:"ญ"}],
            item_std_prename:['นาย','นางสาว','นาง',],

          }
        },
        async created(){
          this.sh_std()
        },
        methods:{
            conf_del(){this.conf_del=true},
            async std_del(){console.log("std_del")
              let res=await this.$http.post('/student/std_del/',{
                std_id:this.$route.query.std_id,
                std_code:this.std_code,
        				std_pin_id:this.std_pin_id,
        				std_prename:this.std_prename,
        				std_name:this.std_name,
        				std_lname:this.std_lname,
        				std_birthday:this.std_birthday,
        				std_gender:this.std_gender,
        				std_blood:this.std_blood,
        				g_code:this.g_code,
                username:this.username
              })
              if(res.data.ok==true){this.$router.push({name:"manage-student"})}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            async sh_std(){
              let res=await this.$http.get('/student/sh_std/'+this.$route.query.std_id)
              this.std_id=this.$route.query.std_id
              this.std=res.data.datas
              this.std_code=res.data.datas.std_code
              this.std_pin_id=res.data.datas.std_pin_id
              this.std_prename=res.data.datas.std_prename
              this.std_name=res.data.datas.std_name
              this.std_lname=res.data.datas.std_lname
              this.std_birthday=res.data.datas.std_birthday
              this.std_gender=res.data.datas.std_gender
              this.std_blood=res.data.datas.std_blood
              this.g_code=res.data.datas.g_code
            },
            async std_update(std_id){
              //console.log("std_id"+std_id)
              let res=await this.$http.post("/student/std_update",{
                
        				std_code:this.std_code,
        				std_pin_id:this.std_pin_id,
        				std_prename:this.std_prename,
        				std_name:this.std_name,
        				std_lname:this.std_lname,
        				std_birthday:this.std_birthday,
        				std_gender:this.std_gender,
        				std_blood:this.std_blood,
        				g_code:this.g_code,
                std_id:std_id,
                username:this.username
              })
              console.log(res.data)
                if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	 else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            student(){
              this.$router.push({name:"manage-student"})
            }
        }
    }
</script>