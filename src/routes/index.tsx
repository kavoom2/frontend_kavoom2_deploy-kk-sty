import MainContainer from "@/layouts/MainContainer/MainContainer";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Component as UserChatList } from "@/pages/UserChatList";
import { Component as UserChatRoom } from "@/pages/UserChatRoom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainContainer />}>
      <Route index element={<Navigate to="/list" />} />
      <Route
        path="list"
        element={<UserChatList />}
        //  lazy={() => import("@/pages/UserChatList")}
      />

      <Route path="room/">
        <Route index element={<Navigate to="/list" />} />
        <Route
          path=":roomId"
          element={<UserChatRoom />}
          // lazy={() => import("@/pages/UserChatRoom")}
        />
      </Route>
    </Route>,
  ),
);

export default router;
