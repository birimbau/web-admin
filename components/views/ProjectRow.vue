<template>
    <v-list-item>
        <v-list-item-content>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="project.name" label="Name" />
                    <v-switch v-model="project.featured" label="Featured" />
                </v-col>
                <v-col cols="2">
                    <v-btn color="primary" @click="save()">
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: {
        projectUuid: {
            type: String,
            required: true,
        },
    },
    computed: {
        project() {
            return this.$store.state.media.projects[this.projectUuid];
        },
    },
    methods: {
        async save() {
        },
    },
};
</script>
