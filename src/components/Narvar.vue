<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer expand-on-hover :rail="rail" theme="dark">
                <v-list>
                    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Andres Peréz"
                        subtitle="AndresP07@gmailcom"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="comfortable" nav>
                    <v-list-item prepend-icon="mdi-folder" title="Facturación" value="myfiles"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
                    <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>

                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 750px"></v-main>
        </v-layout>
    </v-card>
</template>
  
<script>
export default {
    name: 'NarvarHome',

}
</script>