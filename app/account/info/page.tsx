"use client";
import { Card } from "@/src/components/ui/card";
import React, { useState } from "react";

export default function Info() {
  const userInfo = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "********",
    phoneNumber: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    birthDate: "1990-01-01",
    interests: "Reading, Traveling, Coding",
  };

  const [editableField, setEditableField] = useState<string | null>(null);
  const [user, setUser] = useState(userInfo);

  const handleEdit = (field: string) => {
    setEditableField(field);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const handleSave = () => {
    setEditableField(null);
  };

  return (
    <div className="mx-20">
      <h1 className="py-3 text-2xl font-bold">Compte</h1>
      <Card className="w-full p-5">
        {Object.keys(userInfo).map((field) => (
          <div
            key={field}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "10px",
              }}
            >
              <label
                className="font-light"
                style={{ textTransform: "capitalize" }}
              >
                {field.replace(/([A-Z])/g, " $1")} :
              </label>
              {editableField === field ? (
                <input
                  type="text"
                  className="text-lg"
                  value={user[field as keyof typeof user]}
                  onChange={(e) => handleChange(e, field)}
                />
              ) : (
                <span className="text-lg font-bold">
                  {user[field as keyof typeof user]}
                </span>
              )}
            </div>
            <button
              className="border border-gray-200 text-black px-4 py-2 rounded"
              onClick={() =>
                editableField === field ? handleSave() : handleEdit(field)
              }
              style={{ marginLeft: "auto" }}
            >
              {editableField === field ? "Sauvegarder" : "Modifier"}
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
