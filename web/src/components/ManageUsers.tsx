import { Check, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios';

interface User {
  id: string,
  email: string,
  name: string,
  isActive: boolean,
}

export function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  async function handleChangeUserStatus(id: string, status: boolean) {
    await api.post(`/user/${id}/changestatus`, {
      isActive: !(status),
    });

    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }

  return (
    <div className="mx-auto flex flex-col items-start my-20">
      <div className="table w-full table-auto bg-[#2A2634] text-white border-separate border-spacing-2 border-2 border-zinc-700 rounded-lg">
        <div className='table-header-group'>
          <div className='table-row'>
            <div className='table-cell text-center font-bold'>Id do Usuário</div>
            <div className='table-cell text-center font-bold'>Nome</div>
            <div className='table-cell text-center font-bold'>Email</div>
            <div className='table-cell text-center font-bold'>Status</div>
          </div>
        </div>
        <div className='table-row-group'>
          {users.map(user => {
              return (
                <div className='table-row text-center' key={user.id}>
                  <div className='table-cell p-2 bg-zinc-900 rounded-lg hover:bg-zinc-700'>{user.id}</div>
                  <div className='table-cell bg-zinc-900 rounded-lg hover:bg-zinc-700 px-1'>{user.name}</div>
                  <div className='table-cell bg-zinc-900 rounded-lg hover:bg-zinc-700'>{user.email}</div>
                  <div onClick={() => handleChangeUserStatus(user.id, user.isActive)} className='hover:cursor-pointer table-cell align-middle bg-zinc-900 rounded-lg hover:bg-zinc-700'>{user.isActive ? <Check className='w-4 h-4 text-emerald-400 bg-[#4A357D] ml-4 ' /> : <X className='w-4 h-4 text-red-600 bg-purple-900 ml-4' />}</div>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}