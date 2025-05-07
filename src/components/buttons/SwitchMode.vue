<template>
    <div class="flex-center switch-container">
        <button class="btn_cst icon" @click="toggleTheme">
            <box-icon :name="store.state.darkMode ? 'moon' : 'sun'" :color="!store.state.darkMode ? '#002945':'#edf2fb'"></box-icon>
        </button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
    const store = useStore();
    const toggleTheme = () => {
        store.dispatch('switchMode')
        if(store.state.darkMode) {
            document.body.classList.add('dark_mode')
        } else {
            document.body.classList.remove('dark_mode')
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/main.scss';

    @media screen and (width < 640px) {
        .switch-container {
            position: absolute;
            right: 16px;
            top: 16px;
        }
    }


</style>