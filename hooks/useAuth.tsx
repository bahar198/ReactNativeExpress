import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "expo-router";
// import { loginRequest, getUserRequest } from "../requests/sessions";
import { User } from "../interface/user";
import useAPI from "../hooks/useApi";

const BROWSER_AUTH_COOKIE = process.env.BROWSER_AUTH_COOKIE || "SMILESYNC";

export const AUTH_ROUTES = ["/login", "/forgot-password", "/reset-password"];
interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  isAdmin: boolean;

  role: string;

  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [role, setRole] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const history = useRouter();
  // const location = useLocation();
  const location = history.navigate;
  useEffect(() => {
    if (error) setError(null);
  }, [location]);
  const { get, post } = useAPI();

  useEffect(() => {
    if (!AUTH_ROUTES.includes(location?.arguments)) {
      getUserRequest()
        .then((user) => {
          if (user.success) {
            if (user.data.role === "ADMIN") {
              setIsAdmin(true);
            }

            setRole(user.data.role);
            setUser(user.data);
          } else {
            setError(user.error);
          }
        })
        .catch((_error) => {
          setError(_error);
        })
        .finally(() => setLoadingInitial(false));
    } else {
      setLoadingInitial(false);
    }
  }, []);
  async function getUserRequest(): Promise<any> {
    return await get("auth/user");
  }
  async function login(email: string, password: string) {
    setLoading(true);
    try {
    } catch (err) {}
    const userlogin = await post("auth/login", { email, password });

    if (!userlogin.success) {
      // throw user.information;
      setLoading(false);
      throw "INVALID_LOGIN";
    } else {
      setUser(userlogin.data);
      setRole(userlogin.data.role);
      if (userlogin.data.role === "ADMIN") {
        setIsAdmin(true);
      }

      history.push("/");
    }
  }

  function logout() {
    Cookies.remove(BROWSER_AUTH_COOKIE);
    setUser(undefined);
    setRole("");
    setIsAdmin(false);

    history.push("/auth");
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      isAdmin,
      role,
    }),
    [user, loading, error, isAdmin, role]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
