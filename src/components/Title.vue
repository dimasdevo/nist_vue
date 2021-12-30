<template>
    <v-layout class="justify-center">
        <h1 class="display-1 mb-4 text-capitalize">{{ pageTitle }}</h1>
        <slot></slot>
    </v-layout>
</template>

<script>
export default {
    props:{
        pageTitle: String,
    }
}
</script>

