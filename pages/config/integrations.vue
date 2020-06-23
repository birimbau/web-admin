<template>
    <div>
        <div>
            <h1 class="text-h4">
                Integrations
            </h1>
        </div>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field v-model="password" type="password" label="Encryption Password" />
                <v-btn text color="primary" @click="$store.dispatch('secrets/to-local', password)">
                    Save
                </v-btn>
                <v-btn text color="error" @click="$store.dispatch('secrets/from-local', password)">
                    Restore
                </v-btn>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="googleCloudPublic" label="Google Cloud Platform API Key" @input="encrypt" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="googleCloudPrivate" label="Google Cloud Platform API Secret" @input="encrypt" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="6">
                <pre>{{ encrypted }}</pre>
            </v-col>
        </v-row>
    </div>
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
            googleCloudPublic: 'secrets.googleCloud.public',
            googleCloudPrivate: 'secrets.googleCloud.private',
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
