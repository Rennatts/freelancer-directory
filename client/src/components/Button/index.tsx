import React from "react";


type TextProps <C extends React.ElementType> = {
    children: React.ReactNode
} & React.ComponentPropsWithoutRef<C>;

export const Button = <C extends React.ElementType>({
    children,
    ...restProps
}: TextProps<C>) => {
  console.log("children", children)

    return <button className="ml-2 flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button"{ ...restProps}>{children}</button>
};