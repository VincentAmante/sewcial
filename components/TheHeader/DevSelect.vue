<script setup lang="ts">
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const routes = router.getRoutes();

    const selectedRoute = computed({
        get(){
            return router.currentRoute.value;
        },
        set(value){
            router.push(value);
        }
    });
</script>

<template>
    <select name="" id="" v-model="selectedRoute">
        <option v-for="route in routes" :value="route.path">
            <h3>{{ route.name }}</h3>
        </option>
    </select>
</template>

<style scoped lang="scss">
    select {
        width: 100%;
        height: 2.5em;
        outline: none;
        border-radius: 10px;
        background-color: $clr-primary;
    }
</style>