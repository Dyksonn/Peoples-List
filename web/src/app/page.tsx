"use client";
import { useState, useEffect } from "react";
import { People } from "@/types/people";
import { PeopleTable } from "@/components/PeopleTable";
import { servicePeople } from "@/service/service-peoples";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [people, setPeople] = useState<People[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<People[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPeople = async () => {
    const response = await servicePeople.listPeople();

    setPeople(response.peoples);
    setFilteredPeople(response.peoples);
  };

  const onDeleteSuccess = (id: string) => {
    setPeople(person => person.filter(item => item.id !== id));
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    const filtered = Array.isArray(people) ? people.filter(person =>
      Object.values(person).some(value =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    ) : [];
    setFilteredPeople(filtered);
    setCurrentPage(1);
  }, [search, people]);

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciamento de Pessoas</h1>
          <button
            onClick={() => {
              router.push('/pessoas/new');
            }}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Criar Pessoa
          </button>
        </div>

        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700"
        />

        <PeopleTable
          people={filteredPeople}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onDeleteSuccess={onDeleteSuccess}
        />

        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
