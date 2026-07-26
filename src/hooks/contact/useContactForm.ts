"use client";

import { FormEvent, MouseEvent, useState } from "react";
import { toast } from "sonner";
import type { ContactField, ContactFormState } from "@/types";

const INITIAL_FORM: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export const useContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const updateField = (field: ContactField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleButtonMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    setButtonOffset({
      x: (clientX - (left + width / 2)) * 0.2,
      y: (clientY - (top + height / 2)) * 0.2,
    });
  };

  const resetButtonOffset = () => setButtonOffset({ x: 0, y: 0 });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        toast.error("Failed to send message. Please try again.");
      }

      setIsSent(true);
      setShowModal(true);
      setForm(INITIAL_FORM);
      window.setTimeout(() => setIsSent(false), 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return {
    buttonOffset,
    form,
    isSending,
    isSent,
    showModal,
    handleButtonMouseMove,
    handleSubmit,
    resetButtonOffset,
    setShowModal,
    updateField,
  };
};
