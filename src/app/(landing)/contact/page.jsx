"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

function ContactPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset, // Usado para limpiar el formulario
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  async function onSubmit(data) {
    console.log(data);
    setIsLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3000/api/dashboard/customers",
        data
      );
      console.log("Formulario enviado:", result);
      setSuccessMessage("Los datos se enviaron correctamente."); // Mostrar mensaje de éxito
      reset(); // Limpiar el formulario
    } catch (err) {
      console.log("Error al enviar el formulario:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Formulario de Contacto
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Completa los datos
        </h1>

        {/* Mostrar mensaje de éxito si se envió el formulario correctamente */}
        {successMessage && (
          <div className="bg-blue-500 text-white p-4 rounded-md mb-4">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-zinc-400 text-zinc-500"
        >
          {/* Empresa */}
          <label className="flex flex-col gap-1">
            Empresa
            <input
              type="text"
              className="input-dark"
              {...register("business", { required: "Empresa requerida" })}
            />
            {errors.business && (
              <span className="text-sm text-red-500">
                {errors.business.message}
              </span>
            )}
          </label>

          {/* Nombre */}
          <label className="flex flex-col gap-1">
            Nombre
            <input
              type="text"
              className="input-dark"
              {...register("firstName", { required: "Nombre requerido" })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </label>

          {/* Apellido */}
          <label className="flex flex-col gap-1">
            Apellido
            <input
              type="text"
              className="input-dark"
              {...register("lastName", { required: "Apellido requerido" })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </label>

          {/* Correo electrónico */}
          <label className="flex flex-col gap-1">
            Correo Electrónico
            <input
              type="text"
              className="input-dark"
              {...register("email", {
                required: "Correo electrónico requerido",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Formato de correo no válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
          
          {/* Número de Teléfono */}
          <label className="flex flex-col gap-1">
            Teléfono
            <input
              type="text"
              className="input-dark"
              {...register("phoneNumber", {
                required: "Teléfono requerido",
                pattern: {
                  value: /^\d{8}$/,
                  message: "El número debe tener exactamente 8 dígitos.",
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
          </label>

          {/* Dirección */}
          <label className="flex flex-col gap-1">
            Dirección
            <input
              type="text"
              className="input-dark"
              {...register("address", { required: "Dirección requerida" })}
            />
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </label>

          {/* Botón de enviar */}
          <section className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-blue-500 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default ContactPage;
