<template>
  <div>
    <div class="cv_header">ข้อมูลนักเรียน / นักศึกษา</div>
    <div class="cv_header xs12">
      
    </div>
    <v-spacer></v-spacer>
  <v-data-table
      :headers="headers"
      :items="std"
      :search="search"

      :loading=state
      class="elevation-1"
      prev-icon="fas fa-chevron-circle-left"
      next-icon="fas fa-chevron-circle-right"
      sort-icon="mdi-menu-down"
      rows-per-page-text="แสดง"
      :rows-per-page-items=rows_per_page
      
    >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props" >
      <tr v-on:click="list_student(props.item.std_id)">
        <td class="text-xs-left xs10">{{ props.item.std_code }}</td>
        <td class="text-xs-left">{{ props.item.std_pin_id }}</td>
        <td class="text-xs-left">{{ props.item.std_prename }}{{ props.item.std_name }} {{ props.item.std_lname }}</td>
        <td class="text-xs-center">{{ props.item.std_gender }}</td>
        <td class="text-xs-center">{{ props.item.std_birthday }}</td>
        <td class="text-xs-center">{{ props.item.g_code }}</td>
      </tr>
    </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          ไม่พบข้อมูล :(
        </v-alert>
      </template>
  </v-data-table>

  </div>
</template>

<script>
  export default {
    layout:sessionStorage.getItem("cv_layout"),
    data () {
      return {
        state:true,
        search: '',
        pagination: {},
        selected: [],
        part_url:'',
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          {text: 'รหัสนักศึกษา',align: 'left',sortable: false, value: 'name'},
          { text: 'รหัสประจำตัว', value: 'รหัสประจำตัว',align: 'left', sortable: false,},
          { text: 'ชื่อ', value: 'ชื่อ',align: 'center',sortable: false,  },
          { text: 'เพศ', value: 'เพศ',align: 'center',sortable: false,  },
          { text: 'วันเกิด', value: 'วันเกิด',align: 'center',sortable: false,  },
          { text: 'กลุ่ม', value: 'กลุ่ม',align: 'center',sortable: false,  },
        ],
        std:[]
      }
    },
    async created(){
      if(this.$route.query.g_code){
        let res=await this.$http.get('/student/list_g/'+this.$route.query.g_code)
        this.part_url="./edit_student?std_id="
        this.std=res.data.datas
        this.state=false
      }else{
        this.part_url="./student/edit_student?std_id="
        let res=await this.$http.get('/student/list')
        this.std=res.data.datas
        this.state=false
      }
 
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      
      // filter_std(){
      //   return this.std.filter(>>ชื่อตัวแปร<<=>''+>>ชื่อตัวแปร<<.>>field<<===this.filter)
      // },
    },
    methods:{
      list_student(std_id){
        this.$router.push({path: this.part_url+std_id})
      },
     
    }
  }
</script>