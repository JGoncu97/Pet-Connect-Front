export const fetchLogin = async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return {
        ok: true,
        user: result.user,
        accessToken: result.accessToken,
        hasPets: result.hasPets,
        isNewUser: !!result.isNewUser,

       };
    } else {
      return { ok: false, message: result.message ||"Error desconocido", user: null };
    }
  } catch (error) {
    return { ok: false, message: "Error en la conexión con el servidor", user: null };
  }
};
