import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
        <div className='self-stretch rounded-lg overflow-hidden mt-8'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
                <div>
                    <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                    <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className='py-3 px-4 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24} />
                    Publicar Anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}