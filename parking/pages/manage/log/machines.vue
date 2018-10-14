<template>
  <div>
    <div class="cv_header">บันทึกระบบ</div>
    <div class="cv_header">พาหนะ</div>
  <v-data-table
      :headers="headers"
      :items="machine"
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
        <td class="text-xs-left">{{ props.item.mc_log_date }}</td>
        <td class="text-xs-left">{{ props.item.mc_log_work }}</td>
        <td class="text-xs-left">{{ props.item.mc_code }}</td>
        <td class="text-xs-left">{{ props.item.mc_brand }}</td>
        <td class="text-xs-left">{{ props.item.mc_series }}</td>
        <td class="text-xs-left">{{ props.item.std_id }}</td>
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
          { text: 'ทะเบียนรถ', value: 'ทะเบียนรถ',align: 'left',sortable: false, },
          { text: 'แบรนด์รถ', value: 'แบรนด์รถ',align: 'left',sortable: false, },     
          { text: 'รุ่นรถ', value: 'รุ่นรถ',align: 'left',sortable: false, },       
          { text: 'เจ้าของรถ', value: 'เจ้าของรถ',align: 'left',sortable: false, },     
          { text: 'ชื่อผู้ใช้', value: 'ผู้เปลี่ยนแปลงข้อมูล',align: 'left',sortable: false,  },
        ],
        machine: []
      }
    },
    async created(){
      this.state=true
      let res=await this.$http.get('/log/machine')
      this.machine=res.data.datas
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