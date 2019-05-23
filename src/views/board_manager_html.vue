<template>
    <div class="BoardManagerHtml"> 
        <div class="rightContainer">
            <el-button @click='getDetial()'>账户添加</el-button>

        </div>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue';
import LeftMenu from '../components/LeftMenu.vue';
export default {
    name: "BoardManagerHtml",
  methods: {
    getDetial (){
        console.log(localStorage.getItem('callbackHTML'))
        document.write(localStorage.getItem('callbackHTML'));
        document.close();
    },
    onSubmit() {
    }

  }
}
</script>
