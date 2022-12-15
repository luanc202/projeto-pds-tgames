import { useContext } from "react";
import { AddGameForm } from "../components/AddGameForm";
import { AuthContext } from "../context/AuthContext";
import { useTabs } from "react-headless-tabs";
import { TabSelector } from "../components/TabSelector";
import { ManageGames } from "../components/ManageGames";
import { ManageUsers } from "../components/ManageUsers";

export function AdminPanel() {
  const { user } = useContext(AuthContext);
 
  const [selectedTab, setSelectedTab] = useTabs(["addGame", 'manageUsers', 'manageGames'], "addGame");

  if (user.role !== 'ADMIN') {
    return (
      <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <h1 className='text-4xl font-bold text-gray-300'>Você não tem permissão para acessar essa página.</h1>
      </div>
    )
  }

  else {
    return (
      <>
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
          <h1 className='pl-6 font-black text-white text-7xl block'>Painel Admin</h1>
          <nav className="flex border-b border-fuchsia-900">
            <TabSelector
              isActive={selectedTab === "addGame"}
              onClick={() => setSelectedTab("addGame")}
            >
              Adicionar Game
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "manageGames"}
              onClick={() => setSelectedTab("manageGames")}
            >
              Gerenciar Games
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "manageUsers"}
              onClick={() => setSelectedTab("manageUsers")}
            >
              Gerenciar Usuários
            </TabSelector>
          </nav>
          {selectedTab === "addGame" && (
            <AddGameForm />
          )}
          {selectedTab === "manageGames" &&
          (<ManageGames />)
          }
          {selectedTab === "manageUsers" &&
          (<ManageUsers />)
          }
        </div>
      </>
    )
  }
}