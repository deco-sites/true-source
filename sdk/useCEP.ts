import { useSignal, useSignalEffect } from "@preact/signals";

type Cep = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: Location;
};

type Location = {
  type: string;
  coordinates: Coordinates;
};

type Coordinates = {
  longitude: string;
  latitude: string;
};

type Errors = "NOT_FOUND" | "EXPLODED";

export default function () {
  const cep = useSignal<number | null>(null);
  const loading = useSignal(false);
  const data = useSignal<Cep | null>(null);
  const error = useSignal<Errors | null>(null);

  useSignalEffect(() => {
    if (!cep.value) return;

    loading.value = true;

    fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
      .then((r) => {
        if (!r.ok) throw new Error("NOT_FOUND");

        return r.json();
      })
      .then((r: Cep) => {
        data.value = r;
        error.value = null;
      })
      .catch((e) => {
        if (e.message === "NOT_FOUND") {
          error.value = "NOT_FOUND";
        } else {
          console.error(e);
          error.value = "EXPLODED";
        }
      })
      .finally(() => {
        loading.value = false;
      });
  });

  return {
    cep,
    loading,
    data,
    error,
  };
}
