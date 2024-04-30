import { useCallback, useState } from "react";

export const useModalFormState = (initialState = false) => {
  const [form, setForm] = useState(initialState);

  const openForm = useCallback(() => setForm(true), []);
  const closeForm = useCallback(() => setForm(false), []);

  return [form, openForm, closeForm];
};
