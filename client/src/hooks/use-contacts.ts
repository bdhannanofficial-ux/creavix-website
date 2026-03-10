import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data: any) => {
      // Validate input against schema
      const validated = api.contacts.create.input.parse(data);
      
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          const error = api.contacts.create.responses[400].parse(errorData);
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to submit contact form");
      }

      return api.contacts.create.responses[201].parse(await res.json());
    },
  });
}
