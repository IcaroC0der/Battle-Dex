"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import RetroDialog from "./RetroDialog";

export default function DeleteTeamButton({ teamId }: { teamId: string }) {
  const [loading, setLoading] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    message: string;
    type: "alert" | "confirm";
  }>({
    isOpen: false,
    message: "",
    type: "alert",
  });
  
  const router = useRouter();

  const initiateDelete = () => {
    setDialogConfig({
      isOpen: true,
      message: "Tem certeza que deseja excluir esta equipe? Essa ação não pode ser desfeita.",
      type: "confirm",
    });
  };

  const handleConfirmDelete = async () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
    setLoading(true);
    
    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        setDialogConfig({
          isOpen: true,
          message: data.message || "Erro ao deletar equipe",
          type: "alert",
        });
      }
    } catch (e) {
      setDialogConfig({
        isOpen: true,
        message: "Erro de conexão",
        type: "alert",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <button 
        onClick={initiateDelete}
        disabled={loading}
        title="Excluir Equipe"
        className="px-4 py-3 border-4 border-red-700 bg-red-500 hover:bg-red-400 text-white font-bold uppercase flex justify-center items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] disabled:opacity-50"
      >
        <Trash2 size={20} />
      </button>

      <RetroDialog
        isOpen={dialogConfig.isOpen}
        message={dialogConfig.message}
        type={dialogConfig.type}
        onConfirm={dialogConfig.type === "confirm" ? handleConfirmDelete : handleCancelDialog}
        onCancel={handleCancelDialog}
      />
    </>
  );
}
