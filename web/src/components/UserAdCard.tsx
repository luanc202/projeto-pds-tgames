import * as Dialog from "@radix-ui/react-checkbox";
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check } from "phosphor-react";
import { Input } from "./Form/input";

interface UserAdCardProps {
  name: string;
  discord: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  voiceChat: boolean;
}

export function UserAdCard(props: UserAdCardProps) {

  return (
    <div className=" text-white relative rounded-lg">
      <form className='mt-8 flex flex-col gap-4'>

        <div className='flex flex-col gap-2'>
          <label htmlFor="name">Nome</label>
          <Input disabled name='name' id='name' value={props.name}/>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="yearsPlaying">Anos jogando</label>
            <Input disabled name='yearsPlaying' id='yearsPlaying' type="number" value={props.yearsPlaying} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="discord">Discord</label>
            <Input disabled name='discord' id='discord' value={props.discord} />
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="weekDays">Quando costuma jogar?</label>

            <ToggleGroup.Root
              type='multiple'
              className='grid grid-cols-4 gap-2'
              value={props.weekDays}
            >
              <ToggleGroup.Item
                value='0'
                title='Domingo'
                className={`w-8 h-8 rounded ${props.weekDays.includes('0') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                D
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='1'
                title='Segunda'
                className={`w-8 h-8 rounded ${props.weekDays.includes('1') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='2'
                title='Terça'
                className={`w-8 h-8 rounded ${props.weekDays.includes('2') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                T
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='3'
                title='Quarta'
                className={`w-8 h-8 rounded ${props.weekDays.includes('3') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='4'
                title='Quinta'
                className={`w-8 h-8 rounded ${props.weekDays.includes('4') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='5'
                title='Sexta'
                className={`w-8 h-8 rounded ${props.weekDays.includes('5') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value='6'
                title='Sábado'
                className={`w-8 h-8 rounded ${props.weekDays.includes('6') ? 'bg-fuchsia-600' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>


          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor="hourStart">Qual horário do dia?</label>
            <div className='grid grid-cols-2 gap-2'>
              <Input disabled name='hourStart' id='hourStart' type="time" value={props.hourStart} />
              <Input disabled name='hourEnd' id='hourEnd' type="time" value={props.hourStart} />
            </div>
          </div>
        </div>


        <label className='mt-2 flex gap-2 text-sm'>
          <Checkbox.Root
            checked={props.voiceChat}
            className='w-6 h-6 p-1 rounded bg-zinc-900'
          >
            <Checkbox.Indicator>
              <Check className='w-4 h-4 text-emerald-400' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Costumo me conectar ao chat de voz
        </label>

      </form>
    </div>
  )
}