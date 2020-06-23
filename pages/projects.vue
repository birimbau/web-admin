<template>
    <v-container>
        <h2 class="mb5">
            Categories
        </h2>
        <v-list>
            <project-row v-for="category in categories" :key="category.id" :origin="category.id" />
        </v-list>
        <v-btn color="primary" @click="add()">
            Create new category
        </v-btn>
    </v-container>
</template>

<script>
import ProjectRow from '@/components/views/ProjectRow.vue';


export default {
    components: {
        ProjectRow,
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        },
    },
    methods: {
        add() {
            const category = this.$models.new('MediaCategory');
            this.$store.commit('categories/add', category);
        },
    },
};
</script>
