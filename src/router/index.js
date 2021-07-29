import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Events from "@/views/Events.vue";
import EventsID from "@/views/EventsID.vue";
import Presensi from "@/views/Presensi.vue";
import People from "@/views/People.vue";
import PeopleID from "@/views/PeopleID.vue";

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
    },
    {
        path: "/events/:id/presensi",
        name: "Presensi",
        component: Presensi,
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
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;