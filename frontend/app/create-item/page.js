import React from "react";

export default function create_item() {
  return (
    <div>
      Create New Item
      <form>
        <label>Item Name:</label>
        <input />
        <label>Item Description:</label>
        <input />
        <label>Item Price:</label>
        <input />
      </form>
    </div>
  );
}
