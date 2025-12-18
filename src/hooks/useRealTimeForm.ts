import { useState, useCallback, useEffect } from "react";
import { type RealTime, realTimeService } from "../api/services/RealTimeService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UseRealTimeFormReturn {
    loading: boolean;
    error: string | null;
    formData: RealTime;
    handleChange: (field: keyof RealTime, value: string | number) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    resetForm: () => void;
    validateForm: () => boolean;
    isEditing: boolean;
}

const initialFormData: RealTime = {
    title: "",
    shiftId: 0,
    startTime: "",
    endTime: "",
    lineId: 0,
    tagsId: []
};

export const useRealTimeForm = (onSuccess?: () => void, editId?: number): UseRealTimeFormReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<RealTime>(initialFormData);
    const navigate = useNavigate();

    useEffect(() => {
        if (editId) {
            const loadData = async () => {
                try {
                    const response = await realTimeService.getById(editId);

                    if (response.data) {
                        setFormData({
                            title: response.data.title,
                            shiftId: response.data.shiftId,
                            startTime: response.data.startTime,
                            endTime: response.data.endTime,
                            lineId: response.data.line,
                            tagsId: response.data.tagsId || []
                        });
                    }
                } catch (err: any) {
                    toast.error("Error al cargar los datos del registro");
                    navigate("/tiempo-real");
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        };
    }, [editId, navigate]);

    const handleChange = useCallback((field: keyof RealTime, value: any) => {
        setFormData(prev => {
            if (field == "tagsId") {
                const tagsIdsArray = Array.isArray(value) ? value : [value].filter(v => v !== 0);
                return {
                    ...prev,
                    [field]: tagsIdsArray
                };
            }

            return {
                ...prev,
                [field]: value
            }
        });

        if (error && field in formData) {
            setError(null);
        }

    }, [error, formData]);

    const validateForm = useCallback((): boolean => {
        const errors: string[] = [];
        if (!formData.title.trim()) errors.push("El título es requerido");
        if (formData.shiftId === 0) errors.push("Debe seleccionar un turno");
        if (formData.lineId === 0) errors.push("Debe seleccionar una linea");
        if (!formData.startTime) errors.push("La hora de inicio es requerida");
        if (!formData.endTime) errors.push("La hora de fin es requerida");

        if (formData.startTime && formData.endTime) {
            const start = new Date(`2000-01-01T${formData.startTime}`);
            const end = new Date(`2000-01-01T${formData.endTime}`);
            if (end <= start) errors.push("La hora de fin debe ser mayor a la hora de inicio");
        }

        if (errors.length > 0) {
            setError(errors.join(". "));
            toast.error(errors.join("\n"));
            return false;
        }
        return true;
    }, [formData]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const actionText = editId ? "Actualizando..." : "Registrando...";
            const loadingToast = toast.loading(actionText);

            const payload = {
                ...formData,
                tagIds: Array.isArray(formData.tagsId) ? formData.tagsId : []
            };

            let response;

            if (editId) {
                response = await realTimeService.updatedRealTime(payload, editId);
            } else {
                response = await realTimeService.registerRealTime(payload);
            }

            toast.dismiss(loadingToast);

            if (response.success) {
                toast.success(response.message || (editId ? "Actualización exitosa" : "Registro exitoso"));

                if (!editId) resetForm();

                if (onSuccess) onSuccess();

                setTimeout(() => {
                    navigate("/tiempo-real");
                }, 1500);
            } else {
                toast.error(response.message || "Error en la operación");
                setError(response.message);
            }
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || "Error de conexión";
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(true);
        }
    }, [formData, validateForm, onSuccess, editId, navigate]);

    const resetForm = useCallback(() => {
        setFormData(initialFormData);
        setError(null);
        setLoading(false);
    }, []);

    return {
        loading,
        error,
        formData,
        handleChange,
        handleSubmit,
        resetForm,
        validateForm,
        isEditing: !!editId
    };
};