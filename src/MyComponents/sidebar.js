import React from "react";

//no-anonymous-default-export
export default function Sidebar()  {
  const onDragStart = (event, nodeType) => 
  {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  
  };
  return (
    <aside style={{backgroundColor:"skyblue"}}>

      <div className="description">
        <h3> You can drag these nodes to the pane on the right.</h3> 
        **NOTE** [ to delete any node just backspace on that node ]
      </div>

      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable 
        // style={{backgroundColor:"red"}}
        >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
    >
        Output Node
      </div>
    </aside>
  );
};
//import/no-anonymous-default-export