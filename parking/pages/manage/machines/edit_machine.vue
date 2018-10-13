
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
          แก้ไขข้อมูลพาหนะ
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
              <v-card-text>ต้องการลบข้อมูล {{mc_code}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="machines_del()">ใช่</v-btn>
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
                  prepend-icon="fas fa-user"
                  placeholder="รหัสเจ้าของพาหนะ"
                  name="std_id"
                  v-model="std_id"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="ทะเบียนรถ"
                  name="mc_code"
                  v-model="mc_code"
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
                  placeholder="แบรนด์รถ"
                  prepend-icon="fas fa-car"
                  name="mc_brand"
                  v-model="mc_brand"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-tachometer-alt"
                  placeholder="รุ่นรถ"
                  name="mc_series"
                  v-model="mc_series"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red lighten-2" @click="machine()">ย้อนกลับ</v-btn>
          <v-btn flat color="primary" :disabled="!isEditing" @click="machine_update(mc_id)">บันทึก</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        layout:sessionStorage.getItem("cv_layout"),

        data () {
            return {
              username:sessionStorage.getItem("username"),
              mc_code:"",
              mc_brand:"",
              mc_series:'',
              std_id:'',

              type_api:"",
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
          this.sh_machine()
        },
        methods:{
          conf_del(){this.conf_del=true},
          async machines_del(){
            let res=await this.$http.post('/machine/machine_del/',{
              mc_id:this.$route.query.mc_id,
              mc_code:this.mc_code,
              mc_brand:this.mc_brand,
              mc_series:this.mc_series,
              std_id:this.std_id,
              username:this.username
            })
            if(res.data.ok==true){this.$router.push({name:"manage-machines"})}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_machine(){
            let res=await this.$http.get('/machine/sh_machine/'+this.$route.query.mc_id)
            // console.log("api return=".res.data.datas)
            this.mc_id=this.$route.query.mc_id
            this.mc_code=res.data.datas.mc_code
            this.mc_brand=res.data.datas.mc_brand
            this.mc_series=res.data.datas.mc_series
            this.std_id=res.data.datas.std_id
            
          },
          async machine_update(mc_id){
            //console.log("mc_id"+mc_id)
            let res=await this.$http.post("/machine/machine_update",{
              mc_code:this.mc_code,
              mc_brand:this.mc_brand,
              mc_series:this.mc_series,
              std_id:this.std_id,
              mc_id:mc_id,
              username:this.username, 
            })
            console.log(res.data)
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,this.sh_machine()}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          machine(){
            this.$router.push({name:"manage-machines"})
          },

        }
    }
</script>