<template>
    <router-link :to="{ name: 'details', params: { id: this.$props.id }}">
        <div :id="id">
            <div class="mb-3 img_box">
                <img :src="flag.png" :alt="flag?.alt ? flag.alt : name +' flag'">
            </div>
            <div class="card_info px-3 py-2">
                <div><strong>name:</strong> <p>{{ name }}</p></div>
                <div><strong>population:</strong> <p>{{ population.toLocaleString() }}</p></div>
                <div><strong>region:</strong> <p>{{ region }}</p></div>                
                <div><strong>capital:</strong> <p>{{ capital ? capital.toString() : '-' }}</p></div>                
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
        flag: Object,
        id: Number,
        page: Number
    }
}
</script>

<style lang="scss" scoped>
.img_box {
    width: 100%;
    height: 11.25rem;
    img {
        width: 100%;
        height: 100%;
    }
}

.card_info {
    :is(div){
        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
        gap: .625rem;
    }
    strong {
        text-transform: uppercase;
        opacity: 0.9;
    }
    p {
        font-size: 1.2rem;
    }
}

</style>