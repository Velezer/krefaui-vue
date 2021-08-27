import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import NewEvent from "@/views/NewEvent.vue";
import Events from "@/views/Events.vue";
import EventsID from "@/views/EventsID.vue";
import Presensi from "@/views/Presensi.vue";
import People from "@/views/People.vue";
import Register from "@/views/Register.vue";
import RegisterUpdate from "@/views/RegisterUpdate.vue";
import PeopleID from "@/views/PeopleID.vue";
import LoginAdmin from "@/views/LoginAdmin.vue";
import Sync from "@/views/Sync.vue";
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
        path: "/events/new",
        name: "NewEvent",
        component: NewEvent,
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
        path: "/people/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/people/:id",
        name: "People_id",
        component: PeopleID,
        props: true
    },
    {
        path: "/people/:id/update",
        name: "People_id_update",
        component: RegisterUpdate,
        props: true
    },
    {
        path: "/admin/login",
        name: "Login",
        component: LoginAdmin,
    },
    {
        path: "/admin/sync",
        name: "Sync",
        component: Sync,
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