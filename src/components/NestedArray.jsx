import { useFieldArray, Controller } from "react-hook-form";
import { Button, Input, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const FIELD_TYPES_NESTED = [
  { label: "String", value: "string" },
  { label: "Number", value: "number" },
];

export function NestedArray({ control, parentIndex }) {
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
                {FIELD_TYPES_NESTED.map((opt) => (
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
