<template>
  <div>
    <v-container grid-list-xl >
    <v-flex xs12 sm10 offset-sm1 cv-margin-bottom>
        <v-card >
          <v-card-title primary-title height="50px">
            <div class="headline"><i class="fas fa-edit"></i> โพสต์</div>
          </v-card-title>
         <v-textarea
            height="50px"
            box
            placeholder="บอกเล่าเรื่องราวหน่อยสิ..."
            outline
            background-color="white"          
        ></v-textarea>
          <v-card-actions class="grey lighten-4">
            <v-spacer></v-spacer>
            <v-btn style="color:#fff"  color="light-blue darken-2"> แบ่งปัน</v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
    
    <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-img v-if="pk_img"
            class="white--text"
            
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-img>
          <v-card-title>
            <div>
              <span class="font-weight-bold title">{{w_name}}</span><br>
              <span>{{f_txt}}</span><br>
              
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="light-blue darken-2"><i class="far fa-thumbs-up fa-2x"></i></v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="light-blue darken-2"><i class="fas fa-comments fa-2x"></i> ความคิดเห็น</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
  export default {
    layout: 'manage',
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
        },

        binding () {
            const binding = {}
            if (this.$vuetify.breakpoint.mdAndUp) binding.column = true
            return binding
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