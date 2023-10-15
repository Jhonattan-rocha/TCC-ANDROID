import React from "react";

export default function DraggableItem(props) {
    return (
      <div draggable onDragStart={props.handleDragStart}>
        {props.children}
      </div>
    );
}
  