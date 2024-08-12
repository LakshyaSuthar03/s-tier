import Tier from "./Tier";

const TierList = () => {
  const handleDragStart = (e: React.DragEvent, drag: string) => {
    e.dataTransfer.setData("widgetType", drag);
  };

  return (
    <div className="h-dvh w-svw">
      <Tier tierName="S" tierColor="rgb(255, 127, 127)" />
      <Tier tierName="A" tierColor="rgb(255, 191, 127)" />
      <Tier tierName="B" tierColor="rgb(255, 223, 127)" />
      <Tier tierName="C" tierColor="rgb(255, 255, 127)" />
      <Tier tierName="D" tierColor="rgb(191, 255, 127)" />
      <div
        className="h-24 w-24 bg-gray-600"
        draggable
        onDragStart={(e) => handleDragStart(e, "drag")} // Use onDragStart instead of onDrag
      >
        drag
      </div>
    </div>
  );
};

export default TierList;
//rgb(255, 127, 127) rgb(255, 191, 127) rgb(255, 223, 127) rgb(255, 255, 127) rgb(191, 255, 127)
