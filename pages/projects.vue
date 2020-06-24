<template>
    <v-container>
        <h2 class="mb5">
            Projects
        </h2>
        <v-list>
            <project-row v-for="project in projects" :key="project.id" :project-uuid="project.uuid" />
        </v-list>
        <v-btn color="primary" @click="add()">
            Create new project
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
        projects() {
            return this.$store.state.media.projects;
        },
    },
    methods: {
        add() {
            const project = this.$models.new('Project');
            this.$set(this.$store.state.media.projects, project.uuid, project);
        },
    },
};
</script>
