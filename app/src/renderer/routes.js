export default [
  {
    path: "/splash",
    name: "splash",
    component: require("components/SplashView"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: require("components/CalendarView"),
  },
  {
    path: "/notifications",
    name: "notifications",
    component: require("components/NotificationView"),
  },
  {
    path: "/todo",
    name: "todo",
    component: require("components/TaskView"),
  },
  {
    path: "*",
    redirect: "/splash",
  },
];
