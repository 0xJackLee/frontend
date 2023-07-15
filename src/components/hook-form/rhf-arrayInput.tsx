import * as Form from "@radix-ui/react-form"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { ControllerRenderProps } from "react-hook-form/dist/types/controller"

import { Textarea } from "@site/src/components/ui/Textarea"

interface IProps {
  name: string
  label: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  errorMessage?: string
  warningMessage?: string
}

type Props = IProps & React.InputHTMLAttributes<HTMLInputElement>

export default function RHFArrayInput(props: Props) {
  const { name, label, errorMessage, ...other } = props
  const { register, control } = useFormContext()

  const handleDelete = (index: number, field: ControllerRenderProps) => {
    const list = [...field.value]
    list.splice(index, 1)
    field.onChange(list)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Field className="mb-[10px] grid" name={name}>
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px]">
              {label}
            </Form.Label>
            {(error?.message || errorMessage) && (
              <Form.Message className="text-[13px] text-red-500">
                {error?.message || errorMessage}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <>
              {field.value.map((item: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <div className="text-[14px] leading-[35px]">
                    · {`${label} ${index + 1}`}
                  </div>
                  <div className="group flex items-center">
                    <Textarea
                      {...field}
                      {...register(`${name}.${index}`)}
                      value={item}
                      onChange={(e) => {
                        const list = [...field.value]
                        list[index] = e.target.value
                        field.onChange(list)
                      }}
                    />
                    <TrashIcon
                      className="ml-2 hidden h-6 w-6 cursor-pointer text-red-500 group-hover:inline-block"
                      onClick={() => handleDelete(index, field)}
                    />
                  </div>
                </div>
              ))}
              <div
                className="text-md focus:shadow-outline-blue mb-3 mt-4 box-border flex w-full cursor-pointer justify-center rounded border border-dashed border-gray-300 px-3 py-2 leading-5 text-black transition duration-150 ease-in-out placeholder:text-gray-400 focus:border-blue-300 focus:outline-none"
                onClick={() => field.onChange([...field.value, ""])}
              >
                <PlusIcon className="w-6" />
              </div>
            </>
          </Form.Control>
        </Form.Field>
        // <div>
        //   <div>
        //     {field.value.map((item: any, index: number) => (
        //       <div key={index} className="group flex justify-between items-center mb-4">
        //
        //         <TrashIcon
        //           className="w-6 hidden group-hover:inline-block text-red-500 cursor-pointer"
        //           onClick={() => handleDelete(index, field)}
        //         />
        //       </div>
        //     ))}
        //   </div>
        //   <div
        //     className="flex-center cursor-pointer block box-border w-full text-black text-md leading-5 rounded border border-gray-300 border-dashed px-3 py-2 mb-3 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
        //     onClick={() => field.onChange([...field.value, ""])}
        //   >
        //     <PlusIcon className="w-6" />
        //   </div>
        // </div>
      )}
    />
  )
}
