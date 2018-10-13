
<script>
  export default {
    
    created(){
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('status');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('cv_layout');
        this.$router.push({path: './'})
    },
  
  }
</script>