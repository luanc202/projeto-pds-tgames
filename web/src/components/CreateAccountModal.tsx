import * as Dialog from '@radix-ui/react-dialog';
import { SignIn } from 'phosphor-react';
import { FormEvent, useState } from 'react';

import { api } from '../lib/axios';
import { Input } from './Form/input';

export function CreateAccountModal() {

  const [pwd, setPwd] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (!email.trim() || !pwd.trim() || !name.trim()) {
      return alert('Por favor, preencha os campos.');
    }

    try {
      const resp = await api.post(`/users`, {
        name: name,
        email: email,
        password: pwd,
      });

      alert('Cadastro feito com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao enviar formulário.');
    } finally {
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Crie sua conta</Dialog.Title>

        <form className='mt-8 flex flex-col gap-4' onSubmit={handleLogin}>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Nome</label>
            <Input required value={name} onChange={e => setName(e.target.value)} name='name' id='name' type='text' placeholder='Digite seu nome aqui' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <Input required value={email} onChange={e => setEmail(e.target.value)} name='email' id='email' type='email' placeholder='exemplo@exemplo.com' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="password">Senha</label>
            <Input required type='password' value={pwd} onChange={e => setPwd(e.target.value)} name='password' id='password' placeholder='Digite sua senha aqui' />
          </div>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar
            </Dialog.Close>
            <button
              className='bg-fuchsia-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-fuchsia-700'
              type='submit'
            >
              <SignIn size={24} />
              Cadastrar
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}