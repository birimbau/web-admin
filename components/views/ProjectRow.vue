<template>
    <v-list-item>
        <v-list-item-content>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="category.name" label="Name" />
                    <v-switch v-model="category.featured" label="Featured" />
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
        origin: {
            type: Number,
            required: true,
        },
    },
    data() {
        const origin = this.$store.state.categories[this.origin];
        const category = this.$models.clone(origin);
        return {
            category,
        };
    },
    methods: {
        async save() {
            await this.$models.action(this.category, 'save');
            this.$store.commit('categories/set', this.category);
            this.category = this.$models.clone(this.category);
        },
    },
};
</script>
