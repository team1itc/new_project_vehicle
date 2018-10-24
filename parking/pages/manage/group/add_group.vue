
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
          เพิ่มข้อมูลกลุ่ม    

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
                  placeholder="รหัสกลุ่ม"
                  name="g_code"
                  v-model="g_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
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
                  maxlength="255"
                  counter
                  prepend-icon="fas fa-credit-card"
                  placeholder="รหัสแผนก"
                  name="d_code"
                  v-model="d_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
           <v-flex xs12>
             <v-layout align-center>
                <v-select
                  :items="items"
                  label="Standard"
        
                ></v-select>
             </v-layout>
           </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="success" @click="group()">ย้อนกลับ</v-btn>
          <v-btn round color="primary" @click="group_add()">บันทึก</v-btn>
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
            danger:false,
            conf_del:false,
            rules: {
                  required: value => !!value || 'ห้ามว่าง.',
                  // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            },
            items:[],
          }
        },
        async created(){
          let res=await this.$http.get('/department/list')
          // console.log(res.data.datas)
          this.items=res.data.datas
          console.log("test")
          console.log(this.items)
        },
        methods:{
          async group_add(){
            if(this.g_code!='' && this.g_name!='' && this.d_code!=''){
              let res=await this.$http.post("group/group_add",{
                g_code:this.g_code,
                g_name:this.g_name,
                d_code:this.d_code,
                username:this.username
              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          group(){
            // this.$router.replace("../group")
            this.$router.push({name:"manage-group"})
          },
        }
    }
</script>