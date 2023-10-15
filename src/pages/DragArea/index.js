import React from "react";

export default function DropArea(props) {
    
    return (
      <div id={`${props.id}`} className={props.className} onDrop={props.handleDrop} onDragOver={props.handleDragOver}>
        {props.children}
      </div>
    );
}
  