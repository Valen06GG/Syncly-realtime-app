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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error('Error al crear el tablero');
    }

    return response.json();
}

export async function getBoardsRequest(token: string) {
    const response = await fetch(`${API}/boards`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los tableros');
    }

    return response.json();
}

export async function createColumnsRequest(token: string, boardId: string, title: string, order: number) {
    const response = await fetch(`${API}/columns`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ boardId, title, order }),
    });

    if (!response.ok) {
        throw new Error('Error al crear la columna');
    }

    return response.json();
}

export async function getColumnsRequest(token: string, boardId: string) {
    const response = await fetch(`${API}/columns/${boardId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener las columnas');
    }

    return response.json();
}

export async function createTasksRequest(
    token: string, 
    columnId: string, 
    title: string, 
    order: number, 
    description: string
    ) {
    const response = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ columnId, title, order, description }),
    });

    if (!response.ok) {
        throw new Error('Error al crear la tarea');
    }

    return response.json();
}

export async function moveTaskRequest(
    token: string, 
    taskId: string,
    toColumnId: string,
    newOrder: number
    ) {
    const response = await fetch(`${API}/tasks/move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify({ taskId, toColumnId, newOrder }),
    });

    if (!response.ok) {
        throw new Error('Error al mover la tarea');
    }

    return response.json();
}
    