<template>
  <div>
    <div class="cv_header">บันทึกระบบ</div>
    <div class="cv_header">นักเรียน / นักศึกษา</div>
  <v-data-table
      :headers="headers"
      :items="student"
      :search="search"
      :pagination.sync="pagination"
      :loading=state
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
          {{ props.header.value }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <tr>
        <td class="text-xs-left">{{ props.item.std_log_date }}</td>
        <td class="text-xs-left">{{ props.item.std_log_work }}</td>
        <td class="text-xs-left">{{ props.item.std_code }}</td>
        <td class="text-xs-left">{{ props.item.std_gender }}</td>
        <td class="text-xs-left">{{ props.item.std_prename }}{{ props.item.std_name }} {{ props.item.std_lname }}</td>
        <td class="text-xs-left">{{ props.item.std_pin_id }}</td>
        <td class="text-xs-left">{{ props.item.std_birthday }}</td>
        <td class="text-xs-left">{{ props.item.std_password }}</td>
        <td class="text-xs-left">{{ props.item.g_code }}</td>
        <td class="text-xs-left">{{ props.item.u_id }}</td>
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
        
        state:false,
        search: '',
        pagination: {},
        selected: [],
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          { text: 'วันที่', value: 'วันที่ทำการบันทึก',align: 'left',sortable: false,  },
          { text: 'การทำงาน', value: 'การทำงาน',align: 'left',sortable: false,  },
          { text: 'รหัสประจำตัวนักเรียน / นักศึกษา', value: 'รหัสประจำตัวนักเรียน / นักศึกษา',align: 'left',sortable: false, },
          { text: 'เพศ', value: 'เพศ',align: 'left',sortable: false, },     
          { text: 'ชื่อ - นามสกุล', value: 'ชื่อ - นามสกุล',align: 'left',sortable: false, },       
          { text: 'รหัสประจำตัว', value: 'รหัสประจำตัว',align: 'left',sortable: false, },     
          { text: 'วัน เดือน ปีเกิด', value: 'วัน เดือน ปีเกิด',align: 'left',sortable: false, },   
          { text: 'รหัสผ่าน', value: 'รหัสผ่าน',align: 'left',sortable: false, },   
          { text: 'กลุ่มการเรียน', value: 'กลุ่มการเรียน',align: 'left',sortable: false, },   
          { text: 'ชื่อผู้ใช้', value: 'ผู้เปลี่ยนแปลงข้อมูล',align: 'left',sortable: false,  },
        ],
        student: []
      }
    },
    async created(){
      this.state=true
      let res=await this.$http.get('/log/student')
      this.student=res.data.datas
      this.state=false
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods:{
    }
  }
</script>