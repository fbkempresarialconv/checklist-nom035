import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialTasks = [
  {
    id: 1,
    fase: "Diagnóstico",
    actividad: "Revisar informe de resultados anterior",
    responsable: "",
    fecha: "",
    riesgo: "Medio",
    completado: false,
  },
  {
    id: 2,
    fase: "Prevención",
    actividad: "Reinstalar comité de riesgos psicosociales",
    responsable: "",
    fecha: "",
    riesgo: "Alto",
    completado: false,
  },
  {
    id: 3,
    fase: "Control",
    actividad: "Aplicar guía 1 para ATS si no hay certeza",
    responsable: "",
    fecha: "",
    riesgo: "Muy Alto",
    completado: false,
  },
  {
    id: 4,
    fase: "Seguimiento",
    actividad: "Auditar cumplimiento de la norma",
    responsable: "",
    fecha: "",
    riesgo: "Bajo",
    completado: false,
  },
];

export default function Nom035Checklist() {
  const [tasks, setTasks] = useState(initialTasks);
  const [faseFilter, setFaseFilter] = useState("");
  const [riesgoFilter, setRiesgoFilter] = useState("");

  const updateTask = (id, key, value) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, [key]: value } : task))
    );
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (faseFilter ? task.fase === faseFilter : true) &&
      (riesgoFilter ? task.riesgo === riesgoFilter : true)
    );
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <Select onValueChange={setFaseFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por fase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
            <SelectItem value="Prevención">Prevención</SelectItem>
            <SelectItem value="Control">Control</SelectItem>
            <SelectItem value="Seguimiento">Seguimiento</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setRiesgoFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por riesgo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bajo">Bajo</SelectItem>
            <SelectItem value="Medio">Medio</SelectItem>
            <SelectItem value="Alto">Alto</SelectItem>
            <SelectItem value="Muy Alto">Muy Alto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredTasks.map(task => (
        <Card key={task.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4">
          <Checkbox
            checked={task.completado}
            onCheckedChange={val => updateTask(task.id, "completado", val)}
          />
          <div className="flex-1">
            <div className="font-semibold text-lg">{task.actividad}</div>
            <div className="text-sm text-gray-600">Fase: {task.fase} | Riesgo: {task.riesgo}</div>
          </div>
          <Input
            className="max-w-xs"
            placeholder="Responsable"
            value={task.responsable}
            onChange={e => updateTask(task.id, "responsable", e.target.value)}
          />
          <Input
            type="date"
            className="max-w-xs"
            value={task.fecha}
            onChange={e => updateTask(task.id, "fecha", e.target.value)}
          />
        </Card>
      ))}
    </div>
  );
}
