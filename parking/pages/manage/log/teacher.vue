<template>
  <div>
    <div class="cv_header">บันทึกระบบ</div>
    <div class="cv_header">ครู / บุคลากร</div>
  <v-data-table
      :headers="headers"
      :items="teacher"
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
        <td class="text-xs-left">{{ props.item.t_log_date }}</td>
        <td class="text-xs-left">{{ props.item.t_log_work }}</td>
        <td class="text-xs-left">{{ props.item.t_code }}</td>
        <td class="text-xs-left">{{ props.item.t_name }}</td>
        <td class="text-xs-left">{{ props.item.t_dep }}</td>
        <td class="text-xs-left">{{ props.item.t_tel }}</td>
        <td class="text-xs-left">{{ props.item.t_password }}</td>
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
          { text: 'รหัสประจำตัวครู / บุลากร', value: 'รหัสประจำตัวครู / บุลากร',align: 'left',sortable: false, },
          { text: 'ชื่อ - นามสกุล', value: 'ชื่อ - นามสกุล',align: 'left',sortable: false, },       
          { text: 'แผนกวิชา', value: 'แผนกวิชา',align: 'left',sortable: false, },     
          { text: 'เบอร์โทรศัพท์', value: 'เบอร์โทรศัพท์',align: 'left',sortable: false, },   
          { text: 'รหัสผ่าน', value: 'รหัสผ่าน',align: 'left',sortable: false, },   
          { text: 'ชื่อผู้ใช้', value: 'ผู้เปลี่ยนแปลงข้อมูล',align: 'left',sortable: false,  },
        ],
        teacher: []
      }
    },
    async created(){
      this.state=true
      let res=await this.$http.get('/log/teacher')
      this.teacher=res.data.datas
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