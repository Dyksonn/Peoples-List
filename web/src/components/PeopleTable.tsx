import { People } from "@/types/people";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { servicePeople } from "@/service/service-peoples";
import { useRouter } from "next/navigation";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { LoadingModal } from "./LoadingModal";

interface PeopleTableProps {
  people: People[];
  currentPage: number;
  itemsPerPage: number;
  onDeleteSuccess: (id: string) => void;
}

export function PeopleTable({ people, currentPage, itemsPerPage, onDeleteSuccess }: PeopleTableProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<People | null>(null);
  const router = useRouter();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPeople = Array.isArray(people) ? people.slice(startIndex, endIndex) : [];

  const handleViewPerson = async (id: string) => {
    try {
      router.push(`/pessoas/${id}`);
    } catch (error) {
      console.log("Erro ao navegar para página de detalhes:", error);
    }
  };

  const handleDeletePerson = async (id: string) => {
    try {
      setLoading(true);
      await servicePeople.deletePeople(id)
      setIsDeleteModalOpen(false);
      onDeleteSuccess(id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log("Erro ao buscar detalhes da pessoa:", error);
    } finally {
      setLoading(false);
    }
  }

  const openDeleteModal = (person: People) => {
    setPersonToDelete(person);
    setIsDeleteModalOpen(true);
  };
  
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">CPF</th>
              <th className="px-6 py-3">Data Nasc.</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentPeople.map((person) => (
              <tr key={person.id} className="border-b bg-gray-800 border-gray-700">
                <td className="px-6 py-4">{person.name}</td>
                <td className="px-6 py-4">{person.email}</td>
                <td className="px-6 py-4">{person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</td>
                <td className="px-6 py-4">{new Date(person.birthDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleViewPerson(person.id)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(person)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => personToDelete && handleDeletePerson(personToDelete.id)}
        personName={personToDelete?.name || ''}
      />
      
      <LoadingModal isOpen={loading} />
    </>
  );
} 