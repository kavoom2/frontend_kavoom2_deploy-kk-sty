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
    <Route path="/">
      <Route index element={<Navigate to="/list" />} />
      <Route path="list" element={<UserChatList />} />

      <Route path="room/">
        <Route index element={<Navigate to="/list" />} />
        <Route path=":roomId" element={<UserChatRoom />} />
      </Route>

      <Route path="*" element={<Navigate to="/list" />} />
    </Route>,
  ),
);

export default router;
