# Простейший API для управления задачами

Список задач (тип Task) хранится на сервере в оперативной памяти.

```typescript
type Task = {
    id: number,
    title: string,
    body: string,
    // ? means that this field is optional
    deadline?: number, // UTC timestamp
    status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'
}
```

---

Эндпоинты.

* POST /tasks
    
    ```typescript
    type RequestBody = {
        title?: string;
        body?: string;
        deadline?: number;
    }
    ```

    Запрос на этот эндпоинт создаст и сохранит новую задачу.</br>
    При отсутствии ```req.body.title``` следует использовать стандартное значение - "No Title".</br>
    При отсутствии ```req.body.body``` следует использовать стандартное значение - пустую строку.</br>

    Для новой задачи должен быть создан уникальный цифровой идентификатор (```id```).

    ```typescript
    type Response = {
        id: number; // created task id
    }
    ```

* GET /tasks

    ```typescript
    type RequestBody = {
        status?: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'
    }
    ```

    Запрос на этот эндпоинт ответит списком задач.</br>
    При отсутствии ```req.body.status``` ответом должен быть список всех задач. При наличии ```req.body.status``` ответом должен быть список задач с соответствущим ```status```.

    ```typescript
    type Response = [
        {
            id: number;
            title: string;
            body: string;
            deadline?: number;
            status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
        }
    ];
    ```

* GET /task/:id

    Запрос на этот эндпоинт ответит задачей с идентификатором соответствующим запрашиваемому (```req.params.id```).

    ```typescript
    type Response = {
        id: number;
        title: string;
        body: string;
        deadline?: number;
        status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
    }
    ```

* PUT /task/:id

    ```typescript
    type RequestBody = {
        title?: string;
        body?: string;
        deadline?: number;
        status?: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
    };
    ```

    Запрос на этот эндпоинт обновит задачу с соответствующим идентификатором (```req.params.id```) новыми полями.

    ```typescript
    type Response = 'OK';
    ```

* DELETE /task/:id

    Запрос на этот эндпоинт удалит задачу с соответствующим идентификатором (```req.params.id```).

    ```typescript
    type Response = 'OK';
    ```
