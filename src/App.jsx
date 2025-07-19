import SchemaBuilder from "./components/SchemaBuilder";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center  text-blue-800 underline">
        JSON BUILDER
      </h1>
      <div className="flex justify-center items-center mt-10">
        <SchemaBuilder />
      </div>
    </div>
  );
};

export default App;
