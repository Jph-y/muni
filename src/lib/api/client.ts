const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const USAR_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchOptions = RequestInit & {
  revalidate?: number | false;
  tags?: string[];
};

export async function apiFetch<T>(
  ruta: string,
  { revalidate = 300, tags, ...init }: FetchOptions = {},
): Promise<T> {
  const url = `${API_URL}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;

  const respuesta = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
    next: { revalidate, tags },
  });

  if (!respuesta.ok) {
    let mensaje = "No se pudo completar la solicitud.";
    let codigo: string | undefined;

    try {
      const cuerpo = (await respuesta.json()) as {
        message?: string;
        code?: string;
      };
      mensaje = cuerpo.message ?? mensaje;
      codigo = cuerpo.code;
    } catch {
      mensaje = respuesta.statusText || mensaje;
    }

    throw new ApiError(mensaje, respuesta.status, codigo);
  }

  return (await respuesta.json()) as T;
}
