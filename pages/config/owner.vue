<template>
    <v-row>
        <v-col cols="12" sm="6">
            <h2 class="text-h4">
                About yourself
            </h2>
            <v-text-field v-model="userName" label="Name" />
            <v-text-field v-model="userEmail" label="Email" />
            <v-text-field v-model="userBio" label="Bio" />
        </v-col>
        <v-col cols="12" sm="6">
            <h2 class="text-h4">
                About your website
            </h2>
            <v-text-field v-model="siteTitle" label="Title" />
            <v-text-field v-model="siteDomain" label="Domain" />
            <v-text-field v-model="siteDescription" label="Description" />
        </v-col>
    </v-row>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {

    data() {
        return {
            password: 'pass',
            encrypted: '',
        };
    },

    computed: {
        ...mapFields({
            siteDomain: 'site.domain',
            siteTitle: 'site.title',
            siteDescription: 'site.description',
            userName: 'user.name',
            userEmail: 'user.email',
            userBio: 'user.bio',
        }),
    },

    mounted() {
        this.encrypt();
    },

    methods: {
        async encrypt() {
            this.encrypted = await this.$store.dispatch('secrets/encrypt', this.password);
        },
    },

};
</script>
