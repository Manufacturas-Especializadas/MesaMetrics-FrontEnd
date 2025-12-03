import { Toaster } from "react-hot-toast";
import { Button } from "../../Button/Button";
import InputField from "../../Inputs/InputField";
import SelectField from "../../Inputs/SelectField";
import { useRealTimeForm } from "../../../hooks/useRealTimeForm";
import { useTags } from "../../../hooks/useTags";
import { useShifts } from "../../../hooks/useShifts";
import { TagMultiSelect } from "../../Inputs/TagMultiSelect";
import { useNavigate } from "react-router-dom";

export const RealTimeForm = () => {
    const { shifts, loading: shiftsLoading } = useShifts();
    const { tags, loading: tagsLoading } = useTags();
    const navigate = useNavigate();

    const {
        loading: formLoading,
        error,
        formData,
        handleChange,
        handleSubmit,
        resetForm
    } = useRealTimeForm();

    const shiftOptions = shifts.map(shift => ({
        value: shift.id,
        label: shift.shiftName
    }));

    const tagOptions = tags.map(tag => ({
        value: tag.id,
        label: tag.tagsName
    }));

    const handleCancel = () => {
        if (window.confirm("¿Está seguro de cancelar? Se perderán los datos no guardados.")) {
            resetForm();
            navigate("/tiempo-real");
        }
    };

    const isLoading = formLoading || shiftsLoading || tagsLoading;

    const isFormValid =
        formData.title.trim() !== "" &&
        formData.shiftId !== 0 &&
        formData.startTime !== "" &&
        formData.endTime !== "" &&
        Array.isArray(formData.tagsId) &&
        formData.tagsId.length > 0;

    return (
        <>
            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        background: "#363636",
                        color: "#fff",
                        zIndex: 9999
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: "#10B981",
                            color: "#fff"
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: "#EF4444",
                            color: "#fff",
                        },
                    },
                    loading: {
                        duration: Infinity,
                        style: {
                            background: "#3B82F6",
                            color: "#fff"
                        },
                    },
                }}
            />

            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-lg mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Registro en Tiempo Real
                        </h1>
                        <p className="text-gray-600">
                            Complete todos los campos requeridos
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                            <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500'
                                            }`}></div>
                                        <span className="text-sm font-medium text-blue-700">
                                            {isLoading ? 'Cargando datos...' : 'Formulario activo'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {error && !isLoading && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <InputField
                                        label="Nombre de la máquina"
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <SelectField
                                        label="Turno"
                                        value={formData.shiftId || ""}
                                        onChange={(e) => handleChange("shiftId", parseInt(e.target.value) || 0)}
                                        options={[
                                            { value: "", label: "Seleccione un turno" },
                                            ...shiftOptions
                                        ]}
                                        required
                                        disabled={isLoading || shiftsLoading}
                                        error={formData.shiftId === 0 ? "Seleccione un turno" : undefined}
                                    />
                                </div>

                                <div>
                                    <InputField
                                        label="Hora de inicio de turno"
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleChange("startTime", e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <InputField
                                        label="Hora de fin de turno"
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleChange("endTime", e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <TagMultiSelect
                                        label="Etiquetas"
                                        options={tagOptions}
                                        value={Array.isArray(formData.tagsId) ? formData.tagsId : []}
                                        onChange={(selectedIds) => handleChange("tagsId", selectedIds as any)}
                                        required
                                        disabled={isLoading || tagsLoading}
                                        error={
                                            (!formData.tagsId || (Array.isArray(formData.tagsId) && formData.tagsId.length === 0))
                                                ? "Seleccione al menos una etiqueta"
                                                : undefined
                                        }
                                        placeholder="Seleccione una o más etiquetas..."
                                    />
                                </div>

                                {(formData.startTime || formData.endTime) && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                                            Resumen del horario:
                                        </h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            {formData.startTime && (
                                                <p>Inicio: <span className="font-medium">{formData.startTime}</span></p>
                                            )}
                                            {formData.endTime && (
                                                <p>Fin: <span className="font-medium">{formData.endTime}</span></p>
                                            )}
                                            {formData.startTime && formData.endTime && (
                                                <p className="text-blue-600 font-medium">
                                                    Duración: {calculateDuration(formData.startTime, formData.endTime)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {Array.isArray(formData.tagsId) && formData.tagsId.length > 0 && (
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <h3 className="text-sm font-medium text-green-700 mb-2">
                                            Etiquetas seleccionadas:
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.tagsId.map(tagId => {
                                                const tag = tags.find(t => t.id === tagId);
                                                return tag ? (
                                                    <span
                                                        key={tagId}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                    >
                                                        {tag.tagsName}
                                                    </span>
                                                ) : null;
                                            })}
                                        </div>
                                        <p className="text-xs text-green-600 mt-2">
                                            Total: {formData.tagsId.length} etiqueta(s)
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="md"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="success"
                                    size="md"
                                    loading={formLoading}
                                    disabled={isLoading || !isFormValid}
                                    className="flex-1"
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Los campos marcados con * son obligatorios
                        </p>
                        <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-400">
                            <span>Turnos: {shifts.length}</span>
                            <span>Etiquetas: {tags.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const calculateDuration = (start: string, end: string): string => {
    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
};