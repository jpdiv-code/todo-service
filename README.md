Перове домашнее задание.

Сервис должен хранить у себя в памяти список задач (прямо в оперативке, прямо в каком-нибудь массиве).

Каждая задача имеет ЗАГОЛОВОК (title), ТЕКСТ (body), КРАЙНИЙ СРОК (deadline) и СТАТУС (status).

(эндпоинт - конечная точка)
(роут - маршрут)
(
    всё это названия для: example-domain.org/tasks/32/status <- вот этого вот пути после /
)

Сервер должен реализовывать следующие эндпоинты (они же роуты)
Все запросы должны ПРИНИМАТЬ и ОТВЕЧАТЬ json-ом

------
------
------

POST /tasks
При запросе на этот эндпоинт, мы должны создавать новую задачу (task)
у нас в памяти, с указанными ЗАГОЛОВКОМ, ТЕКСТОМ и КРАЙНИМ СРОКОМ
(
    статус будет "НЕВЫПОЛНЕНО"
    крайний срок должен быть опционален
)

Отвечать должен НОМЕРОМ только что созданной задачи.

Пример входящих данных для этого запроса:
{
    "title": "Купить чипсы",
    "body": "Купить чипсы со вкусом краба",
    "deadline": 1733677748 // UTC timestamp. Такой можно получить вызвов Date.now()
}
Пример ответа:
{
    "id": 0 // id == он де идентификатор
}

------
------
------

GET /tasks
Должен возвращать список задач

------
------
------

POST /task/:id
Должен ОБНОВИТЬ заголовок и/или текст и/или дедлайн и/или статус указанной задачи
(номер задачи указывается прямо в пути как :id)

Пример запроса:
POST /task/0
{
    "status": "DONE"
}
Такой запрос должен обновить статус задачи с номером 0 на новый статус "DONE"


------
------
------

DELETE /task/:id
Должен удалить задачу с указанным номером