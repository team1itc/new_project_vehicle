
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
          เพิ่มข้อมูลพาหนะ
          <v-spacer></v-spacer>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  
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
                  
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-tachometer-alt"
                  placeholder="รุ่นรถ"
                  name="mc_series"
                  v-model="mc_series"
                ></v-text-field>
              </v-layout>
            </v-flex>
           <v-flex xs12 >
              <v-layout align-center>
                <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
              </v-layout>
           </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red lighten-2" @click="machine()">ย้อนกลับ</v-btn>
          <v-btn flat color="primary"  @click="machine_add()">บันทึก</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
<script>
    export default {
        layout:sessionStorage.getItem("cv_layout"),

        data () {
            return {
              username:sessionStorage.getItem("username"),
              previewImage:null,
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
        methods:{
           async machine_add(){
            if(this.d_code!='' && this.d_name!=''){
              let res=await this.$http.post("machine/machine_add",{
                mc_code:this.mc_code,
                mc_brand:this.mc_brand,
                mc_series:this.mc_series,
                std_id:this.std_id,
                username:this.username
              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          machine(){
            this.$router.push({name:"manage-machines"})
          },
          uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(this.previewImage);
                };
          },

        }
    }
</script>