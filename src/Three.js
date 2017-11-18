import React, { Component } from "react";
import SortableTree, {
  getFlatDataFromTree,
  getTreeFromFlatData,
  map as treeMap
} from "react-sortable-tree";
import "./Three.css";
import emitter from "./EventBus";

class ItemEditor extends Component {
  constructor(props) {
    super(props);

    this.onPropChange = this.onPropChange.bind(this);
  }

  onPropChange(ev) {
    this.props.editTarget(ev.target);
  }

  render() {
    return (
      <div className="editor-container">
        {this.props.item.id}
        <div>
          <label htmlFor="link">Link</label>
          <br />
          <input
            type="text"
            name="link"
            value={this.props.item.link}
            data-id={this.props.item.id}
            onChange={this.onPropChange}
          />
        </div>
        <div>
          <label htmlFor="page_id">page_id</label>
          <br />
          <input
            type="text"
            name="page_id"
            value={this.props.item.page_id}
            data-id={this.props.item.id}
            onChange={this.onPropChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={this.props.item.name}
            data-id={this.props.item.id}
            onChange={this.onPropChange}
          />
        </div>
      </div>
    );
  }
}

class Three extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: getTreeFromFlatData({
        flatData: this.props.items,
        getKey: node => node.id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key

        rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
      }),
      showEditor: true,
      editNode: null
    };
    this.editTarget = this.editTarget.bind(this);
  }

  editTarget(target) {
    console.log(target.name, target.value);
    const updatedNode = {
      ...this.state.editNode,
      [target.name]: target.value
    };
    this.setState({
      editNode: updatedNode,
      treeData: treeMap({
        treeData: this.state.treeData,
        getNodeKey: ({ node }) => node.id,
        ignoreCollapsed: false,
        callback: ({ node }) =>
          node.id === parseInt(target.getAttribute("data-id"), 10)
            ? updatedNode
            : node
      })
    });
  }

  showEditor(node) {
    this.setState({
      editNode: node,
      showEditor: true
    });
  }

  render() {
    const flatData = getFlatDataFromTree({
      treeData: this.state.treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node, path }, index) => ({
      id: node.id,
      name: node.name,
      order: index,
      link: node.link,
      page_id: node.page_id,

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null
    }));

    return (
      <div className="app-container">
        <div className="three-container">
          <input
            style={{ width: "100%" }}
            type="text"
            value={JSON.stringify(flatData)}
            readOnly
          />

          <div style={{ height: 250 }}>
            <SortableTree
              treeData={this.state.treeData}
              onChange={treeData => this.setState({ treeData })}
              generateNodeProps={rowInfo => ({
                title: rowInfo.node.name,
                onClick: () => {
                  console.log(rowInfo.node);
                  this.showEditor(rowInfo.node);
                }
              })}
            />
          </div>
          <ul style={{ display: "none" }}>
            {flatData.map(({ id, name, order, parent }, index) => (
              <li key={id}>
                id: {id}, name: {name}, order: {index} ,parent:{" "}
                {parent || "null"}
              </li>
            ))}
          </ul>
        </div>
        {this.state.showEditor && this.state.editNode ? (
          <ItemEditor
            key={"editor-" + this.state.editNode.id}
            item={this.state.editNode}
            editTarget={this.editTarget}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Three;
