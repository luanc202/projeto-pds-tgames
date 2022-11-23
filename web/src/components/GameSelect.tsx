import * as Select from '@radix-ui/react-select'
import { Check, GameController, CaretDown, CaretUp, } from 'phosphor-react';


export default function GameSelect() {
  return (
    <Select.Root>
              <Select.Select>
                <Select.Trigger aria-label='Game'>
                  <Select.Value
                    placeholder='Selecione o game que deseja jogar'
                  />
                  <Select.Icon>
                    <CaretDown />
                  </Select.Icon>
                  <Select.Content>
                    <Select.ScrollUpButton>
                      <CaretUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        <Select.Item value="apple">
                          <Select.ItemText>Apple</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="banana">
                          <Select.ItemText>Banana</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="blueberry">
                          <Select.ItemText>Blueberry</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="grapes">
                          <Select.ItemText>Grapes</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="pineapple">
                          <Select.ItemText>Pineapple</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check />
                          </Select.ItemIndicator>
                        </Select.Item>
                      </Select.Group>
                    </ Select.Viewport>
                    <Select.Separator />
                  </Select.Content>

                </Select.Trigger>
              </Select.Select>
            </ Select.Root>
  )
}