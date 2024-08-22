import { useToast } from "@/hooks/useToast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");

    const decodeToken = async () => {
      try {
        if (token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}auth/decode-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ value: token }),
            }
          );

          const data = await response.json();
          if (data.valid) {
            setUser(data["decoded-user"]);
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setLoading(false);
      }
    };

    decodeToken();
  }, []);

  const register = async (formData) => {
    console.log(formData);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      const messageType = Object.keys(data);
      console.log(messageType);
      showToast(data[`${messageType[0]}`], messageType[0]);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const login = async (formData) => {
    setIsSubmitting(true);

    try {
      console.log(formData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      const messageType = Object.keys(data);
      console.log(messageType);
      showToast(
        messageType[0] === "success"
          ? "Successfully Logged In"
          : data[`${messageType[0]}`],
        messageType[0]
      );
      if (data.success) {
        Cookies.set("access_token", data.success);

        const decodeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}auth/decode-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: data.success }),
          }
        );

        const decodedData = await decodeResponse.json();

        if (decodedData.valid) {
          setUser(decodedData["decoded-user"]);
          router.push("/protected-route");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("access_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, isSubmitting }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
