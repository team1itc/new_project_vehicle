<template>
  <div>
    <div class="cv_header">แผนกวิชา</div>
  <v-data-table
      :headers="headers"
      :items="department"
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
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <tr v-on:click="list_department(props.item.d_id)">
        <td class="text-xs-left">{{ props.item.d_code }}</td>
        <td class="text-xs-left">{{ props.item.d_name }}</td>

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
          { text: 'รหัสแผนก', value: 'รหัสแผนก',align: 'left',sortable: false, },
          { text: 'ชื่อแผนก', value: 'ชื่อแผนก',align: 'left',sortable: false,  },
        ],
        department: []
      }
    },
    async created(){
      this.state=true
     let res=await this.$http.get('/department/list')
    //  console.log(res.data.department)
     this.department=res.data.datas
     this.state=false
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods:{
      list_department(d_id){
        this.$router.push({path: '../manage/department/data_dep_edit?d_id='+d_id})
        // this.$router.replace('../manage/department/department_edit?d_id='+d_id)
      },
     
    }
  }
</script>