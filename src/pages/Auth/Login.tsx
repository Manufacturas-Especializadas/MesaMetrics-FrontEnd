import InputField from "@/components/Inputs/InputField";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
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
    try {
      await login(formData);
      navigate("/tiempo-real");
    } catch (err: any) {
      setError(err.message || "Credenciales inválidas");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
            Bienvenidos a MESA Metrics
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Inicia sesión para gestionar tus métricas
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <InputField
              id="email"
              label="Email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />

            <InputField
              id="password"
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                            ${
                              isSubmitting
                                ? "bg-blue-400"
                                : "bg-blue-600 hover:bg-blue-700"
                            } 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer`}
            >
              {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
