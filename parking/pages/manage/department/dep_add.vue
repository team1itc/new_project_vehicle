
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
          เพิ่มข้อมูลแผนก
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-credit-card"
                  placeholder="รหัสแผนก"
                  name="d_code"
                  v-model="d_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-place-of-worship"
                  placeholder="ชื่อแผนก"
                  name="d_name"
                  v-model="d_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red lighten-2" @click="department()">ยกเลิก</v-btn>
          <v-btn flat color="primary" @click="department_add()">บันทึก</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        layout: 'manage',
        data(){
          return{
            username:sessionStorage.getItem("username"),
            u_id:sessionStorage.getItem("id"),
            d_code:"",
            d_name:"",
            type_api:"",
            danger:false,
            rules: {
                  required: value => !!value || 'ห้ามว่าง.',
                  // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            },
          }
        },
        methods:{
           async department_add(){
            if(this.d_code!='' && this.d_name!=''){
              let res=await this.$http.post("department/dep_add",{
                d_code:this.d_code,
                d_name:this.d_name,
                username:this.username
              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          department(){
            this.$router.push({name: 'manage-department'})
          }
        }
    }
</script>