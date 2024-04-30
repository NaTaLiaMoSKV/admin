const { useState, useMemo } = require("react");

const useFilter = (items, getFields) => {
  const [filter, setFilter] = useState("");

  const filteredItems = useMemo(() => {
    if (!items) {
      return [];
    }
    if (filter.length < 2) {
      return items;
    }
    const lowercasedFilter = filter.toLowerCase();
    return items.filter((item) =>
      getFields(item).some((field) =>
        field.toLowerCase().includes(lowercasedFilter)
      )
    );
  }, [filter, getFields, items]);

  return [filter, setFilter, filteredItems];
};

export default useFilter;
