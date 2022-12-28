<template>

    <router-link  :to="{ name: 'details', params: { id: this.$props.id}}">
        <div :id="id">
            <div class="flex-center my-3 img_box">
                <img :src="flag" :alt="name +' flag'">
            </div>
            <div class="card_info">
                <div>
                    <strong>name:</strong> <p> {{name}}</p>
                </div>
                <div>
                    <strong>population:</strong> <p> {{ population.toLocaleString() }}</p>
                </div>
                <div>
                    <strong>region:</strong><p> {{region}}</p>
                </div>
                <div>
                    <strong>capital:</strong><p> {{capital}}</p>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        name: String,
        population: Number,
        region: String,
        capital: String,
        flag: String,
        id: Number
    }
}
</script>

<style lang="scss" scoped>
    img {
        width: 250px;
        height: 150px;
        border-radius: .3125rem;
    }

.card_info {
    strong {
        text-transform: uppercase;
        opacity: 0.9;
    }
    p {
        font-size: 1.2rem;
    }
    * {
        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
        gap: .625rem;
    }
}

</style>