import { Gear, MagnifyingGlassPlus, SignIn, User } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from "./CreateAdModal";
import { LoginUserModal } from "./LoginUserModal";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function CreateAdBanner() {
    const { user } = useContext(AuthContext);

    if (user.role === 'ADMIN') {
        return (
            <div className='self-stretch rounded-lg overflow-hidden mt-8'>
                <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
                    <div>
                        <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                        <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
                    </div>

                    <div className="flex gap-4">

                        <Dialog.Root>
                            <Dialog.Trigger className='py-3 px-4 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 flex items-center gap-3'>
                                <MagnifyingGlassPlus size={24} />
                                Publicar Anúncio
                            </Dialog.Trigger>
                            <CreateAdModal />
                        </Dialog.Root>

                        <Link to='/admin'>
                            <div className='py-3 px-4 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 flex items-center gap-3'>
                                <Gear size={24} />
                                Painel Admin
                            </div>
                        </Link>

                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className='self-stretch rounded-lg overflow-hidden mt-8'>
                <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
                    <div>
                        <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                        <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
                    </div>

                    <div className="flex gap-4">

                        {
                            user.name ?
                                <Dialog.Root>
                                    <Dialog.Trigger className='py-3 px-4 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 flex items-center gap-3'>
                                        <MagnifyingGlassPlus size={24} />
                                        Publicar Anúncio
                                    </Dialog.Trigger>
                                    <CreateAdModal />
                                </Dialog.Root>
                                :
                                <>
                                    <Dialog.Root>
                                        <Dialog.Trigger className='py-3 px-4 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 flex items-center gap-3'>
                                            <User size={24} />
                                            Criar conta
                                        </Dialog.Trigger>
                                        <CreateAdModal />
                                    </Dialog.Root>

                                    <Dialog.Root>
                                        <Dialog.Trigger className='py-3 px-4 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 flex items-center gap-3'>
                                            <SignIn size={24} />
                                            Fazer Login
                                        </Dialog.Trigger>
                                        <LoginUserModal />
                                    </Dialog.Root>
                                </>
                        }

                    </div>

                </div>
            </div>
        )
    }
}