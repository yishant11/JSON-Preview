import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Input, Select, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const FIELD_TYPES = [
  { label: "String", value: "string" },
  { label: "Number", value: "number" },
  { label: "Nested", value: "nested" },
];

export default function SchemaBuilder() {
  const { control, watch } = useForm({ defaultValues: { fields: [] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
    keyName: "fieldId",
  });
  const current = watch("fields");
  const addField = () => append({ name: "", type: "string", children: [] });

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg flex space-x-8">
      <div className="w-1/2 h-full">
        <h2 className="text-xl font-bold mb-4 text-blue-500">Schema Builder</h2>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.fieldId}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <Space wrap align="start" className="w-full">
                <Controller
                  name={`fields.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Key Name"
                      className="rounded-md shadow-inner w-40"
                    />
                  )}
                />
                <Controller
                  name={`fields.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Type"
                      className="rounded-md w-32"
                    >
                      {FIELD_TYPES.map((opt) => (
                        <Option key={opt.value} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                <Button
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => remove(index)}
                />
                {watch(`fields.${index}.type`) === "nested" && (
                  <div className="ml-8 pl-4 border-l-4 border-blue-100">
                    <NestedArray control={control} parentIndex={index} />
                  </div>
                )}
              </Space>
            </div>
          ))}
        </div>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addField}
          block
          className="mt-4 border-dashed hover:bg-blue-600 text-blue-400"
        >
          Add Field
        </Button>
      </div>

      <div className="w-1/2 h-full">
        <h2 className="text-xl font-bold mb-4 text-blue-500">JSON Preview</h2>
        <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm h-full overflow-auto">
          {JSON.stringify(transformToObject(current), null, 2)}
        </pre>
      </div>
    </div>
  );
}

function NestedArray({ control, parentIndex }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `fields.${parentIndex}.children`,
    keyName: "childId",
  });
  const addChild = () => append({ name: "", type: "string" });

  return (
    <>
      {fields.map((child, idx) => (
        <div key={child.childId} className="flex items-center mb-3">
          <Controller
            name={`fields.${parentIndex}.children.${idx}.name`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Key Name"
                className="rounded-md w-36"
              />
            )}
          />
          <Controller
            name={`fields.${parentIndex}.children.${idx}.type`}
            control={control}
            render={({ field }) => (
              <Select {...field} className="rounded-md w-32 ml-2">
                {FIELD_TYPES.filter((t) => t.value !== "nested").map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            )}
          />
          <Button
            danger
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => remove(idx)}
            className="ml-2"
          />
        </div>
      ))}
      <Button type="link" onClick={addChild} className="text-blue-600 ml-2">
        + Add Nested Field
      </Button>
    </>
  );
}

function transformToObject(fields) {
  const result = {};
  fields.forEach((field) => {
    const { name, type, children } = field;
    if (!name) return;
    if (type === "string") result[name] = "";
    else if (type === "number") result[name] = 0;
    else if (type === "nested") {
      result[name] = children ? transformToObject(children) : {};
    }
  });
  return result;
}
