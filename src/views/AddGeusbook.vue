<template>
    <v-app>
        <v-layout>
            <v-app-bar density="prominent">
                <v-app-bar-title class="mb-8">บันทึกสมุดตรวจราชการ</v-app-bar-title>
            </v-app-bar>
            <v-main>
                <InsertGeustbook />
            </v-main>
        </v-layout>
    </v-app>
</template>
<script setup>
import InsertGeustbook from '../components/InsertGeustbook.vue'
</script>