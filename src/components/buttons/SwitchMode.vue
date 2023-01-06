<template>
    <div class="flex-center">
        <box-icon name='moon' :color="iColor.dark"></box-icon>
        <div class="form-check form-switch">
            <input class="form-check-input drop_btn" type="checkbox" role="switch" id="flexSwitchCheckChecked" @click="showFilter()" checked>
        </div>
        <box-icon name='sun' :color="iColor.light"></box-icon>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
    const store = useStore();
    const iColor = {
        light: '#2b3945',
        dark: '#fafafa'
    };
    const showFilter = () => {
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

.form-check-input {
    background-color: $grayInput;
    &:checked {
        background-color: $darkBg;
    }
    &:focus {
        border-color: none;
        box-shadow: none;
    }
}
.form-switch {
    padding: 0 $xs;
    .form-check-input {
        margin: $xs;
        background-image: $toggleSwitch;
        &:focus,
        &:checked {
            background-image: $toggleSwitch;
        }
}
}


</style>