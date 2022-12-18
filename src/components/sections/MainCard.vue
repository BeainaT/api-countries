<template>
    <router-link  :to="{ name: 'details', params: { id: this.$props.id}}">
        <div :id="id">
                    <img :src="flag" :alt="name +' flag'">
                    <h3>nome: {{name}}</h3>
                    <p>popolazione: {{ population }}</p>
                    <p>regione: {{region}}</p>
                    <p>capitale: {{capital}}</p>
                </div>
    </router-link>
</template>

<script>
export default {
    props: {
        name: String,
        population: String,
        region: String,
        capital: String,
        flag: String,
        id: Number
    }
}
</script>

<style lang="scss" scoped>
.card__container {
    width: 12.5rem;
    border: 1px solid black;
    img {
        width: 100%;
    }
}

</style>