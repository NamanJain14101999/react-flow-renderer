import React, { useState, useRef } from "react";
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls } from "react-flow-renderer";
import "./styles.css";
import Sidebar from "./sidebar";

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 }
  },];
//   {
//     id: "2",
//     type: "input",
//     data: { label: "input node" },
//     position: { x: 250, y: 5 }
//   }];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Main2() {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);


  const onConnect = (params) =>{ setElements((els) => addEdge(params, els))};
  const onElementsRemove = (elementsToRemove) =>setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` }
    };
    // console.log(newNode)
    
    setElements((es) => es.concat(newNode));

  };
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          style={{ height: "500px", width: "500px" , backgroundColor:"black" }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}

