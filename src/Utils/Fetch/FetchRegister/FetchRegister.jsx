export const fetchRegister = async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
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
        accessToken: result.accessToken,
        user: result.user,
        hasPets: result.hasPets,
        isNewUser: !!result.isNewUser,
      };
    } else {
      return { ok: false, message: result.message };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error en la conexión con el servidor" };
  }
};
