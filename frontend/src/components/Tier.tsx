import { useState } from "react";

interface ITierListProps {
  tierName: string;
  tierColor: string;
}

const Tier: React.FC<ITierListProps> = ({ tierName, tierColor }) => {
  const [name, setName] = useState<string>(tierName);
  const [items, setItems] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData("widgetType"); // Retrieve widgetType
    if (widgetType) {
      console.log(widgetType);

      setItems((prevItems) => [...prevItems, widgetType]);
    }
  };

  return (
    <div
      className="w-svw border-b-2 border-black h-24 flex"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()} // Allow drop
    >
      <textarea
        className="h-full w-24 resize-none outline-none text-center place-content-center"
        style={{ backgroundColor: tierColor }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {items.map((widgetType, index) => (
        <div
          key={index}
          className="h-24 w-24 text-white"
          style={{ backgroundColor: "grey" }}
        >
          <img src={widgetType} className="h-full w-full object-cover" alt="" />
        </div>
      ))}
    </div>
  );
};

export default Tier;
