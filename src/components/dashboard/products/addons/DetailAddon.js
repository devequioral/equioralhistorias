import React from 'react';

import {
  Input,
  Image,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';

import styles from '@/styles/dashboard/products/addons/DetailAddon.module.css';

import { formatDateToISOSM } from '@/utils/utils';

export default function DetailAddon(props) {
  const { schema, record, onFieldChange, onChangeImage } = props;
  //const newRecord = { ...record };

  const formatValue = (key, type) => {
    if (!record) return '';
    const value = record[key];
    if (type == 'date') {
      return formatDateToISOSM(value);
    } else {
      return value;
    }
  };

  const changeImage = (field) => {
    onChangeImage(field);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        {schema.fields.map((field, index) => {
          return (
            <div key={index} className="flex flex-col gap-1">
              {(field.type === 'text' || field.type === 'date') && (
                <Input
                  isReadOnly={field.readOnly ? true : false}
                  type={field.type}
                  label={field.label}
                  onChange={(e) => {
                    onFieldChange(field, e.target.value);
                  }}
                  defaultValue={formatValue(field.key, field.type)}
                />
              )}
              {field.type === 'image' && (
                <div className={`${styles.FieldImage}`}>
                  {field.preview && (
                    <div className={`${styles.ImagePreview}`}>
                      {record && record[field.key] && (
                        <Image
                          className="w-full"
                          src={record[field.key].src}
                          alt=""
                        />
                      )}
                    </div>
                  )}
                  <div
                    className={`${styles.ChangeImage}`}
                    onClick={() => {
                      changeImage(field, record);
                    }}
                  >
                    <span>Change Image</span>
                  </div>
                </div>
              )}
              {field.type === 'select' && (
                <Select
                  items={field.items}
                  placeholder={field.label}
                  className="max-w-xs"
                  defaultSelectedKeys={
                    record && record[field.key] ? [record[field.key]] : null
                  }
                  onChange={(e) => {
                    onFieldChange(field, e.target.value);
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              )}
              {field.type === 'autocomplete' && (
                <Autocomplete
                  defaultItems={field.items}
                  label={field.label}
                  placeholder={field.placeholder}
                  className="max-w-xs"
                  onSelectionChange={(key) => {
                    onFieldChange(field, key);
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
