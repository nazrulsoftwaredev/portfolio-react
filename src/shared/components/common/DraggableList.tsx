import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";

export const DraggableList = ({
  items,
  onReorder,
  renderItem,
  keyExtractor,
}) => {
  const [draggedId, setDraggedId] = useState(null);

  const handleReorder = (fromIndex, direction) => {
    if (direction === "up" && fromIndex > 0) {
      const newItems = [...items];
      [newItems[fromIndex], newItems[fromIndex - 1]] = [
        newItems[fromIndex - 1],
        newItems[fromIndex],
      ];
      onReorder(newItems);
    } else if (direction === "down" && fromIndex < items.length - 1) {
      const newItems = [...items];
      [newItems[fromIndex], newItems[fromIndex + 1]] = [
        newItems[fromIndex + 1],
        newItems[fromIndex],
      ];
      onReorder(newItems);
    }
  };

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={keyExtractor(item)}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group"
          >
            <div className="flex items-center gap-3 p-3 bg-on-surface/5 rounded-lg hover:bg-on-surface/10 transition-colors">
              {/* Drag Handle */}
              <GripVertical className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" />

              {/* Item Content */}
              <div className="flex-1 min-w-0">{renderItem(item, index)}</div>

              {/* Reorder Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleReorder(index, "up")}
                  disabled={index === 0}
                  className="p-1 hover:bg-on-surface/20 rounded disabled:opacity-30 transition-colors"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4 text-on-surface-variant" />
                </button>
                <button
                  onClick={() => handleReorder(index, "down")}
                  disabled={index === items.length - 1}
                  className="p-1 hover:bg-on-surface/20 rounded disabled:opacity-30 transition-colors"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
