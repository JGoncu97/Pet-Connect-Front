import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "../../assets/images/NotificacionesRequest.png";

export const NotificationRequest = () => {
  const navigate = useNavigate();
  const [permission, setPermission] = useState("default");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Verificar si el navegador soporta notificaciones
    const notificationsSupported = typeof window !== 'undefined' && 'Notification' in window;
    setIsSupported(notificationsSupported);
    
    // Si las notificaciones son soportadas, obtener el permiso actual
    if (notificationsSupported) {
      setPermission(Notification.permission);
    }
    
    // Si no son soportadas o ya tenemos permiso, continuar a la siguiente pantalla
    if (!notificationsSupported || (notificationsSupported && Notification.permission !== "default")) {
      navigate("/welcome");
    }
  }, [navigate]);

  const requestPermission = async () => {
    // Si el navegador no soporta notificaciones, continuar a la siguiente pantalla
    if (!isSupported) {
      navigate("/welcome");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      alert("Tu navegador no soporta Service Workers.");
      navigate("/welcome");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result); // Actualizar estado inmediatamente

      if (result === "granted") {
        try {
          const registration = await navigator.serviceWorker.ready;
          if (!registration) {
            console.error("No se encontró un Service Worker registrado.");
            navigate("/welcome");
            return;
          }

          registration.showNotification("¡Notificaciones activadas!", {
            body: "Ahora recibirás alertas importantes en tu dispositivo.",
            icon: "/icon-192x192.png",
          });
        } catch (err) {
          console.error("Error con el Service Worker:", err);
        }
      }
      
      // Navegar a la siguiente pantalla independientemente del resultado
      navigate("/welcome");
    } catch (error) {
      console.error("Error al solicitar permisos de notificación:", error);
      navigate("/welcome");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <img src={Notifications} alt="ImgNotifications" className="mt-8 w-64" />

        <div className="p-6 text-center w-full flex flex-col items-center">
          <h2 className="text-xl font-bold">
            ¡Activa las notificaciones para mensajería instantánea!
          </h2>
          <p className="text-gray-600">
            Activa las notificaciones para recibir alertas sobre escaneos de etiquetas QR para mascotas, recordatorios de eventos y descuentos.
          </p>
        </div>

        <button
          onClick={requestPermission}
          className="mt-4 w-full max-w-[20rem] py-3 bg-orange-400 text-white font-semibold rounded-full shadow-md"
        >
          {!isSupported 
            ? "Continuar" 
            : permission === "granted" 
              ? "Notificaciones activadas" 
              : "Activar Notificaciones"}
        </button>
      </div>
    </div>
  );
};
