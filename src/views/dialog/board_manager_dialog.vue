
<template>
    <div class="board_manager_dialog">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">

             <iframe :src="iframeSrc" style="width:100%;height:500px;" frameborder="0"></iframe> 
        </el-dialog>
    </div>
</template>
<script>

export default {
  name: "board_manager_dialog",
  data() {
    return {
      iframeSrc: "/BoardManagerHtml",
    };
  },
  created() {
  },
  props: {
    dialog: Object
  },
  methods: {
    getDetial (){
console.log(localStorage.getItem('callbackHTML'))
        document.write(localStorage.getItem('callbackHTML'));
        document.close();


    },
    onSubmit() {
    }

  }
};
</script>

