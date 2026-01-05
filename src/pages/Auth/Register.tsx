import InputField from "@/components/Inputs/InputField";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";

export const Register = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Operator",
  });
  const [error, setError] = useState<string>("");
  const [sucess, setSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await register(formData);
      setSuccess("Usuario creado exitosamente.");

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
            Registrar usuario
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Únete al sistema de gestión de MESA METRICS
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <InputField
            id="email"
            label="Correo"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            id="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="relative mb-4 font-sans">
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="peer block w-full border border-gray-300 bg-white px-3 pt-5 pb-1.5 text-sm rounded-md focus:outline-none focus:ring-1 focus:border-blue-600 focus:ring-blue-600 transition-colors duration-200 ease-in-out appearance-none"
            >
              <option value="Operator">Operador</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Administrador</option>
            </select>
            <label
              htmlFor="role"
              className="absolute left-3 top-0.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide pointer-events-none"
            >
              Rol
            </label>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {sucess && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded">
              {sucess}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:cursor-pointer 
                        ${
                          isSubmitting
                            ? "bg-blue-400"
                            : "bg-blue-600 hover:bg-blue-700"
                        } 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md`}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};
