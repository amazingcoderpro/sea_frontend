
<template>
    <div class="board_manager_dialog">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">

        </el-dialog>
    </div>
</template>
<script>

export default {
  name: "board_manager_dialog",
  data() {
    return {
     // iframeSrc: "",
    };
  },
  updated () {
    this.init()
  },
  props: {
    dialog: Object
  },
  methods: {
    init(){


    },
    onSubmit() {
    }

  }
};
</script>

