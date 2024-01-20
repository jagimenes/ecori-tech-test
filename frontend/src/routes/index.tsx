import { Route, Routes } from "react-router-dom";

import { AppLayout } from "@/pages/_layouts/app";
import { AuthLayout } from "@/pages/_layouts/auth";
import { SignUp } from "@/pages/sign-up";
import { Home } from "@/pages/home";
import { SignIn } from "@/pages/sign-in";

import { Protected } from "./protected";

export function Router() {
  return (
    <Routes>
      <Route element={<Protected isProtected={false} />}>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Route>

      <Route element={<Protected isProtected />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}
