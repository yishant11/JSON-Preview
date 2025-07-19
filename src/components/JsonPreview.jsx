function transformToObject(fields) {
  const result = {};
  fields.forEach((field) => {
    const { name, type, children } = field;
    if (!name) return;
    if (type === "string") result[name] = "";
    else if (type === "number") result[name] = 0;
    else if (type === "nested")
      result[name] = children ? transformToObject(children) : {};
  });
  return result;
}

export default function JsonPreview({ data }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">JSON Preview</h2>
      <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm h-full overflow-auto">
        {JSON.stringify(transformToObject(data), null, 2)}
      </pre>
    </>
  );
}
