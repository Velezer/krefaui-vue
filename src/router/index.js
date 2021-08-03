import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Events from "@/views/Events.vue";
import EventsID from "@/views/EventsID.vue";
import Presensi from "@/views/Presensi.vue";
import People from "@/views/People.vue";
import PeopleID from "@/views/PeopleID.vue";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/events",
        name: "Events",
        component: Events,
    },
    {
        path: "/events/:id",
        name: "Events_id",
        component: EventsID,
        props: true

    },
    {
        path: "/events/:id/presensi",
        name: "Presensi",
        component: Presensi,
        props: true
    },
    {
        path: "/people",
        name: "People",
        component: People,
    },
    {
        path: "/people/:id",
        name: "People_id",
        component: PeopleID,
        props: true
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;