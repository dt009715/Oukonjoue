import type { ReactNode } from "react";

const RouterShell = ({ children }: { children?: ReactNode }) => <>{children}</>;

export const BrowserRouter = RouterShell;
export const MemoryRouter = RouterShell;
export const Routes = RouterShell;
export const Route = ({ element }: { element?: ReactNode }) => <>{element}</>;
export const Link = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const NavLink = Link;
export const useNavigate = () => () => undefined;
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/" });

export default {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useParams,
  useLocation,
};

