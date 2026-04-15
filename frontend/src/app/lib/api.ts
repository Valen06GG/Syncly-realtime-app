const API = process.env.NEXT_PUBLIC_API_URL;

export async function loginRequest(email: string, password: string) {

  const response = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }

  return response.json();
}

export async function profileRequest(token: string) {
    const response = await fetch(`${API}/auth/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener el perfil');
    }

    return response.json();
}

export async function createBoardRequest(token: string, title: string) {
    const response = await fetch(`${API}/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error('Error al crear el tablero');
    }

    return response.json();
}
