import React, { useState } from "react";

interface EditUserModalProps {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  onSave: (updatedUser: {
    firstname: string;
    lastname: string;
    email: string;
  }) => void;
  onCancel: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ firstname, lastname, email });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
        <h2 className="text-xl font-bold mb-4 text-[#00694B]">
          Edit User
        </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="First Name"
            required
          />

          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Last Name"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Email"
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00694B] text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
