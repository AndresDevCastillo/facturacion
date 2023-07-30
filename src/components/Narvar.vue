<template>
    <v-card>
        <v-layout>
            <v-app-bar theme="dark" prominent>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>My files</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn variant="text" icon="mdi-magnify"></v-btn>

                <v-btn variant="text" icon="mdi-filter"></v-btn>

                <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
            </v-app-bar>
            <v-navigation-drawer theme="dark" v-model="drawer" location="left">

                <v-list>
                    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Andres Peréz"
                        subtitle="AndresP07@gmailcom"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="comfortable" nav>
                    <v-list-item prepend-icon="mdi mdi-folder" title="Facturación" value="myfiles"
                        class="items-bar"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"
                        class="items-bar"></v-list-item>
                    <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" class="items-bar"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 750px">

            </v-main>
        </v-layout>
    </v-card>
</template>
  
<script>
export default {
    name: 'NarvarHome',
    data: () => ({
        drawer: true,
        group: null,
    })
}
</script>

<style>
.items-bar>.v-list-item__content>.v-list-item-title {
    font-size: 1.4rem;
    padding-top: 10px;
    text-align: left;
}
</style>