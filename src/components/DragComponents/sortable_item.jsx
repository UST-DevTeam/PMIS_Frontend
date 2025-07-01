import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;



  return <>
    <div className=" max-w-sm bg-pbutton   rounded-lg shadow dark:bg-pbutton  mb-6 mt-4 " >
      <div className='flex justify-start items-center text-lg \ p-2'>
        <a href="#">
          <img className="rounded-t-lg" src={""} alt="" width="60px"/>
        </a>
        <div className="p-2">
          <p className=' text-sm font-bold'>{id}</p>
        </div>
      </div>
      <div className='p-4 mt-2 flex justify-around'>
        <p className='font-bold'>{"2022-24"}</p>
        <p className=''>{"text"}</p>
      </div>
    </div>
  </>
}

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} className="" style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
}
