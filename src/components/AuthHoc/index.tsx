// import { USER_ROLE } from "../constants";
// import { useCurrentUser } from "@/utils/hoos";
import type { PropsWithChildren } from "react";

const AuthHoc: React.FC<PropsWithChildren> = ({ children }) => {
  // const user = useCurrentUser();
  // return user?.role === USER_ROLE.ADMIN ? <>{children}</> : null;
  return <>{children}</>
};
export default AuthHoc;
